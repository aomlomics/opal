import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";

export default async function Assignment() {
	return (
		<Suspense fallback={null}>
			<Pagination table={"assignment"} title={"id"} />
		</Suspense>
	);
}
