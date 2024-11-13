"use client";

import { studyUploadAction } from "@/helpers/actions";
import { ChangeEvent, FormEvent, useState } from "react";
import { upload } from "@vercel/blob/client";
//import { getBaseUrl } from "@/helpers/utils";

export default function StudyUpload() {
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

	async function handleStudySubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setResponse("");
		setError("");
		setLoading(true);

		const formData = new FormData(event.currentTarget);

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

		const blobs = [];

		try {
			if (process.env.NODE_ENV !== "development") {
				for (const a of analyses) {
					blobs.push(await pushBlob(`${a}_feat`));
					blobs.push(await pushBlob(`${a}_occ`));
				}
			}

			const result = await studyUploadAction(formData);
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
				for (const b of blobs) {
					await fetch(`/api/analysisFile/delete?url=${b.url}`, {
						method: "DELETE"
					});
				}
			}
		}

		setLoading(false);
	}

	//async function handleAnalysesSubmit(event: FormEvent<HTMLFormElement>) {
	//	event.preventDefault();
	//	setResponse("");
	//	setError("");
	//	setLoading(true);

	//	const formData = new FormData(event.currentTarget);
	//	for (const a of analyses) {
	//		formData.set("analysis", JSON.stringify(a));

	//		//const FeatFiles = formData.getAll("featFile");
	//		//formData.delete("featFile");
	//		//const occFiles = formData.getAll("occFile");
	//		//formData.delete("occFile");

	//		let feat;
	//		let occ;
	//		try {
	//			if (process.env.NODE_ENV !== "development") {
	//				async function pushBlob(name: string) {
	//					const file = formData.get(name) as File;
	//					formData.delete(name);
	//					const fileObj = await upload(file.name, file, {
	//						access: "public",
	//						handleUploadUrl: "/api/analysisFile/upload",
	//						multipart: true
	//					});
	//					formData.set(name, JSON.stringify(fileObj));
	//					return fileObj;
	//				}

	//				feat = await pushBlob(`${a}_feat`);
	//				occ = await pushBlob(`${a}_occ`);
	//			}

	//			const result = await analysisUploadAction(formData);
	//			if (result.error) {
	//				setError(result.error);
	//			} else if (result.response) {
	//				setResponse(result.response);
	//			} else {
	//				setError("Unknown error.");
	//			}
	//		} catch (error) {
	//			setError(`Error: ${(error as Error).message}. Make sure you are logged into a NOAA or MSU account.`);
	//		} finally {
	//			if (process.env.NODE_ENV !== "development") {
	//				await fetch(`/api/analysisFile/delete?url=${feat!.url}`, {
	//					method: "DELETE"
	//				});
	//				await fetch(`/api/analysisFile/delete?url=${occ!.url}`, {
	//					method: "DELETE"
	//				});
	//			}
	//		}
	//	}

	//	setLoading(false);
	//}

	return (
		<>
			<form className="card-body" onSubmit={handleStudySubmit}>
				<h1 className="text-neutral-content">Study Metadata:</h1>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text text-neutral-content">Study File:</span>
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
								<span className="label-text text-neutral-content">Samples File:</span>
							</div>
							<input
								type="file"
								name="samplesFile"
								required
								accept=".tsv"
								className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
							/>
						</label>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text text-neutral-content">Library File:</span>
							</div>
							<input
								type="file"
								name="libraryFile"
								required
								accept=".tsv"
								className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
							/>
						</label>
						<h1 className="text-neutral-content">Analyses:</h1>
						<div className="flex gap-5">
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
											accept=".tsv"
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
											accept=".tsv"
											className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
										/>
									</label>
								</div>
							))}
						</div>
					</>
				)}
				<button className="btn btn-secondary">Submit</button>
			</form>
			{loading && <span className="text-neutral-content">Loading...</span>}
			<span className="text-neutral-content">
				{response} {error}
			</span>
		</>
	);
}
