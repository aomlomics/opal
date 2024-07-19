import ProjectCatalogue from "@/components/ProjectCatalogue";
import { getRemoteUrl } from "@/helpers/utils";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
	ssr: false,
});

export default async function Dashboard() {
	// const res = await fetch(getRemoteUrl(), {
	// 	method: "GET",
	// 	cache: "no-store"
	// });
	// const data = await res.json();
	// if (data.error) {
	// 	return <div>Error: {data.error}</div>
	// }

	return (
		<main className="flex flex-col z-40 m-5 gap-5">
			<div className="flex-grow">
				<Map></Map>
			</div>
			{/* <ProjectCatalogue></ProjectCatalogue> */}
		</main>
	);
}
