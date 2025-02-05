"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FILTER_CONFIGS, FilterConfig, FilterValue, RangeValue } from "./filters";

interface TableFilterProps {
	table: string;
}

export default function TableFilter({ table }: TableFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const tableConfig = FILTER_CONFIGS[table] || [];

	// Get active filters from URL
	const activeFilters = Object.fromEntries(
		Array.from(searchParams.entries()).filter(([key]) => tableConfig.some((config) => config.field === key))
	);

	const activeFilterCount = Object.keys(activeFilters).length;

	const handleFilterChange = (field: string, value: FilterValue) => {
		const params = new URLSearchParams(searchParams);

		if (value === undefined || value === "") {
			params.delete(field);
		} else if (typeof value === "object") {
			// Handle range values
			if (value.min) params.set(`${field}_min`, value.min.toString());
			if (value.max) params.set(`${field}_max`, value.max.toString());
		} else {
			params.set(field, value);
		}

		router.push(`?${params.toString()}`);
	};

	const clearAllFilters = () => {
		const params = new URLSearchParams(searchParams);
		tableConfig.forEach((config) => {
			params.delete(config.field);
			params.delete(`${config.field}_min`);
			params.delete(`${config.field}_max`);
		});
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="bg-base-100 rounded-lg border border-base-300 sticky top-6">
			{/* Header */}
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

			{/* Filter Sections */}
			<div className="divide-y divide-base-300">
				{tableConfig.map((filter) => (
					<FilterSection
						key={filter.field}
						filter={filter}
						value={activeFilters[filter.field]}
						isActive={activeSection === filter.field}
						onChange={(value) => handleFilterChange(filter.field, value)}
						onToggle={() => setActiveSection(activeSection === filter.field ? null : filter.field)}
					/>
				))}
			</div>

			{/* Actions */}
			{activeFilterCount > 0 && (
				<div className="p-4 border-t border-base-300 bg-base-200/50">
					<button onClick={clearAllFilters} className="btn btn-sm btn-ghost text-error hover:bg-error/10 w-full">
						Clear all filters
					</button>
				</div>
			)}
		</div>
	);
}

function FilterSection({
	filter,
	value,
	isActive,
	onChange,
	onToggle
}: {
	filter: FilterConfig;
	value: FilterValue;
	isActive: boolean;
	onChange: (value: FilterValue) => void;
	onToggle: () => void;
}) {
	return (
		<div className="group">
			<button
				onClick={onToggle}
				className="w-full px-4 py-3 flex items-center justify-between hover:bg-base-200/50 transition-colors"
			>
				<div className="flex flex-col items-start gap-1">
					<span className="font-medium text-base-content">{filter.label}</span>
					{value !== undefined && (
						<span className="text-sm text-base-content/70">{typeof value === "object" ? "Custom range" : value}</span>
					)}
				</div>
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
					className={`text-base-content/50 transition-transform ${isActive ? "rotate-180" : ""}`}
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>

			{isActive && (
				<div className="p-4 bg-base-200/30 border-t border-base-300">
					<FilterControl config={filter} value={value} onChange={onChange} />
				</div>
			)}
		</div>
	);
}

function FilterControl({
	config,
	value,
	onChange
}: {
	config: FilterConfig;
	value: FilterValue;
	onChange: (value: FilterValue) => void;
}) {
	switch (config.type) {
		case "select":
			const options: string[] = config.enumType ? (Object.values(config.enumType) as string[]) : config.options || [];

			return (
				<div>
					<label className="text-sm font-medium text-base-content/70 mb-2 block">{config.label}</label>
					<select
						className="select select-bordered w-full bg-base-200 border-base-300 text-base-content"
						value={(value as string) || ""}
						onChange={(e) => onChange(e.target.value || undefined)}
					>
						<option value="">All</option>
						{options.map((opt: string) => (
							<option key={opt} value={opt}>
								{opt}
							</option>
						))}
					</select>
				</div>
			);

		case "range":
			const rangeValue = (value as RangeValue) || {};
			return (
				<div>
					<label className="text-sm font-medium text-base-content/70 mb-2 block">{config.label}</label>
					<div className="flex gap-2">
						<input
							type="number"
							placeholder="Min"
							className="input input-bordered w-full"
							min={config.min}
							max={config.max}
							value={rangeValue.min || ""}
							onChange={(e) => {
								const newValue: RangeValue = {
									...rangeValue,
									min: e.target.value ? Number(e.target.value) : undefined
								};
								onChange(newValue);
							}}
						/>
						<input
							type="number"
							placeholder="Max"
							className="input input-bordered w-full"
							min={config.min}
							max={config.max}
							value={rangeValue.max || ""}
							onChange={(e) => {
								const newValue: RangeValue = {
									...rangeValue,
									max: e.target.value ? Number(e.target.value) : undefined
								};
								onChange(newValue);
							}}
						/>
					</div>
				</div>
			);

		default:
			return null;
	}
}
