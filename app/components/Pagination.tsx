"use client";

//import { useState } from "react";
import { Prisma } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../helpers/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
	table,
	id = "id",
	where,
	title,
	fields,
	relCounts,
	take = 10
}: {
	table: Uncapitalize<Prisma.ModelName>;
	id?: string;
	where?: Record<string, string>;
	title: string;
	fields?: string[];
	relCounts?: string[];
	take?: number;
}) {
	//const [query, setQuery] = useState("");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	//const origin = typeof window !== "undefined" ? window.location.origin : null;
	//const { data, error, isLoading } = useSWR(`/api/pagination?table=${table}&take=${take}${query}`, fetcher, {
	let query = new URLSearchParams({
		table,
		take: take.toString(),
		page: searchParams.get("page") || "1"
	});
	if (where) {
		query.set("where", JSON.stringify(where));
	}
	if (relCounts) {
		query.set("relCounts", relCounts.toString());
	}
	const { data, error, isLoading } = useSWR(`/api/pagination?${query.toString()}`, fetcher, {
		keepPreviousData: true
	});
	if (isLoading) return <div>loading...</div>;
	if (error || data.error) return <div>failed to load: {error || data.error}</div>;

	function handlePage(dir = 1) {
		const params = new URLSearchParams(searchParams);
		const pageStr = params.get("page");
		if (pageStr) {
			const page = parseInt(pageStr);
			params.set("page", (page + dir).toString());
		} else {
			params.set("page", "2");
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className="p-5 bg-primary rounded-xl">
			<div className="flex flex-col gap-3">
				{data.result.map((d: any, i: number) => (
					<Link key={i} href={`/explore/${table}/${d[id]}`} className="card bg-neutral-content">
						<div className="card-body p-5">
							<h1>{d[title]}</h1>
							<div className="flex gap-5">
								{relCounts?.map((rel) => (
									<Link key={rel} href={`/explore/${table}/${d[id]}/${rel}`}>
										<button className="btn">
											{d._count[rel]} {rel}
										</button>
									</Link>
								))}
							</div>
							{fields?.map((f) => (
								<div key={f}>{d[f]}</div>
							))}
						</div>
					</Link>
				))}
			</div>
			<div className="join grid grid-flow-col">
				<button
					className="join-item btn btn-outline"
					disabled={!searchParams.get("page") || parseInt(searchParams.get("page") as string) <= 1}
					onClick={() => {
						//setQuery(`&skip=${data.skip + take}&dir=-1`);
						handlePage(-1);
					}}
				>
					&lt;
				</button>
				<div className="flex items-center justify-center">
					{(parseInt(searchParams.get("page") || "1") - 1) * take}-{parseInt(searchParams.get("page") || "1") * take} of{" "}
					{data.count}
				</div>
				<button
					className="join-item btn btn-outline"
					disabled={parseInt(searchParams.get("page") || "1") * take > data.count}
					onClick={() => {
						//setQuery(`&skip=${data.skip + take || take}`);
						handlePage();
					}}
				>
					&gt;
				</button>
			</div>
		</div>
	);
}
