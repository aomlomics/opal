"use client";

import { convertDBEnum } from "@/app/helpers/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type RangeValue = {
	gte?: number;
	lte?: number;
};

type FilterValue = string | RangeValue | undefined;

type FilterConfig = {
	field: string;
	label: string;
	type: "select" | "multiselect" | "date" | "range";
	options?: string[];
	enum?: Record<string, string>;
	gte?: number;
	lte?: number;
};

// Main filter component that shows in the sidebar
// Handles all the filters for a specific table (like projects or analyses)
export default function ActualTableFilter({ tableConfig }: { tableConfig: FilterConfig[] }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get what filters are currently active from the URL
	const activeFilters = Object.fromEntries(
		Array.from(searchParams.entries()).filter(([key]) => tableConfig.some((config) => config.field === key))
	);

	const activeFilterCount = Object.keys(activeFilters).length;

	// When someone changes a filter, update the URL
	function handleFilterChange(field: string, value: FilterValue) {
		const params = new URLSearchParams(searchParams);

		if (value === undefined || value === "") {
			params.delete(field);
		} else if (typeof value === "string") {
			params.set(field, value);
		} else if (typeof value === "object") {
			const temp = {} as RangeValue;

			const valObj = params.get(field);
			if (valObj) {
				const parsedValObj = JSON.parse(valObj);

				if (parsedValObj.gte) {
					temp.gte = parsedValObj.gte;
				}
				if (parsedValObj.lte) {
					temp.lte = parsedValObj.lte;
				}
			}

			if (value.gte) {
				temp.gte = value.gte;
			}
			if (value.lte) {
				temp.lte = value.lte;
			}

			params.set(field, JSON.stringify(temp));
		}

		router.push(`?${params.toString()}`);
	}
	const handleFilterDebounce = useDebouncedCallback((field: string, value: FilterValue) => {
		handleFilterChange(field, value);
	}, 100);

	function safeJsonParse(str: string) {
		try {
			return JSON.parse(str);
		} catch {
			return str;
		}
	}

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
					<h3 className="font-medium text-base-content">Filters</h3>
				</div>
				<div>
					{activeFilterCount > 0 && <span className="text-sm text-base-content/70">{activeFilterCount} active</span>}
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
										{typeof safeJsonParse(activeFilters[filter.field]) === "object"
											? (JSON.parse(activeFilters[filter.field]).gte || filter) +
											  " to " +
											  (JSON.parse(activeFilters[filter.field]).lte || filter.lte)
											: activeFilters[filter.field]}
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
									{filter.enum
										? Object.values(convertDBEnum(filter.enum)).map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
										  ))
										: filter.options &&
										  filter.options.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
										  ))}
								</select>
							) : (
								filter.type === "range" && (
									<div>
										<div>
											<h2>Min:</h2>
											<input
												id={`${filter.field}MinSlider`}
												type="range"
												min={filter.gte}
												max={filter.lte}
												className="range"
												defaultValue={
													(JSON.parse(searchParams.get(filter.field) as string) &&
														JSON.parse(searchParams.get(filter.field) as string).gte) ||
													filter.gte
												}
												onChange={(e) => {
													handleFilterDebounce(
														filter.field,
														e.target.value ? { gte: parseInt(e.target.value) } : undefined
													);
													const inp = document.getElementById(`${filter.field}MinInput`) as HTMLInputElement;
													if (inp) {
														inp.value = e.target.value;
													}
												}}
											/>
											<div className="flex w-full justify-between px-2 text-xs">
												<span>{filter.gte}</span>
												<input
													id={`${filter.field}MinInput`}
													className="input input-sm"
													type="number"
													min={filter.gte}
													max={filter.lte}
													defaultValue={
														(JSON.parse(searchParams.get(filter.field) as string) &&
															JSON.parse(searchParams.get(filter.field) as string).gte) ||
														filter.gte
													}
													onChange={(e) => {
														handleFilterDebounce(
															filter.field,
															e.target.value ? { gte: parseInt(e.target.value) } : undefined
														);
														const slider = document.getElementById(`${filter.field}MinSlider`) as HTMLInputElement;
														if (slider) {
															slider.value = e.target.value;
														}
													}}
												/>
												<span>{filter.lte}</span>
											</div>
										</div>
										<div>
											<h2>Max:</h2>
											<input
												id={`${filter.field}MaxSlider`}
												type="range"
												min={filter.gte}
												max={filter.lte}
												className="range"
												defaultValue={
													(JSON.parse(searchParams.get(filter.field) as string) &&
														JSON.parse(searchParams.get(filter.field) as string).lte) ||
													filter.lte
												}
												onChange={(e) => {
													handleFilterDebounce(
														filter.field,
														e.target.value ? { lte: parseInt(e.target.value) } : undefined
													);
													const inp = document.getElementById(`${filter.field}MaxInput`) as HTMLInputElement;
													if (inp) {
														inp.value = e.target.value;
													}
												}}
											/>
											<div className="flex w-full justify-between px-2 text-xs">
												<span>{filter.gte}</span>
												<input
													id={`${filter.field}MaxInput`}
													className="input input-sm"
													type="number"
													min={filter.gte}
													max={filter.lte}
													defaultValue={
														(JSON.parse(searchParams.get(filter.field) as string) &&
															JSON.parse(searchParams.get(filter.field) as string).lte) ||
														filter.lte
													}
													onChange={(e) => {
														handleFilterDebounce(
															filter.field,
															e.target.value ? { lte: parseInt(e.target.value) } : undefined
														);
														const slider = document.getElementById(`${filter.field}MaxSlider`) as HTMLInputElement;
														if (slider) {
															slider.value = e.target.value;
														}
													}}
												/>
												<span>{filter.lte}</span>
											</div>
											<button
												className="btn btn-sm"
												onClick={() => {
													const inpMin = document.getElementById(`${filter.field}MinInput`) as HTMLInputElement;
													if (inpMin) {
														inpMin.value = filter.gte!.toString();
													}
													const sliderMin = document.getElementById(`${filter.field}MinSlider`) as HTMLInputElement;
													if (sliderMin) {
														sliderMin.value = filter.gte!.toString();
													}

													const inpMax = document.getElementById(`${filter.field}MaxInput`) as HTMLInputElement;
													if (inpMax) {
														inpMax.value = filter.lte!.toString();
													}
													const sliderMax = document.getElementById(`${filter.field}MaxSlider`) as HTMLInputElement;
													if (sliderMax) {
														sliderMax.value = filter.lte!.toString();
													}

													handleFilterChange(filter.field, undefined);
												}}
											>
												Clear
											</button>
										</div>
									</div>
								)
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
