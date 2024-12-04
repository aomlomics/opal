"use client";

import studyUploadAction from "@/app/helpers/actions/studySubmit";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
//import { getBaseUrl } from "@/app/helpers/utils";

export default function StudySubmit() {
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
			} else if (result.message) {
				router.push("/submit/analysis");
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
			<form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
				<h1 className="text-primary font-semibold -mt-4">Study Metadata:</h1>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text text-base-content">Study File:</span>
					</div>
					<input
						type="file"
						name="studyFile"
						required
						accept=".tsv"
						className="file-input file-input-bordered file-input-secondary text-base-content bg-neutral-content w-full max-w-xs [&::file-selector-button]:text-white"
					/>
				</label>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text text-base-content">Samples File:</span>
					</div>
					<input
						type="file"
						name="samplesFile"
						required
						accept=".tsv"
						className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs [&::file-selector-button]:text-white"
					/>
				</label>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text text-base-content">Library File:</span>
					</div>
					<input
						type="file"
						name="libraryFile"
						required
						accept=".tsv"
						className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs [&::file-selector-button]:text-white"
					/>
				</label>
				<button className="btn btn-primary text-base-100 mt-8">Submit</button>
			</form>
			{loading && (
				<div className="mt-4 text-base-content flex items-center gap-2 justify-center">
					<span className="loading loading-spinner"></span>
					<span>Processing your submission...</span>
				</div>
			)}
			{(response || error) && (
				<div className={`mt-4 p-4 rounded-lg ${error ? "bg-error/10" : "bg-success/10"} text-center`}>
					<span className="text-base-content">{response || error}</span>
				</div>
			)}
		</>
	);
}
