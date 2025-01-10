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
		<div className="space-y-6">
			{/* Project Cards */}
			<div className="grid gap-4">
				{data.result.map((d: any, i: number) => (
					<div key={i} className="block hover:translate-x-1 transition-transform duration-200">
						<div className="card bg-base-300">
							<div className="card-body p-5">
								<div className="flex justify-between items-start">
									<Link href={`/explore/${table}/${d[id]}`} className="text-base text-base-content">
										{d[title]}
									</Link>
									<div className="flex gap-4">
										{relCounts?.map((rel) => (
											<Link
												key={rel}
												href={`/explore/${table}/${d[id]}/${rel}`}
												className="btn bg-base-100 text-base-content normal-case hover:bg-base-200"
											>
												{d._count[rel]} {rel}
											</Link>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
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
					{(parseInt(searchParams.get("page") || "1") - 1) * take}-{parseInt(searchParams.get("page") || "1") * take} of{" "}
					{data.count}
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
		</div>
	);
}
