"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { AssignmentSchema, FeatureSchema, LibrarySchema, AssaySchema, SampleSchema, TaxonomySchema, StudySchema } from "@/prisma/generated/zod";

type FormState = {
	message: string;
};

export async function asvUploadAction(prevState: FormState, formData: FormData) {
	try {
		//Study file
		const studyObj = {} as Record<string, string>; //used to store the "study_level" column
		const analysesObj = {} as Record<string, Record<string, string>>; //used to store the columns after "study_level"
		//parse file
		const studyLines =  (await (formData.get("studyFile") as File).text()).split("\n");
		const studyHeaders = studyLines[0].split("\t");
		const field_name_i = studyHeaders.indexOf("field_name");
		//iterate over each row
		for (let i = 1; i < studyLines.length; i++) {
			const currentline = studyLines[i].split("\t");

			//Study
			studyObj[field_name_i] = currentline[studyHeaders.indexOf("study_level")];

			//Analyses
			for (let i=field_name_i+2; i < studyHeaders.length+1; i++) {
				//constucting object whose keys are "levels" (ssu16sv4v5, ssu18sv9)
				//and whose values are an object representing a single "row"
				if (currentline[i] && currentline[i] != "not applicable") {
					if (analysesObj[studyHeaders[i]]) {
						analysesObj[studyHeaders[i]][currentline[field_name_i]] = currentline[i];
					} else {
						analysesObj[studyHeaders[i]] = {
							[currentline[field_name_i]]: currentline[i]
						};
					}
				}
			}
		}
		//@ts-ignore Prisma enum mapping issue
		const study = StudySchema.parse(studyObj, {
			errorMap: (error, ctx) => {
				return { message: `StudySchema: ${ctx.defaultError}` };
			}
		});

		//Library file
		const assays = [] as Prisma.AssayCreateManyInput[];
		const libraries = [] as Prisma.LibraryCreateManyInput[];
		const analyses = [] as Prisma.AnalysisCreateManyInput[];
		const sampToAssay = {} as Record<string, string>; //samp_name: assay_name
		//parse file
		const libraryLines = (await (formData.get("libraryFile") as File).text()).split("\n");
		libraryLines.splice(0, 6); //TODO: parse comments out logically instead of hard-coded
		const libraryHeaders = libraryLines[0].split("\t");
		//iterate over each row
		for (let i = 1; i < libraryLines.length; i++) {
			const row = {} as any;
			const currentline = libraryLines[i].split("\t");

			for (let j = 0; j < libraryHeaders.length; j++) {
				if (currentline[j]) {
					row[libraryHeaders[j]] = currentline[j];
				}
			}

			if (row.samp_name) {
				sampToAssay[row.samp_name] = row.assay_name;

				//@ts-ignore Prisma enum mapping issue
				assays.push(AssaySchema.parse({ //construct from least specific to most specific
					...studyObj,
					...analyses[row.assay_name],
					...row
				}, {
					errorMap: (error, ctx) => {
						return { message: `AssaySchema: ${ctx.defaultError}` };
					}
				}));

				//@ts-ignore Prisma enum mapping issue
				libraries.push(LibrarySchema.parse({ //construct from least specific to most specific
					...studyObj,
					...analyses[row.assay_name], //TODO: 10 fields are replicated for every library, inefficient database usage
					...row
				}, {
					errorMap: (error, ctx) => {
						return { message: `LibrarySchema: ${ctx.defaultError}` };
					}
				}));
			}
		}

		//Sample file
		const samples = [] as Prisma.SampleCreateManyInput[];
		//parse file
		const sampleLines = (await (formData.get("samplesFile") as File).text()).split("\n");
		sampleLines.splice(0, 6); //TODO: parse comments out logically instead of hard-coded
		const sampleHeaders = sampleLines[0].split("\t");
		//iterate over each row
		for (let i = 1; i < sampleLines.length; i++) {
			const row = {} as any;
			const currentline = sampleLines[i].split("\t");

			for (let j = 0; j < sampleHeaders.length; j++) {
				if (currentline[j]) {
					if (currentline[j] != "not applicable" || currentline[j] != "not provided") { //check for "dead" values and replace them with the universal (database) "dead" value
						row[sampleHeaders[j]] = 0;
					} else {
						row[sampleHeaders[j]] = currentline[j];
					}
				}
			}

			if (row.samp_name) {
				//@ts-ignore Prisma enum mapping issue
				samples.push(SampleSchema.parse({ //construct from least specific to most specific
					...row,
					project_id: studyObj.project_id,
					assay_name: sampToAssay[row.samp_name]
				}, {
					errorMap: (error, ctx) => {
						return { message: `SampleSchema: ${ctx.defaultError}` };
					}
				}));

				//TODO: add rel_cont_id to assays
			}
		}

		//ASV and OTU files
		const occurrences = [] as Prisma.OccurrenceCreateManyInput[];
		const features = [] as Prisma.FeatureCreateManyInput[];
		const assignments = [] as Prisma.AssignmentCreateManyInput[];
		const taxonomies = [] as Prisma.TaxonomyCreateManyInput[];
		//const asvLines = (await (formData.get("16sAsvFile") as File).text()).split("\n");
		//const asvHeaders = asvLines[0].split("\t");
		//for (let i = 1; i < asvLines.length; i++) {
		//	const obj = {} as any; //some headers are sampleIds and can't be known ahead of time
		//	const currentline = asvLines[i].split("\t");

		//	for (let j = 0; j < asvHeaders.length; j++) {
		//		if (currentline[j]) {
		//			obj[sampleHeaders[j]] = currentline[j];
		//		}
		//	}

		//	if (obj.featureid) {
		//		features.push(FeatureSchema.parse(obj, {
		//			errorMap: (error, ctx) => {
		//				return { message: `FeatureSchema: ${ctx.defaultError}` };
		//			}
		//		}));

		//		taxonomies.push(TaxonomySchema.parse(obj, {
		//			errorMap: (error, ctx) => {
		//				return { message: `TaxonomySchema: ${ctx.defaultError}` };
		//			}
		//		}));

		//		assignments.push(AssignmentSchema.parse(obj, {
		//			errorMap: (error, ctx) => {
		//				return { message: `AssignmentSchema: ${ctx.defaultError}` };
		//			}
		//		}));
		//	}
		//}

		return { message: "Success" };

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
				data: study
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