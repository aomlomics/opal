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
	const [fileStates, setFileStates] = useState<Record<string, File | null>>({
		projectFile: null,
		samplesFile: null,
		libraryFile: null
	});

	const steps = [
		{ id: 'projectFile', label: 'Project File' },
		{ id: 'samplesFile', label: 'Samples File' }, 
		{ id: 'libraryFile', label: 'Library File'},
		{ id: 'submission', label: 'Submission' }
	];

	const lineHeights = [
		'h-[6.4rem]',  // Project to Samples
		'h-[6.2rem]',  // Samples to Library
		'h-[3.8rem]'     // Library to Submit
	];

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
					status: "❌ Submission Failed",
					submission: "Failed"
				});
				setSubmitted(false);
			} else if (result.message) {
				const successMessage = "Project successfully submitted! You will be redirected to submit your analysis files in 5 seconds...";
				await new Promise(resolve => setTimeout(resolve, 100));
				setResponseObj({ 
					projectFile: "Success!",
					samplesFile: "Success!",
					libraryFile: "Success!",
					submission: "Success!",
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
				status: "❌ Submission Failed",
				submission: "Failed"
			});
			setSubmitted(false);
		}

		setLoading("");
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setFileStates(prev => ({
			...prev,
			[name]: files?.[0] || null
		}));
	};

	return (
		<div className="min-h-[400px] max-w-3xl mx-auto px-8">
			<form className="flex-1 space-y-8 flex flex-col items-center" onSubmit={handleSubmit}>
				{["projectFile", "samplesFile", "libraryFile"].map((fileType) => (
					<div key={fileType} className="w-[400px]">
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text text-base-content">
									{fileType.charAt(0).toUpperCase() + fileType.slice(1).replace('File', '')} File:
								</span>
							</div>
							<div className="flex items-center gap-3">
								<input
									type="file"
									name={fileType}
									required
									disabled={!!loading || submitted}
									accept=".tsv"
									onChange={handleFileChange}
									className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full [&::file-selector-button]:text-white"
								/>
								<ProgressCircle
									hasFile={!!fileStates[fileType]}
									response={responseObj[fileType]}
									error={errorObj[fileType]}
									loading={loading === fileType}
								/>
							</div>
						</label>
					</div>
				))}
				
				<button 
					className="btn btn-primary text-white w-[200px]"
					disabled={!!loading || submitted}
				>
					{loading || submitted ? (
						<span className="loading loading-spinner loading-sm"></span>
					) : (
						'Submit'
					)}
				</button>
			</form>

			{/* Status Messages */}
			<div className="flex-grow mt-8">
				{(responseObj.status || errorObj.status) && (
					<div className={`
						p-6 rounded-lg mx-auto max-w-lg  ${errorObj.status ? "bg-error/10 border-2 border-error" : "bg-success/10 border-2 border-success"}
					`}>
						<h3 className={`text-lg font-bold mb-2 ${errorObj.status ? "text-error" : "text-success"}`}>
							{errorObj.status ? "Submission Failed" : "Project Submitted Successfully"}
						</h3>
						<p className="text-base text-base-content">
							{errorObj.status 
								? errorObj.global 
								: "Please stay on this page. You will be redirected to submit your analysis files in a few seconds..."}
						</p>
						{responseObj.status && (
							<div className="mt-4 flex items-center justify-center gap-2">
								<span className="loading loading-spinner loading-sm"></span>
								<span className="text-base-content/80 text-sm">Redirecting...</span>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}