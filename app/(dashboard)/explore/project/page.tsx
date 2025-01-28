import TableFilter from "@/app/components/explore/TableFilter";
import Pagination from "@/app/components/paginated/Pagination";
import { Suspense } from "react";

export default async function Project() {
	return (
		<div className="space-y-6">
			<h1 className="text-xl font-medium text-base-content">
				Showing all
				<span className="text-primary"> Projects</span>
			</h1>

			<TableFilter />

			<div className="bg-base-100 rounded-lg border border-base-300">
				<Suspense fallback={null}>
					<Pagination
						id="project_id"
						table="project"
						title="project_name"
						fields={["detection_type", "study_factor", "institution", "project_contact"]}
						relCounts={["Samples", "Analyses"]}
					/>
				</Suspense>
			</div>
		</div>
	);
}
