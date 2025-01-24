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

	//check for the most specific rank of the taxonomy
	let mostSpecificRank = "" as keyof typeof dbTaxonomy;
	if (dbTaxonomy.species) {
		mostSpecificRank = "species";
	} else if (dbTaxonomy.genus) {
		mostSpecificRank = "genus";
	} else if (dbTaxonomy.family) {
		mostSpecificRank = "family";
	} else if (dbTaxonomy.order) {
		mostSpecificRank = "order";
	} else if (dbTaxonomy.taxonClass) {
		mostSpecificRank = "taxonClass";
	} else if (dbTaxonomy.phylum) {
		mostSpecificRank = "phylum";
	} else if (dbTaxonomy.kingdom) {
		mostSpecificRank = "kingdom";
	} else {
		return <>An error occurred</>;
	}

	//retrieve suggested taxonomies from GBIF
	const gbifTaxaRes = await fetch(
		`https://api.gbif.org/v1/species/suggest?q=${(dbTaxonomy[mostSpecificRank] as string).split("_")[0]}`
	);
	const gbifTaxa = await gbifTaxaRes.json();
	//get only the taxonomies that match the specific rank
	//TODO: check GBIF API docs to do this step in the previous fetch
	const gbifTaxonomy = gbifTaxa.filter((taxa: Record<string, any>) => taxa.rank.toLowerCase() === mostSpecificRank)[0];

	//use result of GBIF API to query PhyloPics for the vector image
	const phyloPicRes = await fetch(
		`https://api.phylopic.org/resolve/gbif.org/species?build=470&embed_primaryImage=true&objectIDs=${gbifTaxonomy.speciesKey},${gbifTaxonomy.genusKey},${gbifTaxonomy.familyKey},${gbifTaxonomy.orderKey},${gbifTaxonomy.classKey},${gbifTaxonomy.phylumKey},${gbifTaxonomy.kingdomKey}`
	);
	const phyloPic = await phyloPicRes.json();
	const imageUrl = phyloPic._embedded.primaryImage._links.vectorFile.href;

	return (
		<div>
			<h2>{taxonomy}</h2>
			<Image src={imageUrl} alt="Image of taxonomy" fill />
		</div>
	);
}
