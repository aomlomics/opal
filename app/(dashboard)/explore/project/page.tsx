import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/components/Map"), {
	ssr: false
});

export default async function Project() {
	return (
		<div className="space-y-8">
			<div className="h-[400px] w-full rounded-xl overflow-hidden bg-base-200 shadow-lg">
				<Map />
			</div>

			<div>
				<h1 className="text-2xl text-base-content mb-4">
					Showing all
					<span className="text-primary"> Projects</span>
				</h1>

				<div className="bg-base-200 p-6 rounded-xl shadow-lg">
					<Suspense fallback={null}>
						<Pagination
							id={"project_id"}
							table={"project"}
							title={"project_name"}
							relCounts={["Samples", "Analyses"]}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	);
}
