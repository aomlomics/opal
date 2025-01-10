import Pagination from "@/app/components/Pagination";
import Link from "next/link";

export default async function Assignments({ params }: { params: { analysis_run_name: string } }) {
	const { analysis_run_name } = await params;

	return (
		<>
			<h1>
				<Link href={`/explore/analysis/${analysis_run_name}`} className="text-primary hover:underline">
					{analysis_run_name}
				</Link>
				<span> assignments</span>
			</h1>
			<Pagination table={"assignment"} where={{ analysis_run_name }} title={"id"} />
		</>
	);
}
