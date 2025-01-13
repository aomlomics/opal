"use client";

import { Prisma } from "@prisma/client";
import Link from "next/link";

export default function Pagination({
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
	const headers = Object.keys(data[0]);
	headers.splice(headers.indexOf(id), 1);
	headers.splice(headers.indexOf(title), 1);

	return (
		<div className="h-full overflow-x-auto overflow-y-auto">
			<table className="table table-xs table-pin-rows table-pin-cols">
				<thead>
					<tr>
						<th>{title}</th>
						<>
							{headers.map((head) => (
								<td key={head}>{head}</td>
							))}
						</>
						<th>{id}</th>
					</tr>
				</thead>
				<tbody>
					{data.map((d: any) => (
						<tr key={d[id]} className={"border-base-100 border-b-2"}>
							<th className="p-0">
								<Link href={`/explore/${table}/${d[id]}`} className="p-2 w-full h-full">
									{d[title]}
								</Link>
							</th>
							<>
								{headers.map((head, i) => (
									<td className={d[head] ? "" : "bg-base-100 opacity-45"} key={d[head] + "child" + i}>
										{d[head]}
									</td>
								))}
							</>
							<th>{d[id]}</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
