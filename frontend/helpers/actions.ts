"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

type FormState = {
	message: string;
}

export async function asvUploadAction(prevState: FormState, formData: FormData) {
	try {
		const occurrences = [] as Prisma.OccurrenceCreateManyInput[];
		const features = [] as Prisma.FeatureCreateManyInput[];
		const taxonomies = [] as Prisma.TaxonomyCreateManyInput[];
		const assignments = [] as Prisma.AssignmentCreateManyInput[];
		const samples = [] as Prisma.SampleCreateManyInput[];
		const markers = [] as Prisma.MarkerCreateManyInput[];
		const libraries = [] as Prisma.LibraryCreateManyInput[];

		//ASV file
		const asvLines = (await (formData.get("asvFile") as File).text()).split("\n");
		const asvHeaders = asvLines[0].split("\t");
		for (let i = 1; i < asvLines.length; i++) {
			const obj = {} as any; //some headers are sampleIds and can't be known ahead of time
			const currentline = asvLines[i].split("\t");

			for (let j = 0; j < asvHeaders.length; j++) {
				obj[asvHeaders[j]] = currentline[j];
			}

			if (obj.featureid) {
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
		}

		//Sample file
		const sampleLines = (await (formData.get("samplesFile") as File).text()).split("\n");
		sampleLines.splice(0, 6);
		const sampleHeaders = sampleLines[0].split("\t");
		for (let i = 1; i < sampleLines.length; i++) {
			const obj = {} as any;
			const currentline = sampleLines[i].split("\t");

			for (let j = 0; j < sampleHeaders.length; j++) {
				obj[sampleHeaders[j]] = currentline[j];
			}

			if (obj.samp_name) {
				samples.push({
					samp_name: obj.samp_name,
					decimalLatitude: parseFloat(obj.decimalLatitude),
					decimalLongitude: parseFloat(obj.decimalLongitude),
					studyId: formData.get("projectId") as string,
					markerId: obj.assay_name
				});

				markers.push({
					assay_name: obj.assay_name
				});

				libraries.push({
					library_id: obj.library_id,
					markerId: obj.assay_name
				});
			}
		}

		await prisma.$transaction(async (tx) => {
			//study >> sample > marker* >> library* >> run >> occurrence > feature* >> assignment > taxonomy*
			//sample >> occurrence
			//Identifiers:
			//study = project_id
			//sample = samp_name
			//marker = assay_name
			//library = library_id
			//run = bioinfo_id (I made this one up)
			//feature = seq_id
			//sequence = dna_sequence
			//taxonomy = taxonID

			//study
			await tx.study.create({
				data: {
					project_id: formData.get("projectId") as string
				}
			});

			//markers
			await tx.marker.createMany({
				data: markers,
				skipDuplicates: true
			});

			//samples
			await tx.sample.createMany({
				data: samples
			});

			//libraries
			await tx.library.createMany({
				data: libraries,
				skipDuplicates: true
			});

			//features
			await tx.feature.createMany({
				data: features,
				skipDuplicates: true
			});

			//taxonomies
			await tx.taxonomy.createMany({
				data: taxonomies,
				skipDuplicates: true
			});

			//assignments
			await tx.assignment.createMany({
				data: assignments
			});
		});

		return { message: "Success" }
	} catch (e) {
		const error = e as Error;
		return { message: "Error", error: error.message };
	}
}