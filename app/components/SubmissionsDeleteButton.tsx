"use client";

import { DeleteAction } from "@/types/types";
import { useState } from "react";
import ProgressCircle from "./submit/ProgressCircle";

export default function SubmissionsDeleteButton({
	field,
	value,
	action
}: {
	field: string;
	value: string;
	action: DeleteAction;
}) {
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState("");

	return (
		<div className="flex gap-3 items-center">
			<button
				onClick={async () => {
					setLoading(true);
					const formData = new FormData();
					formData.append("del", JSON.stringify({ [field]: value }));
					const result = await action(formData);
					if (result.message) {
						setResponse(response);
					}
					setLoading(false);
				}}
				className="btn btn-sm"
			>
				Delete
			</button>
			{(loading || response) && <ProgressCircle loading={loading} response={response} />}
		</div>
	);
}
