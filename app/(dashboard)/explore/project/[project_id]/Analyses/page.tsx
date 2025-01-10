import Pagination from "@/app/components/Pagination";
import Link from "next/link";

export default async function Analyses({ params }: { params: Promise<{ project_id: string }> }) {
	const { project_id } = await params;

	return (
		<>
			<h1>
				<Link href={`/explore/project/${project_id}`} className="text-primary hover:underline">
					{project_id}
				</Link>{" "}
				<span> analyses</span>
			</h1>
			<Pagination table={"analysis"} where={{ project_id }} title={"analysis_run_name"} id={"analysis_run_name"} />
		</>
	);
}
