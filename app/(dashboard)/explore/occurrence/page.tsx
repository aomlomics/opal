import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Occurrence() {
	return (
		<Suspense fallback={null}>
			<Pagination table={"occurrence"} title={"id"} />
		</Suspense>
	);
}
