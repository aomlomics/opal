import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Project() {
	return (
		<>
			<Suspense fallback={null}>
				<Pagination id={"project_id"} table={"project"} title={"project_name"} relCounts={["Samples", "Analyses"]} />
			</Suspense>
		</>
	);
}
