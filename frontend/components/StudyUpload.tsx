"use client";

import { studyMetadataUploadAction, analysisUploadAction } from "@/helpers/actions";
import { FormEvent, useState } from "react";
import { upload } from "@vercel/blob/client";
//import { getBaseUrl } from "@/helpers/utils";

export default function StudyUpload() {
	const [response, setResponse] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

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
		} else {
			setError("Unknown error.");
		}

		setLoading(false);
		//TODO: redirect to analysis upload page
	}

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
			{loading && <span className="text-neutral-content">Loading...</span>}
			<span className="text-neutral-content">
				{response} {error}
			</span>
		</>
	);
}
