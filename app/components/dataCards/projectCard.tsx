import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProjectCardProps {
	projectId: string;
	projectName: string;
	samplesCount: number;
	analysesCount: number;
}

async function getProjectData(projectId: string) {
	const project = await prisma.project.findUnique({
		where: { project_id: projectId },
		include: {
			Samples: true,
			Analyses: true
		}
	});

	if (!project) {
		throw new Error("Project not found");
	}

	return {
		projectId: project.project_id,
		projectName: project.project_name,
		samplesCount: project.Samples.length,
		analysesCount: project.Analyses.length,
		location: "N/A", // Assuming location is not directly available
		detectionType: project.detection_type,
		environmentType: "N/A", // Assuming environment type is not directly available
		updatedBy: project.recordedBy,
		updatedDate: project.mod_date?.toISOString().split("T")[0] || "N/A",
		institution: project.institution || "N/A"
	};
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectId, projectName, samplesCount, analysesCount }) => {
	return (
		<div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
			<div className="card-body">
				<h2 className="card-title text-h2">{projectName}</h2>
				<div className="flex justify-between mt-4">
					<Link href={`/explore/${projectId}/samples`}>
						<a className="text-info hover:text-info-content transition-colors duration-200">Samples: {samplesCount}</a>
					</Link>
					<Link href={`/explore/${projectId}/analyses`}>
						<a className="text-info hover:text-info-content transition-colors duration-200">
							Analyses: {analysesCount}
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
