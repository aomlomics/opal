"use client";

import useSWR, { preload } from "swr";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetcher } from "@/app/helpers/utils";
import PhyloPicClient from "../PhyloPicClient";
import PaginationControls from "./PaginationControls";

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
			<PaginationControls
				page={parseInt(searchParams.get("page") || "1")}
				take={take}
				count={data.count}
				handlePage={handlePage}
				handlePageHover={handlePageHover}
			/>

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
