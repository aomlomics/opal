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

function reducer(state: Record<string, string>, updates: Record<string, string>) {
	if (updates.reset) {
		return {};
	} else {
		return { ...state, ...updates };
	}
}

export default function AnalysisSubmit() {
	const [responseObj, setResponseObj] = useReducer(reducer, {} as Record<string, string>); //fileName: message
	const [errorObj, setErrorObj] = useReducer(reducer, {} as Record<string, string>); //fileName: message
	const [loading, setLoading] = useState(""); //currently loading fileName
	const [analyses, setAnalyses] = useState([{ assay_name: "", analysis_run_name: "\u200b" }] as Array<{
		assay_name: string;
		analysis_run_name: string;
	} | null>); //uses zero-width space as placeholder

	async function parseAnalysis(files: FileList | null, i: number) {
		try {
			if (files?.length) {
				const f = files[0];

				let assay_name;
				let analysis_run_name;

				const lines = (await f.text()).replace(/[\r]+/gm, "").split("\n");
				for (let j = 1; j < lines.length; j++) {
					const currentLine = lines[j].split("\t");

					if (currentLine[0] === "assay_name") {
						assay_name = currentLine[1].replace(/[\r\n]+/gm, "");
					} else if (currentLine[0] === "analysis_run_name") {
						analysis_run_name = currentLine[1].replace(/[\r\n]+/gm, "");
					}

					if (assay_name && analysis_run_name) {
						const tempAList = [...analyses];
						tempAList[i] = { assay_name, analysis_run_name };
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
		analysis,
		file,
		fileSuffix = "",
		submitAction,
		fieldsToSet = {},
		skipBlob = false
	}: {
		analysis: {
			assay_name: string;
			analysis_run_name: string;
		};
		file: File;
		fileSuffix?: string;
		submitAction: SubmitAction;
		fieldsToSet?: Record<string, any>;
		skipBlob?: boolean;
	}): Promise<{ error?: boolean; result?: Record<string, any> }> {
		const formData = new FormData();
		formData.set("assay_name", analysis.assay_name);
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
					[`${analysis.analysis_run_name}${fileSuffix}`]: response.error
				});
				error = true;
			} else if (response.message) {
				setResponseObj({
					[`${analysis.analysis_run_name}${fileSuffix}`]: response.message
				});
				if (response.result) {
					result = response.result;
				}
			} else {
				setErrorObj({
					[`${analysis.analysis_run_name}${fileSuffix}`]: "Unknown error."
				});
				error = true;
			}
		} catch (err) {
			setErrorObj({
				[`${analysis.analysis_run_name}${fileSuffix}`]: `Error: ${(err as Error).message}.`
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

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setResponseObj({ reset: "true" });
		setErrorObj({ reset: "true" });
		setLoading("");

		const allFormData = new FormData(event.currentTarget);

		for (const a of analyses) {
			if (a && a.analysis_run_name !== "\u200b") {
				//analysis file
				setLoading(a.analysis_run_name);
				//{
				//	analysis: a,
				//	file: allFormData.get(a.analysis_run_name) as File,
				//	submitAction: analysisSubmitAction,
				//	skipBlob = true
				//}
				const { error: analysisError, result: analysisResult } = await analysisFileSubmit({
					analysis: a,
					file: allFormData.get(a.analysis_run_name) as File,
					submitAction: analysisSubmitAction,
					skipBlob: true
				});

				if (analysisError) {
					break;
				}

				//assignments file
				setLoading(`${a.analysis_run_name}_assign`);
				const { error: assignError, result: assignResult } = await analysisFileSubmit({
					analysis: a,
					file: allFormData.get(`${a.analysis_run_name}_assign`) as File,
					fileSuffix: "_assign",
					submitAction: assignSubmitAction,
					fieldsToSet: { analysis_run_name: analysisResult!.analysis_run_name }
				});

				if (assignError) {
					//remove analysis from database
					await dbDelete(analysisDeleteAction, analysisResult!.analysis_run_name);

					break;
				}

				//occurrences file
				setLoading(`${a.analysis_run_name}_occ`);
				const { error: occError } = await analysisFileSubmit({
					analysis: a,
					file: allFormData.get(`${a.analysis_run_name}_occ`) as File,
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

					break;
				}
			}
		}

		setLoading("");
	}

	return (
		<>
			<form className="card-body" onSubmit={handleSubmit}>
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
												<h2 className="text-base-content">{analyses[i].analysis_run_name}</h2>
												<div className="flex">
													<label className="form-control w-full max-w-xs">
														<div className="label">
															<span className="label-text text-base-content">Metadata:</span>
														</div>
														<input
															type="file"
															name={analyses[i].analysis_run_name}
															required
															disabled={!!loading}
															accept=".tsv"
															onChange={(e) => parseAnalysis(e.currentTarget.files, i)}
															className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
														/>
													</label>
													<ProgressCircle
														response={responseObj[analyses[i].analysis_run_name]}
														error={errorObj[analyses[i].analysis_run_name]}
														loading={loading === analyses[i].analysis_run_name}
													/>
												</div>
												{analyses[i].analysis_run_name !== "\u200b" && (
													<>
														<div className="flex">
															<label className="form-control w-full max-w-xs">
																<div className="label">
																	<span className="label-text text-base-content">Features:</span>
																</div>
																<input
																	type="file"
																	name={`${analyses[i].analysis_run_name}_assign`}
																	required
																	disabled={!!loading}
																	accept=".tsv"
																	className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
																/>
															</label>
															<ProgressCircle
																response={responseObj[`${analyses[i].analysis_run_name}_assign`]}
																error={errorObj[`${analyses[i].analysis_run_name}_assign`]}
																loading={loading === `${analyses[i].analysis_run_name}_assign`}
															/>
														</div>
														<div className="flex">
															<label className="form-control w-full max-w-xs">
																<div className="label">
																	<span className="label-text text-base-content">Occurrences:</span>
																</div>
																<input
																	type="file"
																	name={`${analyses[i].analysis_run_name}_occ`}
																	required
																	disabled={!!loading}
																	accept=".tsv"
																	className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
																/>
															</label>
															<ProgressCircle
																response={responseObj[`${analyses[i].analysis_run_name}_occ`]}
																error={errorObj[`${analyses[i].analysis_run_name}_occ`]}
																loading={loading === `${analyses[i].analysis_run_name}_occ`}
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
					{analyses[analyses.length - 1]?.analysis_run_name !== "\u200b" && (
						<button
							className="btn btn-success"
							type="button"
							disabled={!!loading}
							onClick={() => setAnalyses([...analyses, { assay_name: "", analysis_run_name: "\u200b" }])}
						>
							+
						</button>
					)}
				</div>

				<button className="btn btn-primary">Submit</button>
			</form>
			{!!loading && <span className="text-base-content">Loading, please do not close the website</span>}
		</>
	);
}
