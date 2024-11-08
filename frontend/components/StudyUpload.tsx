"use client";

import { studyMetadataUploadAction, analysisUploadAction } from "@/helpers/actions";
import { ChangeEvent, FormEvent, useState } from "react";
import { upload } from "@vercel/blob/client";
import { PutBlobResult } from "@vercel/blob";
//import { getBaseUrl } from "@/helpers/utils";

export default function StudyUpload() {
	const [response, setResponse] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [analyses, setAnalyses] = useState([] as { id: number; assay_name: string }[]);

	async function handleStudySubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setResponse("");
		setError("");
		setLoading(true);

		const formData = new FormData(event.currentTarget);

		const result = await studyMetadataUploadAction(formData);

		if (result.error) {
			setError(result.error);
		} else if (result.response) {
			setResponse(result.response);
			setAnalyses(result.dbAnalyses!);
		} else {
			setError("Unknown error.");
		}

		setLoading(false);
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

					feat = await pushBlob(`${a.assay_name}_feat`);
					occ = await pushBlob(`${a.assay_name}_occ`);
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

		setAnalyses([]);
		setLoading(false);
	}

	return (
		<>
			{!analyses.length ? (
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
							className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text text-neutral-content">Samples File:</span>
						</div>
						<input
							type="file"
							name="samplesFile"
							required
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
							className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
						/>
					</label>
					<button className="btn btn-secondary">Submit</button>
				</form>
			) : (
				<form className="card-body" onSubmit={handleAnalysesSubmit}>
					<h1 className="text-neutral-content">Analyses:</h1>
					{analyses.map((a) => (
						<div key={a.id}>
							<h2 className="text-neutral-content">{a.assay_name}</h2>
							<label className="form-control w-full max-w-xs">
								<div className="label">
									<span className="label-text text-neutral-content">Features:</span>
								</div>
								<input
									type="file"
									name={`${a.assay_name}_feat`}
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
									name={`${a.assay_name}_occ`}
									required
									className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
								/>
							</label>
						</div>
					))}
					<button className="btn btn-secondary">Submit</button>
				</form>
			)}
			{loading && <span className="text-neutral-content">Loading...</span>}
			<span className="text-neutral-content">
				{response} {error}
			</span>
		</>
	);
}
