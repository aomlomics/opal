"use client";

import Link from "next/link";

interface TableDescriptionProps {
	tableName: string;
	description: string;
}

export default function TableDescription({ tableName, description }: TableDescriptionProps) {
	return (
		<div className="bg-base-100 border border-base-300 rounded-b-lg mb-6 border-t-0">
			<div className="px-4 py-3">
				<p className="mb-1">{description}</p>
				<p className="text-sm">
					For more detailed information, visit our{" "}
					<Link href="/help" className="text-primary hover:underline">
						Help page
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
