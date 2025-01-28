"use client";

//import { useState } from "react";
import { Prisma } from "@prisma/client";
import useSWR from "swr";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetcher } from "@/app/helpers/utils";

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
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

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
		<div className="space-y-6 p-6">
			{/* Project Cards */}
			<div className="grid gap-4">
				{data.result.map((d: any, i: number) => (
					<Link
						href={`/explore/${table}/${d[id]}`}
						key={i}
						className="card bg-base-200 hover:bg-base-300 transition-all duration-200"
					>
						<div className="card-body p-5">
							<div className="flex flex-col gap-3">
								{/* Title with hover animation */}
								<h3 className="text-lg font-medium text-primary">{d[title]}</h3>

								{/* Info section with clean layout */}
								<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-base-content/70">
									{fields?.map((field) => (
										<div key={field} className="flex items-center gap-2">
											<span className="font-medium">{field}:</span>
											<span>{d[field]}</span>
										</div>
									))}
								</div>

								{/* Stats with subtle separator */}
								<div className="flex gap-6 pt-1">
									{relCounts?.map((rel) => (
										<div key={rel} className="flex items-center gap-2">
											<span className="text-lg font-medium">{d._count[rel]}</span>
											<span className="text-sm text-base-content/70">{rel}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</Link>
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

				<div className="text-base-content">
					{Math.min((parseInt(searchParams.get("page") || "1") - 1) * take + 1, data.count)}-
					{Math.min(parseInt(searchParams.get("page") || "1") * take, data.count)} of {data.count}
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
