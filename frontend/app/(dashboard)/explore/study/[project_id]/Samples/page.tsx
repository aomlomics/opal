import Pagination from "@/app/components/Pagination";
import Link from "next/link";

export default async function Samples({ params }: { params: { project_id: string } }) {
	return (
		<>
			<h1>
				<Link href={`/explore/study/${params.project_id}`} className="text-primary hover:underline">
					{params.project_id}
				</Link>{" "}
				<span> samples</span>
			</h1>
			<Pagination table={"sample"} where={{ project_id: params.project_id }} title={"samp_name"} id={"samp_name"} />
		</>
	);
}
