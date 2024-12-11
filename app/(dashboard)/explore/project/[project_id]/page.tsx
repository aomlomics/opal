import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";

export default async function Project_Id({ params }: { params: { project_id: string } }) {
	const project = await prisma.project.findUnique({
		where: {
			project_id: params.project_id
		},
		include: {
			_count: {
				select: {
					Samples: true,
					Analyses: true
				}
			}
		}
	});
	if (!project) return <>Project not found</>;
	return (
		<>
			<h1>project_id {project.project_id}</h1>
			<div className="flex gap-5">
				<Link href={`/explore/project/${params.project_id}/Samples`} className="btn">
					{project._count.Samples} Samples
				</Link>
				<Link href={`/explore/project/${params.project_id}/Analyses`} className="btn">
					{project._count.Analyses} Analyses
				</Link>
			</div>
		</>
	);
}
