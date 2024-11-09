import { analysisUploadAction } from "@/helpers/actions";
import { upload } from "@vercel/blob/client";
import { useState, ChangeEvent, FormEvent } from "react";

//TODO: place on new route and get analyses from parent when applicable, or select from dropdown of studies
export default function AnalysisUpload() {
	const [response, setResponse] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	//const [analyses, setAnalyses] = useState([] as string[]);

	async function parseStudy(event: ChangeEvent<HTMLInputElement>) {
		if (event.currentTarget.files?.length) {
			const f = event.currentTarget.files[0];
			const headers = (await f?.text()).split("\n")[0].split("\t");
			const study_level_i = headers.indexOf("study_level");
			if (study_level_i !== -1) {
				const aList = [];
				for (let i = study_level_i + 1; i < headers.length; i++) {
					aList.push(headers[i]);
				}
				setAnalyses(aList);
			} else {
				setError("Study Metadata file in wrong format.");
			}
		}
	}

	async function handleAnalysesSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setResponse("");
		setError("");
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		for (const a of analyses) {
			formData.set("analysis", JSON.stringify(a));

			//const FeatFiles = formData.getAll("featFile");
			//formData.delete("featFile");
			//const occFiles = formData.getAll("occFile");
			//formData.delete("occFile");

			let feat;
			let occ;
			try {
				if (process.env.NODE_ENV !== "development") {
					async function pushBlob(name: string) {
						const file = formData.get(name) as File;
						formData.delete(name);
						const fileObj = await upload(file.name, file, {
							access: "public",
							handleUploadUrl: "/api/analysisFile/upload",
							multipart: true
						});
						formData.set(name, JSON.stringify(fileObj));
						return fileObj;
					}

					feat = await pushBlob(`${a}_feat`);
					occ = await pushBlob(`${a}_occ`);
				}

				const result = await analysisUploadAction(formData);
				if (result.error) {
					setError(result.error);
				} else if (result.response) {
					setResponse(result.response);
				} else {
					setError("Unknown error.");
				}
			} catch (error) {
				setError(`Error: ${(error as Error).message}. Make sure you are logged into a NOAA or MSU account.`);
			} finally {
				if (process.env.NODE_ENV !== "development") {
					await fetch(`/api/analysisFile/delete?url=${feat!.url}`, {
						method: "DELETE"
					});
					await fetch(`/api/analysisFile/delete?url=${occ!.url}`, {
						method: "DELETE"
					});
				}
			}
		}

		setLoading(false);
	}

	return (
		<>
			<form className="card-body" onSubmit={handleAnalysesSubmit}>
				<h1 className="text-neutral-content">Analyses:</h1>
				{analyses.map((a) => (
					<div key={a}>
						<h2 className="text-neutral-content">{a}</h2>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text text-neutral-content">Features:</span>
							</div>
							<input
								type="file"
								name={`${a}_feat`}
								required
								className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
							/>
						</label>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text text-neutral-content">Occurrences:</span>
							</div>
							<input
								type="file"
								name={`${a}_occ`}
								required
								className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
							/>
						</label>
					</div>
				))}
				<button className="btn btn-secondary">Submit</button>
			</form>
			{loading && <span className="text-neutral-content">Loading...</span>}
			<span className="text-neutral-content">
				{response} {error}
			</span>
		</>
	);
}
