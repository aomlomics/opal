"use client";

import useSWR, { preload } from "swr";
import { fetcher } from "../helpers/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PhyloPicClient from "./PhyloPicClient";

export default function TaxaGrid({ take = 50 }: { take?: number }) {
	//const [query, setQuery] = useState("");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

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

	function handlePageHover(dir = 1) {
		let query = new URLSearchParams({
			table: "taxonomy",
			take: take.toString(),
			page: (parseInt(searchParams.get("page") || "1") + dir).toString()
		});

		preload(`/api/pagination?${query.toString()}`, fetcher);
	}

	let query = new URLSearchParams({
		table: "taxonomy",
		take: take.toString(),
		page: searchParams.get("page") || "1"
	});
	const { data, error, isLoading } = useSWR(`/api/pagination?${query.toString()}`, fetcher);
	if (isLoading) return <div>loading...</div>;
	if (error || data.error) return <div>failed to load: {error || data.error}</div>;

	return (
		<div className="space-y-6 p-6">
			{/* Pagination Controls */}
			<div className="flex items-center justify-center gap-8">
				<button
					className="btn btn-ghost gap-2"
					disabled={!searchParams.get("page") || parseInt(searchParams.get("page") as string) <= 1}
					onClick={() => handlePage(-1)}
					onMouseEnter={() => handlePageHover(-1)}
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
					onMouseEnter={() => handlePageHover(-1)}
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

			{/* Project Cards */}
			<div className="grid gap-4 grid-cols-10">
				{data.result.map((d: any) => (
					<Link
						href={`/explore/taxonomy/${d.taxonomy}`}
						key={d.taxonomy}
						className="card bg-base-200 hover:translate-x-1 transition-transform duration-200 aspect-square"
					>
						<div className="card-body p-4">
							<div className="text-base text-base-content break-words text-primary">
								{d.species
									? d.species
									: d.genus
									? d.genus
									: d.family
									? d.family
									: d.order
									? d.order
									: d.taxonClass
									? d.taxonClass
									: d.phylum
									? d.phylum
									: d.kingdom
									? d.kingdom
									: "Error"}
							</div>
							<div className="grow">
								<PhyloPicClient taxonomy={d} />
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
