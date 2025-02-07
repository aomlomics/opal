import ExploreTabButtons from "@/app/components/explore/ExploreTabButtons";
import LoadingTableFilter from "@/app/components/explore/LoadingTableFilter";
import TableFilter from "@/app/components/explore/TableFilter";
import Pagination from "@/app/components/paginated/Pagination";
import Link from "next/link";
import { Suspense } from "react";

export default async function Project() {
	return (
		<div className="grid grid-cols-[300px_1fr] gap-6 pt-6">
			<Suspense fallback={<LoadingTableFilter />}>
				<TableFilter tableConfig={[]} />
			</Suspense>
			<div className="space-y-6">
				<div className="space-y-[-1px]">
					<div className="border-b border-base-300">
						<nav className="flex tabs tabs-lifted">
							<ExploreTabButtons />
						</nav>
					</div>
					<div className="bg-base-100 border border-base-300 rounded-lg p-4 mb-6">
						<p className="mb-2">
							eDNA samples with metadata on collection, environmental conditions, storage, and processing methods.
						</p>
						<p className="text-sm">
							For more detailed information, visit our{" "}
							<Link href="/help" className="text-primary hover:underline">
								Help page
							</Link>
							.
						</p>
					</div>
				</div>

				<div className="space-y-6">
					<h1 className="text-xl font-medium text-base-content">
						Showing all
						<span className="text-primary"> Samples</span>
					</h1>

					<div className="bg-base-100 rounded-lg border border-base-300">
						<Pagination
							table="sample"
							id="samp_name"
							title="samp_name"
							fields={["project_id", "geo_loc_name"]}
							relCounts={["Occurrences"]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
