import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";

export default async function Analysis_Run_name({ params }: { params: { analysis_run_name: string } }) {
	const analysis = await prisma.analysis.findUnique({
		where: {
			analysis_run_name: params.analysis_run_name
		},
		include: {
			_count: {
				select: {
					Occurrences: true,
					Assignments: true
				}
			}
		}
	});
	if (!analysis) return <>Analysis not found</>;
	return (
		<>
			<h1>analysis_run_name {analysis.analysis_run_name}</h1>
			<div className="flex gap-5">
				<Link href={`/explore/analysis/${params.analysis_run_name}/Occurrences`} className="btn">
					{analysis._count.Occurrences} Occurrences
				</Link>
				<Link href={`/explore/analysis/${params.analysis_run_name}/Assignments`} className="btn">
					{analysis._count.Assignments} Assignments
				</Link>
			</div>
		</>
	);
}
