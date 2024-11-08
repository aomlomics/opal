import StudyUpload from "@/components/StudyUpload";
import ProjectCatalogue from "@/components/ProjectCatalogue";
import Search from "@/components/Search";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
	ssr: false
});
export const maxDuration = 120;

export default async function Dashboard() {
	return (
		<main className="flex flex-col z-40 m-5 gap-5">
			<StudyUpload></StudyUpload>
			<Search placeholder="Search"></Search>
			<div className="flex-grow">
				<Map></Map>
			</div>
			<ProjectCatalogue></ProjectCatalogue>
		</main>
	);
}
