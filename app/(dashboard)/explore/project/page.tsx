import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Project() {
	return (
		<>
			<div className="mb-4">
				<h1 className="text-2xl text-base-content">
					Showing all
					<span className="text-primary"> Projects</span>
				</h1>
			</div>
			<Suspense fallback={null}>
				<Pagination id={"project_id"} table={"project"} title={"project_name"} relCounts={["Samples", "Analyses"]} />
			</Suspense>
		</>
	);
}
