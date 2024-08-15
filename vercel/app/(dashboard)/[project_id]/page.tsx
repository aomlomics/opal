import { prisma } from "@/helpers/prisma";

export default async function ProjectId({ params }: { params: { project_id: string } }) {
	const project = await prisma.study_Data.findUnique({ //SCHEMA
		where: {
			project_id: params.project_id
		}
	});
	if (!project) return <div>Failed to load project</div>;

	return (
		<div>
			{/* {JSON.stringify(project/)} */}
			testing, failure
		</div>
	);
}