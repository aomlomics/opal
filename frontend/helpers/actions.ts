"use server"

import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

type FormState = {
	message: string;
}

export async function asvUploadAction(prevState: FormState, formData: FormData) {
	const features = [] as Prisma.FeatureCreateInput[];
	const taxonomies = [] as Prisma.TaxonomyCreateInput[];
	const assignments = [] as Prisma.AssignmentCreateManyInput[];

	const lines = (await (formData.get("asvFile") as File).text()).split("\n");
	const headers = lines[0].split("\t");
	for (let i = 1; i < lines.length; i++) {
		const obj = {} as any; //some headers are sampleIds and can't be known ahead of time
		const currentline = lines[i].split("\t");

		for (let j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j];
		}

		features.push({
			seq_id: obj.featureid,
			sequence: obj.sequence
		});

		taxonomies.push({ stringIdentifier: obj.taxonomy });

		assignments.push({
			confidence: parseFloat(obj.Confidence),
			taxonomyId: obj.taxonomy,
			featureId: obj.featureid
		});
	}

	try {
		await prisma.$transaction(async (tx) => {
			//study >> sample >> marker* >> library* >> run >> occurrence > feature* >> assignment > taxonomy*
			//Identifiers:
			//study = project_id
			//sample = samp_name
			//marker = assay_name
			//library = library_id
			//run = bioinfo_id (I made this one up)
			//feature = seq_id
			//sequence = dna_sequence
			//taxonomy = taxonID

			//features
			await prisma.feature.createMany({
				data: features,
				skipDuplicates: true
			});

			//taxonomies
			await prisma.taxonomy.createMany({
				data: taxonomies,
				skipDuplicates: true
			});

			//assignments
			await prisma.assignment.createMany({
				data: assignments
			});
		});

		return { message: "Success" }
	} catch (error) {
		return { message: "Error", error }
	}
}