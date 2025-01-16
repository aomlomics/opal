"use client";

import { DeadValueEnum, TableToEnumSchema } from "@/types/enums";
import { Prisma } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, ReactNode, useRef, useState } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
import { fetcher } from "../helpers/utils";

export default function Table({
	table,
	title,
	where,
	take = 50
}: {
	table: Uncapitalize<Prisma.ModelName>;
	title: string;
	where?: Record<string, any>;
	take?: number;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const [whereFilter, setWhereFilter] = useState({} as Record<string, { contains: string; mode: "insensitive" }>);

	const [columnsFilter, setColumnsFilter] = useState("");
	const handleColFilter = useDebouncedCallback((f) => {
		setColumnsFilter(f);
	}, 300);

	const [headersFilter, setHeadersFilter] = useState({} as Record<string, boolean>);

	//pagination previous/next buttons
	function handlePage(dir = 1) {
		const params = new URLSearchParams(searchParams);
		const pageStr = params.get("page");
		if (pageStr) {
			const page = parseInt(pageStr);
			params.set("page", (page + dir).toString());
		} else {
			params.set("page", "2");
		}
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	//filters in the column header
	function applyFilters(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		console.log(formData);

		const temp = {} as typeof whereFilter;
		for (const [key, value] of formData.entries()) {
			if (typeof value === "string")
				if (value.trim()) {
					temp[key] = { contains: value, mode: "insensitive" };
				}
		}
		setWhereFilter(temp);
	}

	//api call
	let query = new URLSearchParams({
		table,
		take: take.toString(),
		page: searchParams.get("page") || "1"
	});
	if (where) {
		if (Object.keys(whereFilter).length) {
			query.set("where", JSON.stringify({ ...where, ...whereFilter }));
		} else {
			query.set("where", JSON.stringify(where));
		}
	}
	const { data, error, isLoading } = useSWR(`/api/pagination?${query.toString()}`, fetcher);
	if (isLoading) return <div>loading...</div>;
	if (error || data.error) return <div>failed to load: {error || data.error}</div>;

	const headers = TableToEnumSchema[table]._def.values as string[];
	//remove database field
	headers.splice(headers.indexOf("id"), 1);
	//displaying this header differently, so removing it
	headers.splice(headers.indexOf(title), 1);
	//remove all headers where the value is assumed to be the same
	if (where) {
		for (const head in where) {
			headers.splice(headers.indexOf(head), 1);
		}
	}

	return (
		<div className="w-full h-full flex flex-col">
			<div className="grid grid-cols-3 justify-items-center">
				{/* Filters Buttons */}
				<div className="flex gap-5">
					<button onClick={() => setWhereFilter({})} className="btn btn-sm">
						Clear Filters
					</button>
					<button form={`${table}TableForm`} type="submit" className="btn btn-sm">
						Apply Filters
					</button>
				</div>
				{/* Pagination Controls */}
				<div className="flex items-center justify-center gap-8">
					<button
						className="btn btn-ghost gap-2"
						disabled={!searchParams.get("page") || parseInt(searchParams.get("page") as string) <= 1}
						onClick={() => handlePage(-1)}
					>
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
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Previous
					</button>

					<div className="text-base-content/70">
						{(parseInt(searchParams.get("page") || "1") - 1) * take}-
						{parseInt(searchParams.get("page") || "1") * take < data.count
							? parseInt(searchParams.get("page") || "1") * take
							: data.count}{" "}
						of {data.count}
					</div>

					<button
						className="btn btn-ghost gap-2"
						disabled={parseInt(searchParams.get("page") || "1") * take > data.count}
						onClick={() => handlePage()}
					>
						Next
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
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</button>
				</div>
				{/* Column Selection Button */}
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-sm">
						Columns
					</div>
					{/* Dropdown */}
					<div
						tabIndex={0}
						className="dropdown-content menu bg-base-300 rounded-box z-50 w-52 shadow p-0 text-xs min-w-min w-[250px]"
					>
						{/* Header Name Filter Section */}
						<div className="form-control flex-row items-center w-full border-b-2 p-2 pb-0">
							<label className="label cursor-pointer justify-start">
								<input
									type="checkbox"
									onChange={(e) => {
										if (e.target.checked) {
											setHeadersFilter({});
										} else {
											setHeadersFilter(
												headers.reduce((acc, head) => {
													if (!headersFilter[head]) {
														return { ...acc, [head]: true };
													} else {
														return { ...acc };
													}
												}, {})
											);
										}
									}}
									checked={!Object.values(headersFilter).some((bool) => bool)}
									className="checkbox checkbox-xs"
								/>
								<span className="label-text pl-2">All</span>
							</label>
							<input
								type="text"
								onChange={(e) => handleColFilter(e.target.value)}
								placeholder="Filter"
								className="input input-bordered input-xs w-full max-w-xs"
							/>
						</div>
						{/* Header Names Section */}
						<ul className="p-2 pt-0 w-full max-h-[200px] overflow-y-auto">
							{headers.reduce((acc: ReactNode[], head) => {
								//only render the header name if it is selected in the header name filter
								if (head.toLowerCase().includes(columnsFilter.toLowerCase())) {
									//Header Name
									acc.push(
										<li key={head + "_dropdown"} className="form-control">
											<label className="label cursor-pointer justify-start p-1">
												<input
													type="checkbox"
													checked={!headersFilter[head]}
													onChange={() => {
														const temp = { ...headersFilter };
														if (headersFilter[head]) {
															delete temp[head];
														} else {
															temp[head] = true;
														}
														setHeadersFilter(temp);
													}}
													className="checkbox checkbox-xs"
												/>
												<span className="label-text pl-2">{head}</span>
											</label>
										</li>
									);
								}

								return acc;
							}, [])}
						</ul>
					</div>
				</div>
			</div>
			<form
				id={`${table}TableForm`}
				onSubmit={applyFilters}
				className="overflow-auto scrollbar scrollbar-thumb-accent scrollbar-track-base-100"
			>
				<table className="table table-xs table-pin-rows table-pin-cols">
					{/* Headers */}
					<thead>
						<tr>
							{/* Title Header Cell */}
							<th className="p-0 pr-2 z-40">
								<label className="form-control w-full max-w-xs">
									<div>
										<span>{title}</span>
									</div>
									{/* Value Filter */}
									<label className="input input-bordered input-xs flex items-center gap-2">
										<input
											name={title}
											defaultValue={!!whereFilter[title] ? whereFilter[title].contains : ""}
											type="text"
											className="grow"
										/>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											className="h-4 w-4 opacity-70"
										>
											<path
												fillRule="evenodd"
												d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
												clipRule="evenodd"
											/>
										</svg>
									</label>
								</label>
							</th>
							{headers.reduce((acc: ReactNode[], head) => {
								//only render the header if it is selected in the header filter
								if (!headersFilter[head]) {
									//Header
									acc.push(
										<td key={head}>
											<label className="form-control w-full max-w-xs">
												<div>
													<span>{head}</span>
												</div>
												{/* Value Filter */}
												<label className="input input-bordered input-xs flex items-center gap-2">
													<input
														name={head}
														defaultValue={!!whereFilter[head] ? whereFilter[head].contains : ""}
														type="text"
														className="grow"
													/>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 16 16"
														fill="currentColor"
														className="h-4 w-4 opacity-70"
													>
														<path
															fillRule="evenodd"
															d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
															clipRule="evenodd"
														/>
													</svg>
												</label>
											</label>
										</td>
									);
								}

								return acc;
							}, [])}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{/* Value Cell */}
						{data.result.reduce((acc: ReactNode[], row: any, i: number) => {
							//node to render
							acc.push(
								<tr key={i} className="border-base-100 border-b-2">
									<th>{row[title]}</th>
									{headers.reduce((acc: ReactNode[], head, i) => {
										if (!headersFilter[head]) {
											//cell
											acc.push(
												<td
													className={`whitespace-nowrap ${i ? "border-base-100 border-l-2" : ""} ${
														row[head] ? "" : "bg-base-300"
													}`}
													key={row[head] + "child" + i}
												>
													{row[head] in DeadValueEnum && typeof row[head] === "number"
														? DeadValueEnum[row[head]]
														: row[head]}
												</td>
											);
										}

										return acc;
									}, [])}
									<th>{i + 1 + (parseInt(searchParams.get("page") || "1") - 1) * take}</th>
								</tr>
							);

							return acc;
						}, [])}
					</tbody>
				</table>
			</form>
		</div>
	);
}
