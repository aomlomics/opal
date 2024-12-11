import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Analysis() {
	return (
		<Suspense fallback={null}>
			<Pagination table={"analysis"} title={"analysis_run_name"} />
		</Suspense>
	);
}
