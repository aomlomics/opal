"use client";

import { useState } from "react";
import Link from "next/link";

interface TableDescriptionProps {
	tableName: string;
	description: string;
}

export default function TableDescription({ tableName, description }: TableDescriptionProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="bg-base-100 border border-base-300 rounded-lg mb-6">
			<button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className="w-full px-4 py-3 flex justify-between items-center hover:bg-base-200"
			>
				<h2 className="text-lg font-medium">{tableName}</h2>
				<svg
					className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{!isCollapsed && (
				<div className="px-4 py-3 border-t border-base-300">
					<p className="mb-2">{description}</p>
					<p className="text-sm">
						For more detailed information, visit our{" "}
						<Link href="/help" className="text-primary hover:underline">
							Help page
						</Link>
						.
					</p>
				</div>
			)}
		</div>
	);
}
