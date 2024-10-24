"use client";

import { asvUploadAction } from "@/helpers/actions";
import { useFormState } from "react-dom";

export default function AsvUpload() {
	const [state, formAction] = useFormState(asvUploadAction, { message: "" });

	return (
		<form action={formAction}>
			<input type="file" name="asvFile" className="file-input file-input-bordered w-full max-w-xs" />
			<button className="btn">Submit</button>
			<span>{state.message}</span>
		</form>
	);
}