"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { AssignmentSchema, FeatureSchema, LibrarySchema, AssaySchema, SampleSchema, TaxonomySchema } from "@/prisma/generated/zod";

type FormState = {
	message: string;
};

export async function asvUploadAction(prevState: FormState, formData: FormData) {
	try {
		const study = {} as Prisma.StudyCreateInput;
		const samples = [] as Prisma.SampleCreateManyInput[];
		const assays = [] as Prisma.AssayCreateManyInput[];
		const libraries = [] as Prisma.LibraryCreateManyInput[];
		const analyses = [] as Prisma.AnalysisCreateManyInput[];
		const occurrences = [] as Prisma.OccurrenceCreateManyInput[];
		const features = [] as Prisma.FeatureCreateManyInput[];
		const assignments = [] as Prisma.AssignmentCreateManyInput[];
		const taxonomies = [] as Prisma.TaxonomyCreateManyInput[];

		//Study file
		const studyLines =  (await (formData.get("studyFile") as File).text()).split("\n");

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
				samples.push(SampleSchema.parse({
					...obj,
					project_id: formData.get("projectId") as string
				}, {
					errorMap: (error, ctx) => {
						return { message: `SampleSchema: ${ctx.defaultError}` };
					}
				}));

				assays.push(AssaySchema.parse(obj, {
					errorMap: (error, ctx) => {
						return { message: `MarkerSchema: ${ctx.defaultError}` };
					}
				}));

				libraries.push(LibrarySchema.parse(obj, {
					errorMap: (error, ctx) => {
						return { message: `LibrarySchema: ${ctx.defaultError}` };
					}
				}));
			}
		}

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
				features.push(FeatureSchema.parse(obj, {
					errorMap: (error, ctx) => {
						return { message: `FeatureSchema: ${ctx.defaultError}` };
					}
				}));

				taxonomies.push(TaxonomySchema.parse(obj, {
					errorMap: (error, ctx) => {
						return { message: `TaxonomySchema: ${ctx.defaultError}` };
					}
				}));

				assignments.push(AssignmentSchema.parse(obj, {
					errorMap: (error, ctx) => {
						return { message: `AssignmentSchema: ${ctx.defaultError}` };
					}
				}));
			}
		}

		await prisma.$transaction(async (tx) => {
			//study >> sample > assay* >> library* >> run >> occurrence > feature* >> assignment > taxonomy*
			//sample >> occurrence
			//run >> assignment
			//Identifiers:
			//study = project_id
			//sample = samp_name
			//assay = assay_name
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

			//assays
			await tx.assay.createMany({
				data: assays,
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

		return { message: "Success" };
	} catch (e) {
		const error = e as Error;
		console.log(error.message);
		return { message: "Error", error: error.message };
	}
}