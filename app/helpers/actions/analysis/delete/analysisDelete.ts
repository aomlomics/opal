"use server";

import { prisma } from "@/app/helpers/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function analysisDeleteAction(formData: FormData) {
	const { userId } = await auth();
	if (!userId) {
		return { message: "Error", error: "Unauthorized" };
	}

	const del = JSON.parse(formData.get("del") as string);

	await prisma.$transaction(
		async (tx) => {
			//analysis delete
			if (del.analysis_run_name) {
				console.log("analysis delete");
				await tx.analysis.delete({
					where: {
						analysis_run_name: del.analysis_run_name
					}
				});
			}

			//features delete
			console.log("empty features delete");
			await tx.feature.deleteMany({
				where: {
					Assignments: {
						none: {}
					}
				}
			});
			// if (del.dbFeatures) {
			// 	const featureChunks = [] as number[][];
			// 	while (del.dbFeatures.length) {
			// 		featureChunks.push(del.dbFeatures.splice(0, 30000));
			// 	}

			// 	console.log("features delete");
			// 	for (const chunk of featureChunks) {
			// 		await tx.feature.deleteMany({
			// 			where: {
			// 				id: {
			// 					in: chunk
			// 				}
			// 			}
			// 		});
			// 	}
			// }

			//taxonomies delete
			console.log("empty taxonomies delete");
			await tx.taxonomy.deleteMany({
				where: {
					Assignments: {
						none: {}
					}
				}
			});
			// if (del.dbTaxonomies) {
			// 	const taxonomyChunks = [] as number[][];
			// 	while (del.dbTaxonomies.length) {
			// 		taxonomyChunks.push(del.dbTaxonomies.splice(0, 30000));
			// 	}

			// 	//taxonomies
			// 	console.log("taxonomies delete");
			// 	for (const chunk of taxonomyChunks) {
			// 		await tx.taxonomy.deleteMany({
			// 			where: {
			// 				id: {
			// 					in: chunk
			// 				}
			// 			}
			// 		});
			// 	}
			// }
		},
		{ timeout: 1.5 * 60 * 1000 }
	);

	return { message: "Success" };
}
