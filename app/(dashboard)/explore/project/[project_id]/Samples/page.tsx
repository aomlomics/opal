import Pagination from "@/app/components/Pagination";
import UnderConstruction from "@/app/components/UnderConstruction";
import Link from "next/link";

export default async function Samples({ params }: { params: Promise<{ project_id: string }> }) {
	const { project_id } = await params;

	return (
		<>
			{/* <h1>
				<Link href={`/explore/project/${project_id}`} className="text-primary hover:underline">
					{project_id}
				</Link>{" "}
				<span> samples</span>
			</h1>
			<Pagination table={"sample"} where={{ project_id }} title={"samp_name"} id={"samp_name"} /> */}
			<UnderConstruction />
		</>
	);
}
