"use client";

import { useSearchParams, useRouter } from "next/navigation";

type RangeValue = {
	min?: number;
	max?: number;
};

type FilterValue = string | RangeValue | undefined;

type FilterConfig = {
	field: string;
	label: string;
	type: "select" | "multiselect" | "date" | "range";
	options?: string[];
	enumType?: any;
	min?: number; // Add these for range type filters
	max?: number; // Add these for range type filters
};

// Main filter component that shows in the sidebar
// Handles all the filters for a specific table (like projects or analyses)
export default function TableFilter({ tableConfig }: { tableConfig: FilterConfig[] }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get what filters are currently active from the URL
	const activeFilters = Object.fromEntries(
		Array.from(searchParams.entries()).filter(([key]) => tableConfig.some((config) => config.field === key))
	);

	const activeFilterCount = Object.keys(activeFilters).length;

	// When someone changes a filter, update the URL
	const handleFilterChange = (field: string, value: FilterValue) => {
		const params = new URLSearchParams(searchParams);

		if (value === undefined || value === "") {
			params.delete(field);
		} else if (typeof value === "string") {
			// Only handle string values for now
			params.set(field, value);
		}

		router.push(`?${params.toString()}`);
	};

	return (
		<div className="bg-base-100 rounded-lg border border-base-300 sticky top-6">
			{/* Shows how many filters are being used */}
			<div className="p-4 border-b border-base-300 bg-base-200/50">
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
						className="text-primary"
					>
						<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
					</svg>
					<div>
						<h3 className="font-medium text-base-content">Filters</h3>
						{activeFilterCount > 0 && <span className="text-sm text-base-content/70">{activeFilterCount} active</span>}
					</div>
				</div>
			</div>

			{/* List of all available filters */}
			<div className="divide-y divide-base-300">
				{tableConfig.map((filter) => (
					<div key={filter.field} className="collapse bg-base-100">
						<input type="checkbox" className="collapse-toggle" />
						<div className="collapse-title">
							<div className="flex flex-col items-start gap-1">
								<span className="font-medium text-base-content">{filter.label}</span>
								{activeFilters[filter.field] !== undefined && (
									<span className="text-sm text-base-content/70">
										{typeof activeFilters[filter.field] === "object" ? "Custom range" : activeFilters[filter.field]}
									</span>
								)}
							</div>
						</div>
						<div className="collapse-content bg-base-200/30">
							{filter.type === "select" ? (
								<select
									className="select select-bordered w-full"
									value={typeof activeFilters[filter.field] === "object" ? "" : activeFilters[filter.field] || ""}
									onChange={(e) => handleFilterChange(filter.field, e.target.value || undefined)}
								>
									<option value="">Any</option>
									{filter.options &&
										filter.options.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
								</select>
							) : (
								filter.type === "range" && <div>range</div>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Button to clear all active filters */}
			{activeFilterCount > 0 && (
				<div className="p-4 border-t border-base-300 bg-base-200/50">
					<button
						onClick={() => {
							const params = new URLSearchParams(searchParams);
							tableConfig.forEach((config) => params.delete(config.field));
							router.push(`?${params.toString()}`);
						}}
						className="btn btn-ghost btn-sm w-full"
					>
						Clear all filters
					</button>
				</div>
			)}
		</div>
	);
}
