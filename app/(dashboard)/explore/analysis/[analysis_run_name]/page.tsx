import TaxaGrid from "@/app/components/paginated/TaxaGrid";
import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";
import Map from "@/app/components/map/Map";
import Table from "@/app/components/paginated/Table";

export default async function Analysis_Run_name({ params }: { params: Promise<{ analysis_run_name: string }> }) {
	const { analysis_run_name } = await params;

	const analysis = await prisma.analysis.findUnique({
		where: {
			analysis_run_name: analysis_run_name
		},
		include: {
			_count: {
				select: {
					Occurrences: true,
					Assignments: true
				}
			},
			Occurrences: {
				distinct: ["samp_name"],
				select: {
					Sample: {
						select: {
							samp_name: true,
							decimalLatitude: true,
							decimalLongitude: true
						}
					}
				}
			}
		}
	});
	if (!analysis) return <>Analysis not found</>;

	return (
		<div className="mx-80">
			<header className="space-y-4">
				<h1 className="text-4xl font-bold text-primary">{analysis_run_name}</h1>
				{/* <p className="text-xl text-base-content/70">{project.project_name}</p> */}
			</header>
			{/* Stats Cards */}
			<div className="grid grid-cols-2 gap-4 py-10">
				<Link
					href={`/explore/project/${analysis.project_id}`}
					className="stat bg-base-300 rounded-lg p-6 hover:bg-base-300/55 transition-colors"
				>
					<div className="stat-title">Project</div>
					<div className="stat-value text-primary">{analysis.project_id}</div>
				</Link>
				<Link
					href={`/explore/assay/${analysis.assay_name}`}
					className="stat bg-base-300 rounded-lg p-6 hover:bg-base-300/55 transition-colors"
				>
					<div className="stat-title">Assay</div>
					<div className="stat-value text-primary">{analysis.assay_name}</div>
				</Link>

				<Link href={`/`} className="stat bg-base-300 rounded-lg p-6 hover:bg-base-300/55 transition-colors">
					<div className="stat-title">Total Occurrences</div>
					<div className="stat-value text-primary">{analysis._count.Occurrences}</div>
				</Link>

				<Link href={`/`} className="stat bg-base-300 rounded-lg p-6 hover:bg-base-300/55 transition-colors">
					<div className="stat-title">Total Assignments</div>
					<div className="stat-value text-primary">{analysis._count.Assignments}</div>
				</Link>
			</div>
			<div role="tablist" className="tabs tabs-lifted">
				<input type="radio" defaultChecked name="dataTabs" role="tab" className="tab" aria-label="Samples" />
				<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
					<div className="card-body p-0 overflow-hidden h-[400px]">
						<Map
							locations={analysis.Occurrences.map((samp) => ({ ...samp.Sample }))}
							id="samp_name"
							table="sample"
							cluster
						/>
					</div>
				</div>

				<input type="radio" name="dataTabs" role="tab" className="tab" aria-label="Occurrences" />
				<div
					role="tabpanel"
					className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[400px] w-full overflow-hidden"
				>
					{/* <Table table="assignment" title="featureid" where={{ analysis_run_name }}></Table> */}
				</div>

				<input type="radio" name="dataTabs" role="tab" className="tab" aria-label="Assignments" />
				<div
					role="tabpanel"
					className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[400px] w-full overflow-hidden"
				>
					<Table table="assignment" title="featureid" where={{ analysis_run_name }}></Table>
				</div>

				<input type="radio" name="dataTabs" role="tab" className="tab" aria-label="Taxa" />
				<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box">
					<TaxaGrid
						take={25}
						cols={5}
						where={{
							Assignments: {
								some: {
									analysis_run_name
								}
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}
