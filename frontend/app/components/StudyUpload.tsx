"use client";

import studyUploadAction from "@/app/helpers/actions/studyUpload";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
//import { getBaseUrl } from "@/app/helpers/utils";

export default function StudyUpload() {
	const router = useRouter();
	const [response, setResponse] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setResponse("");
		setError("");
		setLoading(true);

		const formData = new FormData(event.currentTarget);

		try {
			const result = await studyUploadAction(formData);
			if (result.error) {
				setError(result.error);
			} else if (result.response) {
				router.push("/upload/analysis");
			} else {
				setError("Unknown error.");
			}
		} catch (error) {
			setError(`Error: ${(error as Error).message}.`);
		}

		setLoading(false);
	}

	return (
		<>
			<form className="card-body" onSubmit={handleSubmit}>
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
				<button className="btn btn-secondary">Submit</button>
			</form>
			{loading && <span className="text-neutral-content">Loading...</span>}
			<span className="text-neutral-content">
				{response} {error}
			</span>
		</>
	);
}
