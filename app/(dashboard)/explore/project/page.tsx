import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Project() {
	return (
		<div>
			<h1 className="text-2xl text-base-content mb-4">
				Showing all
				<span className="text-primary"> Projects</span>
			</h1>

			<div className="bg-base-200 p-6 rounded-xl shadow-lg">
				<Suspense fallback={null}>
					<Pagination id={"project_id"} table={"project"} title={"project_name"} relCounts={["Samples", "Analyses"]} />
				</Suspense>
			</div>
		</div>
	);
}
