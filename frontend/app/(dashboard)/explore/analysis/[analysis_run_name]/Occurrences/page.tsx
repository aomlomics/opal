import Pagination from "@/app/components/Pagination";
import Link from "next/link";

export default async function Occurrences({ params }: { params: { analysis_run_name: string } }) {
	return (
		<>
			<h1>
				<Link href={`/explore/analysis/${params.analysis_run_name}`} className="text-primary hover:underline">
					{params.analysis_run_name}
				</Link>
				<span> occurrences</span>
			</h1>
			<Pagination table={"occurrence"} where={{ analysis_run_name: params.analysis_run_name }} title={"id"} />
		</>
	);
}
