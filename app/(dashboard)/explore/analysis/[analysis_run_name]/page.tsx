import TaxaGrid from "@/app/components/paginated/TaxaGrid";
import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";
import Map from "@/app/components/map/Map";
import Table from "@/app/components/paginated/Table";
import OccDownloadButton from "@/app/components/OccDownloadButton";
import occDownloadAction from "@/app/helpers/actions/occDownloadAction";
import DataDisplay from "@/app/components/DataDisplay";

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
	const { _count: _, Occurrences: __, ...justAnalysis } = analysis;

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-8">
			<header className="mb-8">
				<h1 className="text-4xl font-semibold text-primary mb-2">{analysis_run_name}</h1>
			</header>

			<div className="grid grid-cols-3 gap-4">
				<Link
					href={`/explore/project/${analysis.project_id}`}
					className="stat bg-base-200 rounded-lg p-6 hover:bg-base-200/80 transition-colors"
				>
					<div className="text-sm font-medium text-base-content/70">Project</div>
					<div className="text-2xl font-medium mt-1">{analysis.project_id}</div>
				</Link>

				<Link
					href={`/explore/assay/${analysis.assay_name}`}
					className="stat bg-base-200 rounded-lg p-6 hover:bg-base-200/80 transition-colors"
				>
					<div className="text-sm font-medium text-base-content/70">Assay</div>
					<div className="text-2xl font-medium mt-1">{analysis.assay_name}</div>
				</Link>

				<div className="bg-base-200 rounded-lg p-6 row-span-2">
					<h2 className="text-lg font-medium text-primary mb-4">Analysis Information</h2>
					<div className="h-[400px]">
						<DataDisplay data={justAnalysis} omit={["id", "project_id", "userId", "analysis_run_name", "assay_name"]} />
					</div>
				</div>

				<Link href={`/`} className="stat bg-base-200 rounded-lg p-6 hover:bg-base-200/80 transition-colors">
					<div className="text-sm font-medium text-base-content/70">Total Occurrences</div>
					<div className="text-2xl font-medium mt-1">{analysis._count.Occurrences}</div>
				</Link>

				<Link href={`/`} className="stat bg-base-200 rounded-lg p-6 hover:bg-base-200/80 transition-colors">
					<div className="text-sm font-medium text-base-content/70">Total Assignments</div>
					<div className="text-2xl font-medium mt-1">{analysis._count.Assignments}</div>
				</Link>
			</div>

			<div className="mb-5">
				<OccDownloadButton
					text="Occurrence Table"
					filename={`${analysis_run_name}_occurrenceTable`}
					where={{ analysis_run_name }}
				/>
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

				{/* <input type="radio" name="dataTabs" role="tab" className="tab" aria-label="Occurrences" />
				<div
					role="tabpanel"
					className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-[400px] w-full overflow-hidden"
				>
					<OccurrenceTable where={{ analysis_run_name }}></OccurrenceTable>
				</div> */}

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
						size="sm"
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
