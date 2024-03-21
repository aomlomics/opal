import { prisma } from "@/helpers/prisma";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectCatalogue() {
	let projects = await prisma.project.findMany();

	return (
		<div>
			{projects.map((proj) => (
				<ProjectCard key={proj.id} proj={proj}></ProjectCard>
			))}
		</div>
	);
}