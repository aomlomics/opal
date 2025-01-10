import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";
import MapWrapper from "@/app/components/MapWrapper";

export default async function Project_Id({ params }: { params: Promise<{ project_id: string }> }) {
	const { project_id } = await params;

	const project = await prisma.project.findUnique({
		where: {
			project_id
		},
		include: {
			_count: {
				select: {
					Samples: true,
					Analyses: true
				}
			},
			Samples: {
				select: {
					samp_name: true,
					decimalLatitude: true,
					decimalLongitude: true
				}
			}
		}
	});
	if (!project) return <>Project not found</>;

	return (
		<>
			<h1>project_id {project_id}</h1>
			<div className="flex gap-5">
				<Link href={`/explore/project/${project_id}/Samples`} className="btn">
					{project._count.Samples} Samples
				</Link>
				<Link href={`/explore/project/${project_id}/Analyses`} className="btn">
					{project._count.Analyses} Analyses
				</Link>
			</div>
			<div className="h-[500px] w-1/2 rounded-lg overflow-hidden">
				<MapWrapper locations={project.Samples} id="samp_name" title="Sample:" table="sample" />
			</div>
		</>
	);
}
