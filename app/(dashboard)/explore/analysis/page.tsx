import TableFilter from "@/app/components/explore/TableFilter";
import Pagination from "@/app/components/data/Pagination";
import { Suspense } from "react";

export default async function Analysis() {
	return (
		<div className="space-y-6">
			<h1 className="text-xl font-medium text-base-content">
				Showing all
				<span className="text-primary"> Analyses</span>
			</h1>

			<TableFilter />

			<div className="bg-base-100 rounded-lg border border-base-300">
				<Suspense fallback={null}>
					<Pagination
						table="analysis"
						id="analysis_run_name"
						title="analysis_run_name"
						fields={["project_id", "assay_name", "asv_method"]}
						relCounts={["Occurrences", "Assignments"]}
					/>
				</Suspense>
			</div>
		</div>
	);
}
