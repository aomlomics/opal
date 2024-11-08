"use client";

import { studyUploadAction } from "@/helpers/actions";
import { ChangeEvent, FormEvent, useState } from "react";
import { upload } from "@vercel/blob/client";
import { PutBlobResult, del } from "@vercel/blob";
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

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setResponse("");
		setError("");
		setLoading(true);

		const formData = new FormData(event.currentTarget);

		//const FeatFiles = formData.getAll("featFile");
		//formData.delete("featFile");
		//const occFiles = formData.getAll("occFile");
		//formData.delete("occFile");

		if (process.env.NODE_ENV !== "development") {
			const analysisFiles = {} as Record<string, PutBlobResult>;
			async function pushBlob(name: string) {
				const file = formData.get(name) as File;
				formData.delete(name);
				if (file) {
					analysisFiles[name] = await upload(file.name, file, {
						access: "public",
						handleUploadUrl: "/api/analysisFile/upload",
						multipart: true
					});
				}
			}
			let err;
			let res;
			try {
				await pushBlob("16sFeatFile");
				await pushBlob("16sOccFile");
				await pushBlob("18sFeatFile");
				await pushBlob("18sOccFile");

				formData.set("analysisFiles", JSON.stringify(analysisFiles));

				const result = await studyUploadAction(formData);
				if (result.error) {
					err = result.error;
				} else if (result.response) {
					res = result.response;
				} else {
					console.log("?");
				}
			} catch (error) {
				setError(`Error: ${(error as Error).message}. Make sure you are logged into a NOAA or MSU account.`);
			} finally {
				for (const blob of Object.values(analysisFiles)) {
					await fetch(`/api/analysisFile/delete?url=${blob.url}`, {
						method: "DELETE"
					});
				}

				if (err) {
					setError(err);
				} else if (res) {
					setResponse(res);
				}
				setLoading(false);
			}
		}
	}

	return (
		<form className="card-body" onSubmit={handleSubmit}>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">Study File:</span>
				</div>
				<input
					type="file"
					name="studyFile"
					required
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
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text text-neutral-content">16S Features:</span>
						</div>
						<input
							type="file"
							name="16sFeatFile"
							required
							className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text text-neutral-content">16S Occurrences:</span>
						</div>
						<input
							type="file"
							name="16sOccFile"
							required
							className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text text-neutral-content">18S Features:</span>
						</div>
						<input
							type="file"
							name="18sFeatFile"
							required
							className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
						/>
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text text-neutral-content">18S Occurrences:</span>
						</div>
						<input
							type="file"
							name="18sOccFile"
							required
							className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
						/>
					</label>
					<button className="btn btn-secondary">Submit</button>
				</>
			)}
			{loading && <span className="text-neutral-content">Loading...</span>}
			<span className="text-neutral-content">
				{response} {error}
			</span>
		</form>
	);
}
