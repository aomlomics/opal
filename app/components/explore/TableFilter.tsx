"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FILTER_CONFIGS, FilterConfig, FilterValue } from "./filters";
import { Suspense } from "react";

interface TableFilterProps {
	table: string;
}

// This component handles each individual filter dropdown
// It shows the label and current value, and lets you change it
function FilterSection({
	filter,
	value,
	onChange
}: {
	filter: FilterConfig;
	value: FilterValue;
	onChange: (value: FilterValue) => void;
}) {
	// Only show select dropdown if we have options
	if (!filter.options) return null;

	// Need to convert our FilterValue to string for the select element
	const selectValue = typeof value === "object" ? "" : value || "";

	return (
		<div className="collapse bg-base-100">
			<input type="checkbox" className="collapse-toggle" />
			<div className="collapse-title">
				<div className="flex flex-col items-start gap-1">
					<span className="font-medium text-base-content">{filter.label}</span>
					{value !== undefined && (
						<span className="text-sm text-base-content/70">{typeof value === "object" ? "Custom range" : value}</span>
					)}
				</div>
			</div>
			<div className="collapse-content bg-base-200/30">
				<select
					className="select select-bordered w-full"
					value={selectValue}
					onChange={(e) => onChange(e.target.value || undefined)}
				>
					<option value="">Any</option>
					{filter.options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

// Main filter component that shows in the sidebar
// Handles all the filters for a specific table (like projects or analyses)
export default function TableFilter({ table }: TableFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const tableConfig = FILTER_CONFIGS[table] || [];

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
		<Suspense>
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
							{activeFilterCount > 0 && (
								<span className="text-sm text-base-content/70">{activeFilterCount} active</span>
							)}
						</div>
					</div>
				</div>

				{/* List of all available filters */}
				<div className="divide-y divide-base-300">
					{tableConfig.map((filter) => (
						<FilterSection
							key={filter.field}
							filter={filter}
							value={activeFilters[filter.field]}
							onChange={(value) => handleFilterChange(filter.field, value)}
						/>
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
		</Suspense>
	);
}
