"use client";

import assignSubmitAction from "@/app/helpers/actions/analysisSubmit/assignSubmit";
import occSubmitAction from "@/app/helpers/actions/analysisSubmit/occSubmit";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, ChangeEvent, FormEvent } from "react";
import analysisSubmitAction from "../helpers/actions/analysisSubmit/analysisSubmit";
import analysisDeleteAction from "../helpers/actions/analysisSubmit/analysisDelete";
import assignDeleteAction from "../helpers/actions/analysisSubmit/assignDelete";

export default function AnalysisSubmit() {
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

	async function analysisDelete(analysisId: number) {
		const formData = new FormData();
		formData.set("analysisId", JSON.stringify(analysisId));
		try {
			const result = await analysisDeleteAction(formData);
			if (result.error) {
				setError(result.error);
			} else if (result.response) {
				setResponse(result.response);
			} else {
				setError("Unknown error.");
			}
		} catch (err) {
			setError(`Error: ${(err as Error).message}.`);
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setResponse("");
		setError("");
		setLoading(true);

		const allFormData = new FormData(event.currentTarget);

		async function pushBlob(name: string) {
			const file = allFormData.get(name) as File;
			const fileObj = await upload(file.name, file, {
				access: "public",
				handleUploadUrl: "/api/analysisFile/upload",
				multipart: true
			});
			return fileObj;
		}

		async function analysisFileSubmit(
			assay_name: string,
			fileType: string,
			fieldsToSet: Record<string, any>,
			action: typeof assignSubmitAction | typeof occSubmitAction
		): Promise<{ error?: boolean; result?: Record<string, any> }> {
			const formData = new FormData();
			formData.set("assay_name", assay_name);
			for (const [key, val] of Object.entries(fieldsToSet)) {
				formData.set(key, val);
			}

			let blob = {} as PutBlobResult;

			let error;
			let result;

			try {
				//only upload file to the blob server when on a hosted service
				if (process.env.NODE_ENV !== "development") {
					blob = await pushBlob(`${assay_name}_${fileType}`);
					formData.set(`${assay_name}_${fileType}`, JSON.stringify(blob));
				} else {
					formData.set(`${assay_name}_${fileType}`, allFormData.get(`${assay_name}_${fileType}`) as File);
				}
				allFormData.delete(`${assay_name}_${fileType}`);

				const response = await action(formData);
				if (response.error) {
					setError(response.error);
					error = true;
				} else if (response.message) {
					setResponse(response.message);
					if (response.result) {
						result = response.result;
					}
				} else {
					setError("Unknown error.");
					error = true;
				}
			} catch (err) {
				setError(`Error: ${(err as Error).message}.`);
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

		for (const a of analyses) {
			//analysis files
			const formData = new FormData();
			formData.set("assay_name", a);
			formData.set("studyFile", allFormData.get("studyFile") as File);
			formData.set("libraryFile", allFormData.get("libraryFile") as File);

			//need assignment file to construct featToTaxa
			const assignFile = allFormData.get(`${a}_assign`) as File;

			let analysisId;
			try {
				const response = await analysisSubmitAction(formData);
				if (response.error) {
					setError(response.error);
					break;
				} else if (response.message) {
					setResponse(response.message);
					analysisId = response.result!.analysisId;
				} else {
					setError("Unknown error.");
					break;
				}
			} catch (err) {
				setError(`Error: ${(err as Error).message}.`);
				break;
			}

			//assignments file
			const { error: assignError, result: assignResult } = await analysisFileSubmit(
				a,
				"assign",
				{ analysisId },
				assignSubmitAction
			);

			if (assignError) {
				//remove analysis from database
				console.log(`${a} analysis delete`);
				await analysisDelete(analysisId as number);
				break;
			}

			//occurrences file
			const { error: occError } = await analysisFileSubmit(
				a,
				"occ",
				{ analysisId, [`${a}_assign`]: assignFile },
				occSubmitAction
			);
			if (occError) {
				//remove assignments from database
				console.log(`${a} assignments delete`);
				const formData = new FormData();
				formData.set("dbAssignments", JSON.stringify(assignResult!.dbAssignments));
				try {
					console.log(`${a} assignments delete`);
					const result = await assignDeleteAction(formData);
					if (result.error) {
						setError(result.error);
					} else if (result.response) {
						setResponse(result.response);
					} else {
						setError("Unknown error.");
					}
				} catch (err) {
					setError(`Error: ${(err as Error).message}.`);
				}

				//remove analysis from database
				console.log(`${a} analysis delete`);
				await analysisDelete(analysisId as number);
				break;
			}
		}

		setLoading(false);
	}

	return (
		<>
			<form className="card-body" onSubmit={handleSubmit}>
				<h1 className="text-primary">Analysis Metadata:</h1>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text text-base-content">Study File:</span>
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
								<span className="label-text text-base-content">Library File:</span>
							</div>
							<input
								type="file"
								name="libraryFile"
								required
								accept=".tsv"
								className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
							/>
						</label>
						<h1 className="text-base-content">Analyses:</h1>
						<div className="flex gap-5">
							{analyses.map((a) => (
								<div key={a}>
									<h2 className="text-base-content">{a}</h2>
									<label className="form-control w-full max-w-xs">
										<div className="label">
											<span className="label-text text-base-content">Assignments:</span>
										</div>
										<input
											type="file"
											name={`${a}_assign`}
											required
											accept=".tsv"
											className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
										/>
									</label>
									<label className="form-control w-full max-w-xs">
										<div className="label">
											<span className="label-text text-base-content">Occurrences:</span>
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
						<button className="btn btn-primary">Submit</button>
					</>
				)}
			</form>
			{loading && <span className="text-base-content">Loading...</span>}
			<span className="text-base-content">
				{response} {error}
			</span>
		</>
	);
}
