"use client";

import { DeleteAction } from "@/types/types";

export default function SubmissionsDeleteButton({
	field,
	value,
	action
}: {
	field: string;
	value: string;
	action: DeleteAction;
}) {
	return (
		<button
			onClick={() => {
				const formData = new FormData();
				formData.append("del", JSON.stringify({ [field]: value }));
				action(formData);
			}}
			className="btn btn-xs"
		>
			Delete
		</button>
	);
}
