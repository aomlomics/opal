"use client";

import assignSubmitAction from "@/app/helpers/actions/analysis/submit/assignSubmit";
import occSubmitAction from "@/app/helpers/actions/analysis/submit/occSubmit";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, FormEvent, useReducer } from "react";
import analysisSubmitAction from "../../helpers/actions/analysis/submit/analysisSubmit";
import analysisDeleteAction from "../../helpers/actions/analysis/delete/analysisDelete";
import { DeleteAction, SubmitAction } from "@/types/types";
import ProgressCircle from "./ProgressCircle";
import { useRouter } from "next/navigation";
import ProgressLine from "./ProgressLine";

function reducer(state: Record<string, string>, updates: Record<string, string>) {
	if (updates.reset) {
		return {};
	} else {
		return { ...state, ...updates };
	}
}

export default function AnalysisSubmit() {
	const router = useRouter();
	const [responseObj, setResponseObj] = useReducer(reducer, {} as Record<string, string>);
	const [errorObj, setErrorObj] = useReducer(reducer, {} as Record<string, string>);
	const [loading, setLoading] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [analyses, setAnalyses] = useState(["\u200b"] as Array<string | null>);
	const [fileStates, setFileStates] = useState<Record<string, File | null>>({});

	const steps = [
		{ id: 'analysisFile', label: 'Analysis File' },
		{ id: 'assignFile', label: 'Features File' },
		{ id: 'occFile', label: 'Occurrences File' },
		{ id: 'submission', label: 'Submission' }
	];

	const lineHeights = [
		'h-[6.4rem]',  // Analysis to Features
		'h-[6.2rem]',  // Features to Occurrences
		'h-[3.8rem]'   // Occurrences to Submit
	];

	async function parseAnalysis(files: FileList | null, i: number) {
		try {
			if (files?.length) {
				const f = files[0];

				const lines = (await f.text()).replace(/[\r]+/gm, "").split("\n");
				for (let j = 1; j < lines.length; j++) {
					const currentLine = lines[j].split("\t");

					if (currentLine[0] === "analysis_run_name") {
						const tempAList = [...analyses];
						tempAList[i] = currentLine[1].replace(/[\r\n]+/gm, "");
						setAnalyses(tempAList);
						return;
					}
				}

				setErrorObj({ global: "Analysis Metadata file in wrong format." });
			}
		} catch (err) {
			setErrorObj({ global: "Analysis Metadata file in wrong format." });
		}
	}

	async function dbDelete(
		deleteAction: DeleteAction,
		analysis_run_name: string,
		del?: Record<string, number | number[] | string | string[]>
	) {
		const formData = new FormData();
		formData.set("del", JSON.stringify({ ...del, analysis_run_name }));

		try {
			const response = await deleteAction(formData);
			if (response.error) {
				setErrorObj({
					[analysis_run_name]: response.error
				});
			} else if (response.message) {
				const tempResponseObj = { ...responseObj };
				setResponseObj({
					[analysis_run_name]: response.message
				});
			} else {
				setErrorObj({
					[analysis_run_name]: "Unknown error."
				});
			}
		} catch (err) {
			setErrorObj({
				[analysis_run_name]: `Error: ${(err as Error).message}.`
			});
		}
	}

	async function analysisFileSubmit({
		analysis_run_name,
		file,
		fileSuffix = "",
		submitAction,
		fieldsToSet = {},
		skipBlob = false
	}: {
		analysis_run_name: string;
		file: File;
		fileSuffix?: string;
		submitAction: SubmitAction;
		fieldsToSet?: Record<string, any>;
		skipBlob?: boolean;
	}): Promise<{ error?: boolean; result?: Record<string, any> }> {
		const formData = new FormData();
		formData.set("analysis_run_name", analysis_run_name);
		for (const [key, val] of Object.entries(fieldsToSet)) {
			formData.set(key, val);
		}

		let blob = {} as PutBlobResult;

		let error;
		let result;

		try {
			//only upload file to the blob server when on a hosted service
			if (skipBlob || process.env.NODE_ENV === "development") {
				formData.set("file", file);
			} else {
				blob = await upload(file.name, file, {
					access: "public",
					handleUploadUrl: "/api/analysisFile/upload",
					multipart: true
				});
				formData.set("file", JSON.stringify(blob));
			}

			//send request
			const response = await submitAction(formData);
			if (response.error) {
				setErrorObj({
					[`${analysis_run_name}${fileSuffix}`]: response.error
				});
				error = true;
			} else if (response.message) {
				setResponseObj({
					[`${analysis_run_name}${fileSuffix}`]: response.message
				});
				if (response.result) {
					result = response.result;
				}
			} else {
				setErrorObj({
					[`${analysis_run_name}${fileSuffix}`]: "Unknown error."
				});
				error = true;
			}
		} catch (err) {
			setErrorObj({
				[`${analysis_run_name}${fileSuffix}`]: `Error: ${(err as Error).message}.`
			});
			error = true;
		}

		//only delete file on the blob server when on a hosted service
		if (process.env.NODE_ENV !== "development") {
			await fetch(`/api/analysisFile/delete?url=${blob.url}`, {
				method: "DELETE"
			});
		}

		return { error, result };
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setFileStates(prev => ({
			...prev,
			[name]: files?.[0] || null
		}));
	};

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitted) return;

		setResponseObj({ reset: "true" });
		setErrorObj({ reset: "true" });
		setLoading("");
		setSubmitted(true);

		const allFormData = new FormData(event.currentTarget);
		let hasError = false;

		for (const analysis_run_name of analyses) {
			if (analysis_run_name && analysis_run_name !== "\u200b") {
				//analysis file
				setLoading(analysis_run_name);
				//{
				//	analysis: a,
				//	file: allFormData.get(a.analysis_run_name) as File,
				//	submitAction: analysisSubmitAction,
				//	skipBlob = true
				//}
				const { error: analysisError, result: analysisResult } = await analysisFileSubmit({
					analysis_run_name,
					file: allFormData.get(analysis_run_name) as File,
					submitAction: analysisSubmitAction,
					skipBlob: true
				});

				if (analysisError) {
					hasError = true;
					setErrorObj({
						global: "An error occurred during submission.",
						status: "❌ Submission Failed"
					});
					setSubmitted(false);
					break;
				}

				//assignments file
				setLoading(`${analysis_run_name}_assign`);
				const { error: assignError, result: assignResult } = await analysisFileSubmit({
					analysis_run_name,
					file: allFormData.get(`${analysis_run_name}_assign`) as File,
					fileSuffix: "_assign",
					submitAction: assignSubmitAction,
					fieldsToSet: { analysis_run_name: analysisResult!.analysis_run_name }
				});

				if (assignError) {
					//remove analysis from database
					await dbDelete(analysisDeleteAction, analysisResult!.analysis_run_name);

					hasError = true;
					setErrorObj({
						global: "An error occurred during submission.",
						status: "❌ Submission Failed"
					});
					setSubmitted(false);
					break;
				}

				//occurrences file
				setLoading(`${analysis_run_name}_occ`);
				const { error: occError } = await analysisFileSubmit({
					analysis_run_name,
					file: allFormData.get(`${analysis_run_name}_occ`) as File,
					fileSuffix: "_occ",
					submitAction: occSubmitAction,
					fieldsToSet: { analysis_run_name: analysisResult!.analysis_run_name }
				});

				if (occError) {
					//remove analyses, features, and taxonomies from database
					await dbDelete(analysisDeleteAction, analysisResult!.analysis_run_name, {
						dbFeatures: assignResult!.dbFeatures,
						dbTaxonomies: assignResult!.dbTaxonomies
					});

					hasError = true;
					setErrorObj({
						global: "An error occurred during submission.",
						status: "❌ Submission Failed"
					});
					setSubmitted(false);
					break;
				}
			}
		}

		if (!hasError) {
			const successMessage = "Analysis successfully submitted! You will be redirected to explore page in 5 seconds...";
			await new Promise(resolve => setTimeout(resolve, 100));
			setResponseObj({
				global: successMessage,
				status: "✅ Analysis Submission Successful"
			});

			setTimeout(() => {
				router.push("/explore");
			}, 5000);
		}

		setLoading("");
	}

	return (
		<>
			<form className="card-body" onSubmit={handleSubmit}>
				<div className="flex gap-12">
					<div className="mt-[5rem] -ml-2">
						<ProgressLine
							fileStates={fileStates}
							responseObj={responseObj}
							errorObj={errorObj}
							loading={loading}
							steps={steps}
							lineHeights={lineHeights}
						/>
					</div>

					<div className="flex-1">
						<h1 className="text-primary">Analysis:</h1>
						<div className="flex gap-5">
							{/* {analyses.map((a, i) => ( */}
							{analyses.map(
								(a, i) =>
									a && (
										<div key={i}>
											{analyses[i] && (
												<>
													<div className="flex flex-col">
														<h2 className="text-base-content">{analyses[i]}</h2>
														<div className="flex">
															<label className="form-control w-full max-w-xs">
																<div className="label">
																	<span className="label-text text-base-content">Metadata:</span>
																</div>
																<input
																	type="file"
																	name={analyses[i]}
																	required
																	disabled={!!loading}
																	accept=".tsv"
																	onChange={(e) => parseAnalysis(e.currentTarget.files, i)}
																	className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs [&::file-selector-button]:text-white"
																/>
															</label>
															<ProgressCircle
																response={responseObj[analyses[i]]}
																error={errorObj[analyses[i]]}
																loading={loading === analyses[i]}
															/>
														</div>
														{analyses[i] !== "\u200b" && (
															<>
																<div className="flex">
																	<label className="form-control w-full max-w-xs">
																		<div className="label">
																			<span className="label-text text-base-content">Features:</span>
																		</div>
																		<input
																			type="file"
																			name={`${analyses[i]}_assign`}
																			required
																			disabled={!!loading}
																			accept=".tsv"
																			className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs [&::file-selector-button]:text-white"
																		/>
																	</label>
																	<ProgressCircle
																		response={responseObj[`${analyses[i]}_assign`]}
																		error={errorObj[`${analyses[i]}_assign`]}
																		loading={loading === `${analyses[i]}_assign`}
																	/>
																</div>
																<div className="flex">
																	<label className="form-control w-full max-w-xs">
																		<div className="label">
																			<span className="label-text text-base-content">Occurrences:</span>
																		</div>
																		<input
																			type="file"
																			name={`${analyses[i]}_occ`}
																			required
																			disabled={!!loading}
																			accept=".tsv"
																			className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs [&::file-selector-button]:text-white"
																		/>
																	</label>
																	<ProgressCircle
																		response={responseObj[`${analyses[i]}_occ`]}
																		error={errorObj[`${analyses[i]}_occ`]}
																		loading={loading === `${analyses[i]}_occ`}
																	/>
																</div>
															</>
														)}
													</div>
													{/* {analyses.length > 1 && ( */}
													{analyses.filter((a) => a !== null).length > 1 && (
														<button
															className="btn btn-error"
															type="button"
															disabled={!!loading}
															onClick={() => {
																//set removed analysis to null in array to maintain indices of other analyses
																const tempAList = [...analyses];
																tempAList[i] = null;
																//clean up any trailing nulls
																// BUG: array indices cause issue when analysis is removed using "-" button
																// tempAList.findLast((a, i) => {
																// 	if (a && a.analysis_run_name !== "\u200b") {
																// 		return true;
																// 	}
																// 	tempAList.splice(i, 1);
																// });

																setAnalyses(tempAList);
															}}
														>
															-
														</button>
													)}
												</>
											)}
										</div>
									)
							)}
							{analyses[analyses.length - 1] !== "\u200b" && (
								<button
									className="btn btn-success"
									type="button"
									disabled={!!loading}
									onClick={() => setAnalyses([...analyses, "\u200b"])}
								>
									+
								</button>
							)}
						</div>

						<button className="btn btn-primary text-white mt-8" disabled={!!loading || submitted}>
							Submit
						</button>
					</div>
				</div>
			</form>

			{/* Status Messages */}
			<div className="flex-grow mt-4">
				{(responseObj.status || errorObj.status) && (
					<div
						className={`p-4 rounded-lg ${
							errorObj.status ? "bg-error/10 border-2 border-error" : "bg-success/10 border-2 border-success"
						}`}
					>
						<h3 className={`text-xl font-bold mb-2 ${errorObj.status ? "text-error" : "text-success"}`}>
							{responseObj.status || errorObj.status}
						</h3>
						<p className="text-base-content text-lg">{responseObj.global || errorObj.global}</p>
						{responseObj.status && (
							<div className="mt-2 flex items-center gap-2">
								<span className="loading loading-spinner loading-sm"></span>
								<span className="text-base-content/80">Redirecting to explore page...</span>
							</div>
						)}
					</div>
				)}
			</div>

			{!!loading && <span className="text-base-content">Loading, please do not close the website</span>}
		</>
	);
}