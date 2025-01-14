import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";
import MapWrapper from "@/app/components/MapWrapper";
import Image from "next/image";
import Table from "@/app/components/Table";

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
				omit: {
					project_id: true
				}
			},
			Analyses: {
				distinct: ["assay_name"],
				select: {
					assay_name: true,
					Assay: {
						select: {
							target_gene: true
						}
					}
				}
			}
		}
	});

	if (!project) return <>Project not found</>;

	// Get unique assays (remove duplicates)
	//const uniqueAssays = [...new Set(project.Analyses.map((a) => a.Assay).filter(Boolean))];

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-6">
			<div className="grid grid-cols-3 gap-8">
				{/* Left side - Project Info + Stats */}
				<div className="col-span-2 space-y-6">
					<header className="space-y-4">
						<h1 className="text-4xl font-bold text-primary">{project.project_id}</h1>
						<p className="text-xl text-base-content/70">{project.project_name}</p>
					</header>

					{/* Stats Cards */}
					<div className="grid grid-cols-2 gap-4">
						<Link
							href={`/explore/project/${project_id}/Samples`}
							className="stat bg-base-300 rounded-lg p-6 hover:bg-base-300/55 transition-colors"
						>
							<div className="stat-title">Total Samples</div>
							<div className="stat-value text-primary">{project._count.Samples}</div>
						</Link>

						<Link
							href={`/explore/project/${project_id}/Analyses`}
							className="stat bg-base-300 rounded-lg p-6 hover:bg-base-300/55 transition-colors"
						>
							<div className="stat-title">Total Analyses</div>
							<div className="stat-value text-primary">{project._count.Analyses}</div>
						</Link>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="stat bg-base-200 rounded-lg p-6">
							<div className="stat-title">Detection Type</div>
							<div className="stat-value text-sm capitalize">{project.detection_type}</div>
						</div>

						<div className="stat bg-base-200 rounded-lg p-6">
							<div className="stat-title">Study Factor</div>
							<div className="stat-value text-sm">{project.study_factor}</div>
						</div>
					</div>
				</div>

				{/* Right side - Institute Info Card */}
				<div className="col-span-1">
					<div className="card bg-base-200 shadow-xl">
						<div className="card-body">
							<h2 className="card-title text-primary mb-4">Institution Information</h2>
							<div className="space-y-4">
								<div>
									<label className="text-sm font-medium text-base-content/70">Contact</label>
									<p className="text-base-content">{project.project_contact}</p>
								</div>
								<div>
									<label className="text-sm font-medium text-base-content/70">Institution</label>
									<p className="text-base-content">{project.institution}</p>
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
								<div>
									<label className="text-sm font-medium text-base-content/70">Last Modified</label>
									<p className="text-base-content">
										{project.mod_date?.toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric"
										})}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Assays Section - fixed image logic */}
			<div className="card bg-base-200 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-primary">Assays in this Project: {project.Analyses.length}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
						{project.Analyses.map((analysis, index) => {
							const imagePath = `/images/${analysis.assay_name}_icon.png`;

							return (
								<div key={index} className="card bg-base-100 shadow-md">
									<div className="card-body">
										<div className="flex items-center gap-4">
											<div className="w-16 h-16">
												<Image
													src={imagePath}
													alt={analysis.assay_name}
													width={64}
													height={64}
													className="object-contain"
												/>
											</div>
											<div>
												<h3 className="font-medium">{analysis.Assay.target_gene}</h3>
												<p className="text-sm text-base-content">{analysis.assay_name}</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Map Card */}
			<div className="card bg-base-200 shadow-xl">
				<div className="card-body p-0 overflow-hidden">
					<div className="h-[400px]">
						<MapWrapper locations={project.Samples} id="samp_name" title="Sample:" table="sample" />
					</div>
				</div>
			</div>
			<div className="h-[400px]">
				<h2 className="card-title text-primary">Samples:</h2>
				<Table data={project.Samples} title="samp_name"></Table>
			</div>
		</div>
	);
}
