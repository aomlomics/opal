"use client";

//import { useState } from "react";
import { Prisma } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../helpers/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ table, take = 10 }: { table: Uncapitalize<Prisma.ModelName>; take?: number }) {
	//const [query, setQuery] = useState("");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	//const origin = typeof window !== "undefined" ? window.location.origin : null;
	//const { data, error, isLoading } = useSWR(`/api/pagination?table=${table}&take=${take}${query}`, fetcher, {
	const { data, error, isLoading } = useSWR(
		`/api/pagination?table=${table}&take=${take}&page=${searchParams.get("page") || 1}`,
		fetcher,
		{
			keepPreviousData: true
		}
	);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

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
					disabled={!searchParams.get("page") || parseInt(searchParams.get("page") as string) <= 1}
					onClick={() => {
						//setQuery(`&skip=${data.skip + take}&dir=-1`);
						handlePage(-1);
					}}
				>
					&lt;
				</button>
				<div className="flex items-center justify-center">
					{(parseInt(searchParams.get("page") || "1") - 1) * take}-{parseInt(searchParams.get("page") || "1") * take}
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
