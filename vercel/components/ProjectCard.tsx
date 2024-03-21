import type { Project } from "@prisma/client";

export default function ProjectCard({ proj }: { proj: Project }) {
	return (
		<div>
			{JSON.stringify(proj)}
		</div>
	);
}