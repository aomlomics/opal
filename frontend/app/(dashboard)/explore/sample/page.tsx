import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Study() {
	return (
		<Suspense fallback={null}>
			<Pagination table={"sample"} title={"samp_name"} />
		</Suspense>
	);
}
