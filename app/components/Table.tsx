"use client";

import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Table({
	data,
	table,
	id = "id",
	title
}: {
	data: Record<string, any>[];
	table: Uncapitalize<Prisma.ModelName>;
	id?: string;
	title: string;
}) {
	const [filters, setFilters] = useState({} as Record<string, string>);

	const headers = Object.keys(data[0]);
	headers.splice(headers.indexOf(id), 1);
	headers.splice(headers.indexOf(title), 1);

	const handleFilter = useDebouncedCallback((f) => {
		setFilters({ ...filters, ...f });
	}, 300);

	return (
		<div className="max-h-full overflow-x-auto overflow-y-auto">
			<table className="table table-xs table-pin-rows table-pin-cols">
				<thead>
					<tr>
						{/* <th className="relative p-0">
							<div className="absolute flex justify-between h-full w-full top-0 px-2 py-1">
								<div className="self-center">{title}</div>
								<button onClick={() => setFilters({})} className="btn btn-xs self-end">
									Clear
								</button>
							</div>
						</th> */}
						<th>{title}</th>
						<>
							{headers.map((head) => (
								<td key={head}>
									<label className="form-control w-full max-w-xs">
										<div>
											<span>{head}</span>
										</div>
										<label className="input input-bordered input-xs flex items-center gap-2">
											<input
												id={head}
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
											{/* <button
												onClick={() => (document.getElementById(head)!.textContent = "")}
												className="opacity-70 hover:opacity-100 p-1"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 460.775 460.775"
													className="h-3 w-3"
													fill="currentColor"
												>
													<path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
												</svg>
											</button> */}
										</label>
									</label>
								</td>
							))}
						</>
						<th>{id}</th>
					</tr>
				</thead>
				<tbody>
					{data.reduce((acc: ReactNode[], row) => {
						const rowNode = (
							<tr key={row[id]} className={"border-base-100 border-b-2"}>
								<th className="">
									{/* <Link href={`/explore/${table}/${row[id]}`} className="p-2 w-full h-full"> */}
									{row[title]}
									{/* </Link> */}
								</th>
								<>
									{headers.map((head, i) => (
										<td className={row[head] ? "" : "bg-base-100 opacity-45"} key={row[head] + "child" + i}>
											{row[head]}
										</td>
									))}
								</>
								<th>{row[id]}</th>
							</tr>
						);

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
					}, [])}
				</tbody>
			</table>
		</div>
	);
}
