import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Feature() {
	return (
		<Suspense fallback={null}>
			<Pagination table={"feature"} />
		</Suspense>
	);
}
