import TableFilter from "@/app/components/explore/TableFilter";
import TaxaGrid from "@/app/components/tables/TaxaGrid";
import { Suspense } from "react";

export default async function Taxonomy() {
	return (
		<div className="space-y-6">
			<h1 className="text-xl font-medium text-base-content">
				Showing all
				<span className="text-primary"> Taxonomies</span>
			</h1>

			<TableFilter />

			<div className="bg-base-100 rounded-lg border border-base-300">
				<Suspense fallback={null}>
					<TaxaGrid />
				</Suspense>
			</div>
		</div>
	);
}
