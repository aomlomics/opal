import PhyloPic from "@/app/components/PhyloPic";
import { prisma } from "@/app/helpers/prisma";
import Image from "next/image";

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

	// const samples = await prisma.sample.findMany({
	// 	where: {
	// 		Occurrences: {
	// 			every: {
	// 				Feature: {
	// 					is: {
	// 						Assignments: {
	// 							every: {
	// 								taxonomy
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	},
	// 	select: {
	// 		samp_name: true,
	// 		decimalLatitude: true,
	// 		decimalLongitude: true
	// 	}
	// });
	if (!dbTaxonomy || !samples.length) return <>Taxonomy not found</>;

	return (
		<div>
			<h2>{taxonomy}</h2>
			<PhyloPic taxonomy={dbTaxonomy} />
		</div>
	);
}
