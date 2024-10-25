"use client";

import { asvUploadAction } from "@/helpers/actions";
import { useFormState } from "react-dom";

export default function AsvUpload() {
	const [state, formAction] = useFormState(asvUploadAction, { message: "" });

	return (
		<form action={formAction}>
			<input type="text" name="projectId" placeholder="Sample ID" required className="input input-bordered w-full max-w-xs" />
			<input type="file" name="asvFile" required className="file-input file-input-bordered w-full max-w-xs" />
			<input type="file" name="samplesFile" required className="file-input file-input-bordered w-full max-w-xs" />
			<button className="btn">Submit</button>
			<span>{state.message} {state.error}</span>
		</form>
	);
}