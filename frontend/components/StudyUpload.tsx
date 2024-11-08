"use client";

import { studyUploadAction } from "@/helpers/actions";
import { useFormState } from "react-dom";

export default function StudyUpload() {
	const [state, formAction] = useFormState(studyUploadAction, { message: "" });

	return (
		<form className="card-body" action={formAction}>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">Study File:</span>
				</div>
				<input id="samplesFile" type="file" name="studyFile" className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs" />
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">Library File:</span>
				</div>
				<input id="samplesFile" type="file" name="libraryFile" className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs" />
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">Samples File:</span>
				</div>
				<input id="samplesFile" type="file" name="samplesFile" className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs" />
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">16S ASV:</span>
				</div>
				<input id="asvFile" type="file" name="16sAsvFile" className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs" />
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">16S Occurrences:</span>
				</div>
				<input id="asvFile" type="file" name="16sOccFile" className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs" />
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">18S ASV:</span>
				</div>
				<input id="asvFile" type="file" name="18sAsvFile" className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs" />
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-neutral-content">18S Occurrences:</span>
				</div>
				<input id="asvFile" type="file" name="18sOccFile" className="file-input file-input-bordered file-input-secondary bg-neutral-content w-full max-w-xs" />
			</label>
			<button onClick={() => { state.message = ""; state.error = "" }} className="btn btn-secondary">Submit</button>
			<span className="text-neutral-content">{state.message} {state.error}</span>
		</form>
	);
}