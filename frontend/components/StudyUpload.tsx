"use client";

import { studyUploadAction } from "@/helpers/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function StudyUpload() {
	let state = {} as { message: string; error?: string };
	let formAction;
	if (process.env.NODE_ENV === "development") {
		[state, formAction] = useFormState(studyUploadAction, { message: "" });
	} else {
		//upload to blob storage
		console.log("uploading to blob storage");
	}
	const { pending } = useFormStatus();

	return (
		<form className="card-body" action={formAction}>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">Study File:</span>
				</div>
				<input
					id="samplesFile"
					type="file"
					name="studyFile"
					required
					className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">Library File:</span>
				</div>
				<input
					id="samplesFile"
					type="file"
					name="libraryFile"
					required
					className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">Samples File:</span>
				</div>
				<input
					id="samplesFile"
					type="file"
					name="samplesFile"
					required
					className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">16S ASV:</span>
				</div>
				<input
					id="asvFile"
					type="file"
					name="16sAsvFile"
					required
					className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">16S Occurrences:</span>
				</div>
				<input
					id="asvFile"
					type="file"
					name="16sOccFile"
					required
					className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">18S ASV:</span>
				</div>
				<input
					id="asvFile"
					type="file"
					name="18sAsvFile"
					required
					className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">18S Occurrences:</span>
				</div>
				<input
					id="asvFile"
					type="file"
					name="18sOccFile"
					required
					className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs"
				/>
			</label>
			<button className="btn btn-secondary">Submit</button>
			{pending && <span className="text-neutral-content">Loading...</span>}
			<span className="text-neutral-content">
				{state.message} {state.error}
			</span>
		</form>
	);
}
