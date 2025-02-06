import { prisma } from "@/app/helpers/prisma";
import PhyloPic from "@/app/components/PhyloPic";
import Map from "@/app/components/map/Map";

export default async function Taxonomy({ params }: { params: Promise<{ taxonomy: string }> }) {
	let { taxonomy } = await params;
	taxonomy = decodeURIComponent(taxonomy);

	const { dbTaxonomy, samples } = await prisma.$transaction(async (tx) => {
		const dbTaxonomy = await tx.taxonomy.findUnique({
			where: {
				taxonomy
			}
		});
		const occurrences = await tx.occurrence.findMany({
			where: {
				Feature: {
					is: {
						Assignments: {
							every: {
								taxonomy
							}
						}
					}
				}
			},
			distinct: ["samp_name"],
			select: {
				samp_name: true
			}
		});

		const samples = await tx.sample.findMany({
			where: {
				samp_name: {
					in: occurrences.map((occ) => occ.samp_name)
				}
			},
			select: {
				samp_name: true,
				decimalLatitude: true,
				decimalLongitude: true
			}
		});

		return { dbTaxonomy, samples };
	});
	if (!dbTaxonomy || !samples.length) return <>Taxonomy not found</>;

	return (
		<div>
			<h2>{taxonomy}</h2>
			<div className="grid grid-cols-2">
				<PhyloPic taxonomy={dbTaxonomy} />
				<div className="card-body p-0 overflow-hidden h-[400px]">
					<Map locations={samples} id="samp_name" table="sample" cluster />
				</div>
			</div>
		</div>
	);
}
