"use client";

import projectUploadAction from "@/app/helpers/actions/projectSubmit";
import { useRouter } from "next/navigation";
import { FormEvent, useReducer, useState } from "react";
import ProgressCircle from "./ProgressCircle";

function reducer(state: Record<string, string>, updates: Record<string, string>) {
	if (updates.reset) {
		return {};
	} else {
		return { ...state, ...updates };
	}
}

export default function ProjectSubmit() {
	const router = useRouter();
	const [responseObj, setResponseObj] = useReducer(reducer, {} as Record<string, string>);
	const [errorObj, setErrorObj] = useReducer(reducer, {} as Record<string, string>);
	const [loading, setLoading] = useState("");
	const [submitted, setSubmitted] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitted) return;
		
		setResponseObj({ reset: "true" });
		setErrorObj({ reset: "true" });
		setLoading("");
		setSubmitted(true);

		const formData = new FormData(event.currentTarget);
		const fileTypes = ["projectFile", "samplesFile", "libraryFile"];

		try {
			// Process each file sequentially just for progress display
			for (const fileType of fileTypes) {
				setLoading(fileType);
				await new Promise(resolve => setTimeout(resolve, 500));
				setResponseObj({ [fileType]: "File received" });
			}

			// All files processed, proceed with submission
			setLoading("submitting");
			const result = await projectUploadAction(formData);
			
			if (result.error) {
				setErrorObj({ 
					global: result.error,
					status: "❌ Submission Failed"
				});
				setSubmitted(false);
			} else if (result.message) {
				const successMessage = "Project successfully submitted! You will be redirected to submit your analysis files in 5 seconds...";
				setResponseObj({ 
					projectFile: "Success!",
					samplesFile: "Success!",
					libraryFile: "Success!",
					global: successMessage,
					status: "✅ Project Submission Successful"
				});
				
				setTimeout(() => {
					router.push("/submit/analysis");
				}, 5000);
			}
		} catch (error) {
			setErrorObj({ 
				global: "An error occurred during submission.",
				status: "❌ Submission Failed"
			});
			setSubmitted(false);
		}

		setLoading("");
	}

	return (
		<div className="min-h-[400px] max-w-3xl mx-auto">
			<form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
				<h1 className="text-primary font-semibold -mt-4">Project Metadata:</h1>
				{["projectFile", "samplesFile", "libraryFile"].map((fileType, index) => (
					<div key={fileType} className="flex w-full max-w-xl justify-between items-center">
						<label className="form-control flex-1">
							<div className="label">
								<span className="label-text text-base-content">
									{fileType.charAt(0).toUpperCase() + fileType.slice(1).replace('File', '')} File:
								</span>
							</div>
							<input
								type="file"
								name={fileType}
								required
								disabled={!!loading || submitted}
								accept=".tsv"
								className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full [&::file-selector-button]:text-white"
							/>
						</label>
						<div className="ml-4 w-12"> {/* Fixed width for progress circle */}
							<ProgressCircle
								response={responseObj[fileType]}
								error={errorObj[fileType]}
								loading={loading === fileType}
							/>
						</div>
					</div>
				))}
				
				<button 
					className="btn btn-primary text-base-100 mt-4 mb-4" 
					disabled={!!loading || submitted}
				>
					{submitted ? 'Submitted' : 'Submit'}
				</button>
			</form>

			{/* Reduced fixed height for status container */}
			<div className="h-24 mt-4">
				{(responseObj.status || errorObj.status) && (
					<div className={`p-4 rounded-lg ${errorObj.status ? "bg-error/10 border-2 border-error" : "bg-success/10 border-2 border-success"}`}>
						<h3 className={`text-xl font-bold mb-2 ${errorObj.status ? "text-error" : "text-success"}`}>
							{responseObj.status || errorObj.status}
						</h3>
						<p className="text-base-content text-lg">
							{responseObj.global || errorObj.global}
						</p>
						{responseObj.status && (
							<div className="mt-2 flex items-center gap-2">
								<span className="loading loading-spinner loading-sm"></span>
								<span className="text-base-content/80">Redirecting to analysis submission...</span>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}