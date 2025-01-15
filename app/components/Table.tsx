"use client";

import { DeadValueEnum } from "@/types/enums";
import { ReactNode, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Table({ data, id = "id", title }: { data: Record<string, any>[]; id?: string; title: string }) {
	// const [filters, setFilters] = useState({} as Record<string, string>);
	// const handleFilter = useDebouncedCallback((f) => {
	// 	setFilters({ ...filters, ...f });
	// }, 300);

	const headers = Object.keys(data[0]);
	headers.splice(headers.indexOf(id), 1);
	headers.splice(headers.indexOf(title), 1);
	// const [displayHeaders, setDisplayHeaders] = useState(
	// 	headers.reduce((acc, head) => ({ ...acc, [head]: true }), {} as Record<string, boolean>)
	// );

	// const [columnsFilter, setColumnsFilter] = useState("");
	// const handleColFilter = useDebouncedCallback((f) => {
	// 	setColumnsFilter(f);
	// }, 300);

	return (
		<div className="max-h-full overflow-x-auto overflow-y-auto">
			<table className="table table-xs table-pin-rows table-pin-cols">
				{/* Headers */}
				<thead>
					<tr>
						{/* Title Header Cell */}
						<th className="p-0 z-40">
							<div className="h-full w-full top-0 px-2 py-1">
								<div>{title}</div>
								{/* Column Selection Button */}
								{/* <div className="dropdown">
									<div tabIndex={0} role="button" className="btn btn-xs">
										Columns
									</div>
									Dropdown
									<div
										tabIndex={0}
										className="dropdown-content menu bg-base-300 rounded-box z-50 w-52 shadow p-0 text-xs min-w-min w-[250px]"
									>
										Header Name Filter Section
										<div className="form-control flex-row items-center w-full border-b-2 p-2 pb-0">
											<label className="label cursor-pointer justify-start">
												<input
													type="checkbox"
													onChange={(e) =>
														setDisplayHeaders(
															Object.keys(displayHeaders).reduce(
																(acc, head) => ({ ...acc, [head]: e.target.checked }),
																{}
															)
														)
													}
													checked={!Object.values(displayHeaders).some((bool) => !bool)}
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
										Header Names Section
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
																	checked={displayHeaders[head]}
																	onChange={() =>
																		setDisplayHeaders({ ...displayHeaders, [head]: !displayHeaders[head] })
																	}
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
								</div> */}
							</div>
						</th>

						{/* Headers */}
						{headers.map((head) => (
							<td key={head}>
								<label className="form-control w-full max-w-xs">
									<div>
										<span>{head}</span>
									</div>
									{/* Value Filter */}
									{/* <label className="input input-bordered input-xs flex items-center gap-2">
										<input onChange={(e) => handleFilter({ [head]: e.target.value })} type="text" className="grow" />
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
									</label> */}
								</label>
							</td>
						))}
						{/* {headers.reduce((acc: ReactNode[], head) => {
							//only render the header if it is selected in the header filter
							if (displayHeaders[head]) {
								//Header
								acc.push(
									<td key={head}>
										<label className="form-control w-full max-w-xs">
											<div>
												<span>{head}</span>
											</div>
											Value Filter
											<label className="input input-bordered input-xs flex items-center gap-2">
												<input
													onChange={(e) => handleFilter({ [head]: e.target.value })}
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
						}, [])} */}
						<th>{id}</th>
					</tr>
				</thead>
				<tbody>
					{/* Value Cell */}
					{data.map((row) => (
						<tr key={row[id]} className="border-base-100 border-b-2">
							<th>{row[title]}</th>
							<>
								{headers.map((head, i) => (
									<td
										className={`whitespace-nowrap ${i ? "border-base-100 border-l-2" : ""} ${
											row[head] ? "" : "bg-base-300"
										}`}
										key={row[head] + "child" + i}
									>
										{row[head] in DeadValueEnum && typeof row[head] === "number" ? DeadValueEnum[row[head]] : row[head]}
									</td>
								))}
							</>
							<th>{row[id]}</th>
						</tr>
					))}
					{/* {data.reduce((acc: ReactNode[], row) => {
						//node to render
						const rowNode = (
							<tr key={row[id]} className="border-base-100 border-b-2">
								<th>{row[title]}</th>
								<>
									{headers.reduce((acc: ReactNode[], head, i) => {
										if (displayHeaders[head]) {
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
								</>
								<th>{row[id]}</th>
							</tr>
						);

						//only render the cell if it matches the value filter
						//no filters, include everything
						if (Object.keys(filters).length === 0) {
							acc.push(rowNode);
						} else {
							//make sure ALL fields match filters
							let addToArray = true;
							for (const field in filters) {
								if (!row[field].toLowerCase().includes(filters[field].toLowerCase())) {
									addToArray = false;
								}
							}

							if (addToArray) {
								acc.push(rowNode);
							}
						}

						return acc;
					}, [])} */}
				</tbody>
			</table>
		</div>
	);
}
