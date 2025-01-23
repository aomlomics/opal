import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";
import MapWrapper from "@/app/components/map/Map";
import Image from "next/image";
import Table from "@/app/components/table/Table";
import BarChart from "@/app/components/BarChart";
import { randomColors } from "@/app/helpers/utils";
import LoadingTable from "@/app/components/table/LoadingTable";

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
			},
			Analyses: {
				select: {
					analysis_run_name: true,
					assay_name: true,
					Assay: {
						select: {
							target_gene: true
						}
					},
					Assignments: {
						select: {
							taxonomy: true
						}
					}
				}
			}
		}
	});
	if (!project) return <>Project not found</>;

	const uniqueAssays = project.Analyses.reduce(
		(acc, a) => ({ ...acc, [a.assay_name]: { target_gene: a.Assay.target_gene } }),
		{} as Record<string, Record<string, string>>
	);

	//get a sorted array of taxonomy counts, and a separate object to show which analysis taxonomies came from
	const taxaCount = {} as Record<string, number>;
	const taxaCountByAnalysis = {} as Record<string, Record<string, number>>;
	for (const a of project.Analyses) {
		taxaCountByAnalysis[a.analysis_run_name] = {};
		for (const assign of a.Assignments) {
			if (assign.taxonomy in taxaCount) {
				taxaCount[assign.taxonomy] += 1;
			} else {
				taxaCount[assign.taxonomy] = 1;
			}

			if (assign.taxonomy in taxaCountByAnalysis[a.analysis_run_name]) {
				taxaCountByAnalysis[a.analysis_run_name][assign.taxonomy] += 1;
			} else {
				taxaCountByAnalysis[a.analysis_run_name][assign.taxonomy] = 1;
			}
		}
	}
	const colorsArr = randomColors(Object.keys(taxaCountByAnalysis).length);
	const sortedTaxa = Object.entries(taxaCount).sort(([, a], [, b]) => b - a);

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

					<div className="grid grid-cols-2">
						<div className="stat bg-base-200 rounded-lg p-6">
							<div className="stat-title">Detection Type</div>
							<div className="stat-value text-sm capitalize">{project.detection_type}</div>
							<div className="stat-title">Study Factor</div>
							<div className="stat-value text-sm">{project.study_factor}</div>
						</div>

						<div className="stat bg-base-200 rounded-lg p-6 overflow-hidden">
							<div className="stat-title">Top Taxonomy</div>
							{sortedTaxa.splice(0, 5).map((taxa) => (
								<div key={taxa[0]} className="stat-value text-sm">
									{taxa[0].split(";")[taxa[0].split(";").length - 1]}: {taxa[1]}
								</div>
							))}
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
					<h2 className="card-title text-primary">Assays in this Project: {Object.keys(uniqueAssays).length}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
						{Object.keys(uniqueAssays).map((assay, index) => {
							const imagePath = `/images/${assay}_icon.png`;

							return (
								<div key={index} className="card bg-base-100 shadow-md">
									<div className="card-body">
										<div className="flex items-center gap-4">
											<div className="w-16 h-16">
												<Image src={imagePath} alt={assay} width={64} height={64} className="object-contain" />
											</div>
											<div>
												<h3 className="font-medium">{uniqueAssays[assay].target_gene}</h3>
												<p className="text-sm text-base-content">{assay}</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<h2 className="card-title text-primary">Samples:</h2>
			<div role="tablist" className="tabs tabs-lifted">
				{/* Map */}
				<input type="radio" defaultChecked name="dataTabs" role="tab" className="tab" aria-label="Map" />
				<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
					<div className="card-body p-0 overflow-hidden">
						<div className="h-[400px]">
							<MapWrapper locations={project.Samples} id="samp_name" table="sample" cluster />
						</div>
					</div>
				</div>

				{/* Table */}
				<input type="radio" name="dataTabs" role="tab" className="tab" aria-label="Table" />
				<div
					role="tabpanel"
					className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[400px] w-full overflow-hidden"
				>
					<Table table="sample" title="samp_name" where={{ project_id }}></Table>
					{/* <LoadingTable /> */}
				</div>

				{/* Charts */}
				<input type="radio" name="dataTabs" role="tab" className="tab" aria-label="Charts" />
				<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
					<BarChart
						title="Top 10 Taxonomies"
						labels={sortedTaxa.slice(0, 10).map((taxaArr) => taxaArr[0].split(";")[taxaArr[0].split(";").length - 1])}
						datasets={Object.keys(taxaCountByAnalysis).map((taxa, i) => ({
							label: taxa.split(";")[taxa.split(";").length - 1],
							data: sortedTaxa.slice(0, 10).map((taxaArr) => taxaCountByAnalysis[taxa][taxaArr[0]]),
							backgroundColor: colorsArr[i]
						}))}
					/>
				</div>
			</div>

			<div></div>
		</div>
	);
}
