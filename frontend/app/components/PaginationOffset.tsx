"use client";

import { useState } from "react";
import { Prisma } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../helpers/utils";
import Link from "next/link";

export default function PaginationOffset({
	table,
	take = 10
}: {
	table: Uncapitalize<Prisma.ModelName>;
	take?: number;
}) {
	const [query, setQuery] = useState("");

	//const origin = typeof window !== "undefined" ? window.location.origin : null;
	const { data, error, isLoading } = useSWR(`/api/pagination?table=${table}&take=${take}${query}`, fetcher, {
		keepPreviousData: true
	});
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	return (
		<div className="p-5 bg-primary rounded-xl">
			<div className="flex flex-col gap-3">
				{data.result.map((d: Record<string, string | number>, i: number) => (
					<Link key={i} href={`/explore/${table}/${d.id}`}>
						<div className="card bg-neutral-content">
							<div className="card-body p-5">{d.id}</div>
						</div>
					</Link>
				))}
			</div>
			<div className="join grid grid-flow-col">
				<button
					className="join-item btn btn-outline"
					disabled={!data.skip}
					onClick={() => {
						setQuery(`&skip=${data.skip + take}&dir=-1`);
					}}
				>
					&lt;
				</button>
				<div className="flex items-center justify-center">
					{data.skip || 0}-{data.skip + take || take}
				</div>
				<button
					className="join-item btn btn-outline"
					disabled={data.skip + take > data.count}
					onClick={() => {
						setQuery(`&skip=${data.skip + take || take}`);
					}}
				>
					&gt;
				</button>
			</div>
		</div>
	);
}
