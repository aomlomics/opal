import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/components/Map"), {
	ssr: false
});

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
		<div className="max-w-7xl mx-auto p-6 space-y-8">
			{/* Header Section */}
			<header className="space-y-4">
				<h1 className="text-4xl font-bold text-primary">{project.project_id}</h1>
				<p className="text-xl text-base-content/70">{project.project_name}</p>
			</header>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Link
					href={`/explore/project/${params.project_id}/Samples`}
					className="stat bg-base-300 rounded-lg p-6 hover:bg-base-300/55 transition-colors"
				>
					<div className="stat-title">Total Samples</div>
					<div className="stat-value text-primary">{project._count.Samples}</div>
				</Link>

				<Link
					href={`/explore/project/${params.project_id}/Analyses`}
					className="stat bg-base-300 rounded-lg p-6 hover:bg-base-300/55 transition-colors"
				>
					<div className="stat-title">Total Analyses</div>
					<div className="stat-value text-primary">{project._count.Analyses}</div>
				</Link>

				<div className="stat bg-base-200 rounded-lg p-6">
					<div className="stat-title">Detection Type</div>
					<div className="stat-value text-sm capitalize">{project.detection_type}</div>
				</div>

				<div className="stat bg-base-200 rounded-lg p-6">
					<div className="stat-title">Last Modified</div>
					<div className="stat-value text-sm">
						{project.mod_date?.toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric"
						})}
					</div>
				</div>
			</div>

			{/* Project Details and Map Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Project Details Card */}
				<div className="card bg-base-200 shadow-xl">
					<div className="card-body">
						<h2 className="card-title text-primary mb-4">Project Details</h2>
						<div className="space-y-4">
							<div>
								<label className="text-sm font-medium text-base-content/70">Contact</label>
								<p className="text-base-content">{project.project_contact}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-base-content/70">Institution</label>
								<p className="text-base-content">{project.institution}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-base-content/70">Study Factor</label>
								<p className="text-base-content">{project.study_factor}</p>
							</div>
							{project.institutionID && (
								<div>
									<label className="text-sm font-medium text-base-content/70">Institution ID</label>
									<a
										href={project.institutionID}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline block"
									>
										{project.institutionID}
									</a>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Map Card */}
				<div className="card bg-base-200 shadow-xl">
					<div className="card-body p-0 overflow-hidden">
						<div className="h-[400px]">
							<Map />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
