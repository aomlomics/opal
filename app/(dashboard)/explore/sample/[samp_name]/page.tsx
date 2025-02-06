import DataDisplay from "@/app/components/DataDisplay";
import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";
import Map from "@/app/components/map/Map";

export default async function Samp_Name({ params }: { params: Promise<{ samp_name: string }> }) {
	const { samp_name } = await params;

	const sample = await prisma.sample.findUnique({
		where: {
			samp_name
		},
		include: {
			Occurrences: {
				select: {
					featureid: true
				}
			}
		}
	});

	if (!sample) return <>Sample not found</>;
	const { Occurrences: _, ...justSample } = sample;

	const featuresCount = {} as Record<string, number>;
	for (const { featureid } of sample.Occurrences) {
		if (featureid in featuresCount) {
			featuresCount[featureid] += 1;
		} else {
			featuresCount[featureid] = 1;
		}
	}
	const sortedFeatures = Object.entries(featuresCount).sort(([, a], [, b]) => b - a);

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-8">
			{/* Breadcrumb navigation */}
			<div className="text-base breadcrumbs mb-6">
				<ul>
					<li>
						<Link href="/explore/project" className="text-primary hover:text-primary-focus">
							Projects
						</Link>
					</li>
					<li>
						<Link href={`/explore/project/${sample.project_id}`} className="text-primary hover:text-primary-focus">
							{sample.project_id}
						</Link>
					</li>
					<li>
						<Link href={`/explore/sample`} className="text-primary hover:text-primary-focus">
							Samples
						</Link>
					</li>
					<li>{samp_name}</li>
				</ul>
			</div>

			<div className="grid grid-cols-2 gap-8">
				<div className="col-span-2">
					<header>
						<h1 className="text-4xl font-semibold text-primary mb-2">{samp_name}</h1>
					</header>
				</div>

				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="stat bg-base-200 p-6">
							<div className="text-lg font-medium text-base-content/70">Total Occurrences</div>
							<div className="text-base mt-1">{sample.Occurrences.length}</div>
						</div>
					</div>
				</div>

				<div className="bg-base-200 p-6 h-full">
					<div className="text-lg font-medium text-base-content/70">Analysis Information</div>
					<div className="h-[300px] overflow-y-auto mt-4">
						<DataDisplay data={justSample} omit={["id", "project_id", "userId", "analysis_run_name", "assay_name"]} />
					</div>
				</div>
			</div>

			<div className="card-body p-0 overflow-hidden h-[400px]">
				<Map locations={[sample]} id="samp_name" table="sample" />
			</div>
		</div>
	);
}
