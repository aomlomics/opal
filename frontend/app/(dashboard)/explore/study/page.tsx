import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Study() {
	return (
		<>
			<Suspense fallback={null}>
				<Pagination id={"project_id"} table={"study"} title={"project_name"} relCounts={["Samples", "Analyses"]} />
			</Suspense>
		</>
	);
}
