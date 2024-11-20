"use client";

import analysisSubmitAction from "@/app/helpers/actions/analysisSubmit";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, ChangeEvent, FormEvent } from "react";

export default function AnalysisSubmit() {
	const [response, setResponse] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [analyses, setAnalyses] = useState([] as string[]);

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

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setResponse("");
		setError("");
		setLoading(true);

		const allFormData = new FormData(event.currentTarget);

		async function pushBlob(name: string) {
			const file = allFormData.get(name) as File;
			const fileObj = await upload(file.name, file, {
				access: "public",
				handleUploadUrl: "/api/analysisFile/upload",
				multipart: true
			});
			return fileObj;
		}

		for (const a of analyses) {
			//construct temp formData for each analysis
			const formData = new FormData();
			formData.set("assay_name", a);
			formData.set("studyFile", allFormData.get("studyFile") as File);
			formData.set("libraryFile", allFormData.get("libraryFile") as File);

			let featBlob = {} as PutBlobResult;
			let occBlob = {} as PutBlobResult;
			let needToBreak = false;
			try {
				if (process.env.NODE_ENV !== "development") {
					featBlob = await pushBlob(`${a}_feat`);
					formData.set(`${a}_feat`, JSON.stringify(featBlob));
					occBlob = await pushBlob(`${a}_occ`);
					formData.set(`${a}_occ`, JSON.stringify(occBlob));
				} else {
					formData.set(`${a}_feat`, allFormData.get(`${a}_feat`) as File);
					formData.set(`${a}_occ`, allFormData.get(`${a}_occ`) as File);
				}
				allFormData.delete(`${a}_feat`);
				allFormData.delete(`${a}_occ`);

				const result = await analysisSubmitAction(formData);
				if (result.error) {
					setError(result.error);
					needToBreak = true;
				} else if (result.response) {
					setResponse(result.response);
				} else {
					setError("Unknown error.");
					needToBreak = true;
				}
			} catch (err) {
				setError(`Error: ${(err as Error).message}.`);
				needToBreak = true;
			}

			if (process.env.NODE_ENV !== "development") {
				await fetch(`/api/analysisFile/delete?url=${featBlob.url}`, {
					method: "DELETE"
				});
				await fetch(`/api/analysisFile/delete?url=${occBlob.url}`, {
					method: "DELETE"
				});
			}

			if (needToBreak) {
				break;
			}
		}
		setLoading(false);
	}

	return (
		<>
			<form className="card-body" onSubmit={handleSubmit}>
				<h1 className="text-primary">Analysis Metadata:</h1>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text text-base-content">Study File:</span>
					</div>
					<input
						type="file"
						name="studyFile"
						required
						accept=".tsv"
						onChange={parseStudy}
						className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
					/>
				</label>
				{!!analyses.length && (
					<>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text text-base-content">Library File:</span>
							</div>
							<input
								type="file"
								name="libraryFile"
								required
								accept=".tsv"
								className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
							/>
						</label>
						<h1 className="text-base-content">Analyses:</h1>
						<div className="flex gap-5">
							{analyses.map((a) => (
								<div key={a}>
									<h2 className="text-base-content">{a}</h2>
									<label className="form-control w-full max-w-xs">
										<div className="label">
											<span className="label-text text-base-content">Features:</span>
										</div>
										<input
											type="file"
											name={`${a}_feat`}
											required
											accept=".tsv"
											className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
										/>
									</label>
									<label className="form-control w-full max-w-xs">
										<div className="label">
											<span className="label-text text-base-content">Occurrences:</span>
										</div>
										<input
											type="file"
											name={`${a}_occ`}
											required
											accept=".tsv"
											className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
										/>
									</label>
								</div>
							))}
						</div>
						<button className="btn btn-primary">Submit</button>
					</>
				)}
			</form>
			{loading && <span className="text-base-content">Loading...</span>}
			<span className="text-base-content">
				{response} {error}
			</span>
		</>
	);
}
