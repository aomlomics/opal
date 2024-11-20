//"use client";

import { Prisma } from "@prisma/client";
//import { useState } from "react";
//import useSWR from "swr";
//import { fetcher } from "../helpers/utils";
//import Link from "next/link";

export default function PaginationCursor({
	table,
	take = 10
}: {
	table: Uncapitalize<Prisma.ModelName>;
	take?: number;
}) {
	return <></>;
	//	const [query, setQuery] = useState("");

	//	//const origin = typeof window !== "undefined" ? window.location.origin : null;
	//	const { data, error, isLoading } = useSWR(`/api/pagination?table=${table}&take=${take}${query}`, fetcher, {
	//		keepPreviousData: true
	//	});
	//	if (error) return <div>failed to load</div>;
	//	if (isLoading) return <div>loading...</div>;

	//	//TODO: disable buttons when it would navigate away from valid values (disable previous when on first page, disable next when on last page)
	//	return (
	//		<div className="p-5 bg-primary rounded-xl">
	//			<div className="flex flex-col gap-3">
	//				{data.result.map((d: Record<string, string | number>, i: number) => (
	//					<Link key={i} href={`/explore/${table}/${d.id}`}>
	//						<div className="card bg-neutral-content">
	//							<div className="card-body p-5">{d.id}</div>
	//						</div>
	//					</Link>
	//				))}
	//			</div>
	//			<div className="join grid grid-flow-col">
	//				<button
	//					className="join-item btn btn-outline"
	//					onClick={() => {
	//						setQuery(`&cursorId=${data.result[0].id}&dir=-1`);
	//					}}
	//				>
	//					&lt;
	//				</button>
	//				{/*<div className="flex items-center justify-center">
	//					{skip}-{skip + 5}
	//				</div>*/}
	//				<button
	//					className="join-item btn btn-outline"
	//					onClick={() => {
	//						setQuery(`&cursorId=${data.result[data.result.length - 1].id}`);
	//					}}
	//				>
	//					&gt;
	//				</button>
	//			</div>
	//		</div>
	//	);
}
