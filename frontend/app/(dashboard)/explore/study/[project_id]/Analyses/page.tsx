import Pagination from "@/app/components/Pagination";
import Link from "next/link";

export default async function Analyses({ params }: { params: { project_id: string } }) {
	return (
		<>
			<h1>
				<Link href={`/explore/study/${params.project_id}`} className="text-primary hover:underline">
					{params.project_id}
				</Link>{" "}
				<span> analyses</span>
			</h1>
			<Pagination
				table={"analysis"}
				where={{ project_id: params.project_id }}
				title={"analysis_run_name"}
				id={"analysis_run_name"}
			/>
		</>
	);
}
