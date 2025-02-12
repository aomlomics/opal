import SubmissionsDeleteButton from "@/app/components/SubmissionsDeleteButton";
import analysisDeleteAction from "@/app/helpers/actions/analysis/delete/analysisDelete";
import projectDeleteAction from "@/app/helpers/actions/analysis/delete/projectDelete";
import { prisma } from "@/app/helpers/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function MySubmissions() {
	const { userId } = await auth();
	if (!userId) {
		return <div>Unauthorized</div>;
	}

	const [projects, analyses] = await prisma.$transaction([
		prisma.project.findMany({
			where: {
				userId
			}
		}),
		prisma.analysis.findMany({
			where: {
				userId
			}
		})
	]);

	return (
		<div>
			<div>
				<h2>Projects:</h2>
				<div className="flex flex-col gap-3">
					{projects.map((proj) => (
						<div key={proj.id} className="flex gap-3">
							<Link
								href={`/explore/project/${encodeURIComponent(proj.project_id)}`}
								className="text-info hover:text-info-focus hover:underline transition-colors"
							>
								<h3>{proj.project_id}</h3>
							</Link>
							<SubmissionsDeleteButton field={"project_id"} value={proj.project_id} action={projectDeleteAction} />
						</div>
					))}
				</div>
			</div>
			<div>
				<h2>Analyses:</h2>
				<div className="flex flex-col gap-3">
					{analyses.map((a) => (
						<div key={a.id} className="flex gap-3">
							<h3>{a.analysis_run_name}</h3>
							<SubmissionsDeleteButton
								field={"analysis_run_name"}
								value={a.analysis_run_name}
								action={analysisDeleteAction}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
