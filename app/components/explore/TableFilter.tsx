"use client";

import { useState } from "react";

export default function TableFilter() {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className="bg-base-100 border border-base-300 rounded-lg">
			<button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className="w-full px-6 py-4 flex justify-between items-center hover:bg-base-200/50 transition-colors"
			>
				<div className="flex items-center gap-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-base-content/70"
					>
						<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
					</svg>
					<span className="font-medium text-base-content">Filters</span>
				</div>
				<svg
					className={`w-5 h-5 text-base-content/70 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{!isCollapsed && (
				<div className="px-6 py-4 border-t border-base-300">
					<div className="space-y-4">
						{/* Dummy filters - replace with real ones later */}
						<div>
							<label className="text-sm font-medium text-base-content/70 mb-2 block">Search</label>
							<input
								type="text"
								placeholder="Search projects..."
								className="input input-bordered w-full bg-base-200 border-base-300 placeholder:text-base-content/50"
							/>
						</div>
						<div>
							<label className="text-sm font-medium text-base-content/70 mb-2 block">Sort by</label>
							<select className="select select-bordered w-full bg-base-200 border-base-300 text-base-content">
								<option>Newest first</option>
								<option>Oldest first</option>
								<option>A-Z</option>
								<option>Z-A</option>
							</select>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
