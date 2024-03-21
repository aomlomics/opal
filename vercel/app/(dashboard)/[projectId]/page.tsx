import { prisma } from "@/helpers/prisma";

export default async function ProjectId({ params }: { params: { projectId: string } }) {
	const project = await prisma.project.findUnique({
		where: {
			projectId: params.projectId
		}
	});
	if (!project) return <div>Failed to load project</div>;

	return (
		<div>
			{JSON.stringify(project)}
		</div>
	);
}