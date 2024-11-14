"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/app/helpers/prisma";
import { replaceDead } from "@/app/helpers/utils";
import {
	AnalysisScalarFieldEnumSchema,
	AnalysisSchema,
	AssayScalarFieldEnumSchema,
	AssaySchema,
	LibraryScalarFieldEnumSchema,
	LibrarySchema,
	SampleScalarFieldEnumSchema,
	SampleSchema,
	StudyScalarFieldEnumSchema,
	StudySchema
} from "@/prisma/generated/zod";

export default async function studyUploadAction(formData: FormData) {
	console.log("study upload");
	try {
		const assays = {} as Record<string, Prisma.AssayCreateManyInput>;
		const libraries = [] as Prisma.LibraryCreateManyInput[];
		const samples = [] as Prisma.SampleCreateManyInput[];

		const studyCol = {} as Record<string, string>;
		const assayCols = {} as Record<string, Record<string, string>>;
		const libraryCols = {} as Record<string, Record<string, string>>;

		const sampToAssay = {} as Record<string, string>; //object to relate samples to their assay_name values
		const libToAssay = {} as Record<string, string>; //object to relate libraries to their assay_name values

		//Study file
		console.log("study file");
		//code block to force garbage collection
		{
			//parse file
			const studyFileLines = (await (formData.get("studyFile") as File).text()).split("\n");
			const studyFileHeaders = studyFileLines[0].split("\t");
			const field_name_i = studyFileHeaders.indexOf("field_name");
			//iterate over each row
			for (let i = 1; i < studyFileLines.length; i++) {
				const currentLine = studyFileLines[i].split("\t");

				//Study Level
				//study table
				replaceDead(
					currentLine[studyFileHeaders.indexOf("study_level")],
					currentLine[field_name_i],
					studyCol,
					StudySchema,
					StudyScalarFieldEnumSchema
				);
				//assay table
				replaceDead(
					currentLine[studyFileHeaders.indexOf("study_level")],
					currentLine[field_name_i],
					studyCol,
					AssaySchema,
					AssayScalarFieldEnumSchema
				);

				//library table
				replaceDead(
					currentLine[studyFileHeaders.indexOf("study_level")],
					currentLine[field_name_i],
					studyCol,
					LibrarySchema,
					LibraryScalarFieldEnumSchema
				);

				//analysis table
				replaceDead(
					currentLine[studyFileHeaders.indexOf("study_level")],
					currentLine[field_name_i],
					studyCol,
					AnalysisSchema,
					AnalysisScalarFieldEnumSchema
				);

				//Assay Levels
				for (let i = studyFileHeaders.indexOf("study_level") + 1; i < studyFileHeaders.length; i++) {
					//flip table from long to wide
					//constucting objects whose keys are "levels" (ssu16sv4v5, ssu18sv9)
					//and whose values are an object representing a single "row"
					if (currentLine[i]) {
						//Assays
						if (!assayCols[studyFileHeaders[i]]) {
							assayCols[studyFileHeaders[i]] = {};
						}
						replaceDead(
							currentLine[i],
							currentLine[field_name_i],
							assayCols[studyFileHeaders[i]],
							AssaySchema,
							AssayScalarFieldEnumSchema
						);

						//Libraries
						if (!libraryCols[studyFileHeaders[i]]) {
							libraryCols[studyFileHeaders[i]] = {};
						}
						replaceDead(
							currentLine[i],
							currentLine[field_name_i],
							libraryCols[studyFileHeaders[i]],
							LibrarySchema,
							LibraryScalarFieldEnumSchema
						);
					}
				}
			}
		}

		const study = StudySchema.parse(studyCol, {
			errorMap: (error, ctx) => {
				return { message: `StudySchema: ${ctx.defaultError}` };
			}
		}) as Prisma.StudyCreateInput;

		//Library file
		console.log("library file");
		//code block to force garbage collection
		{
			//parse file
			const libraryFileLines = (await (formData.get("libraryFile") as File).text()).split("\n");
			libraryFileLines.splice(0, 6); //TODO: parse comments out logically instead of hard-coded
			const libraryFileHeaders = libraryFileLines[0].split("\t");
			//iterate over each row
			for (let i = 1; i < libraryFileLines.length; i++) {
				const currentLine = libraryFileLines[i].split("\t");

				if (currentLine[libraryFileHeaders.indexOf("samp_name")]) {
					const assayRow = {} as any;
					const libraryRow = {} as any;

					//iterate over each column
					for (let j = 0; j < libraryFileHeaders.length; j++) {
						//assay table
						replaceDead(currentLine[j], libraryFileHeaders[j], assayRow, AssaySchema, AssayScalarFieldEnumSchema);

						//library table
						replaceDead(currentLine[j], libraryFileHeaders[j], libraryRow, LibrarySchema, LibraryScalarFieldEnumSchema);
					}

					sampToAssay[currentLine[libraryFileHeaders.indexOf("samp_name")]] = assayRow.assay_name;
					libToAssay[currentLine[libraryFileHeaders.indexOf("library_id")]] = assayRow.assay_name;

					//if the assay doesn't exist yet, add it to the assays array
					if (!assays[assayRow.assay_name]) {
						assays[assayRow.assay_name] = AssaySchema.parse(
							{
								//least specific overrides most specific
								...assayRow,
								...assayCols[assayRow.assay_name],
								...studyCol
							},
							{
								errorMap: (error, ctx) => {
									return { message: `AssaySchema: ${ctx.defaultError}` };
								}
							}
						);
					}

					libraries.push(
						LibrarySchema.parse(
							{
								//least specific overrides most specific
								...libraryRow,
								...libraryCols[assayRow.assay_name], //TODO: 10 fields are replicated for every library, inefficient database usage
								...studyCol
							},
							{
								errorMap: (error, ctx) => {
									return { message: `LibrarySchema: ${ctx.defaultError}` };
								}
							}
						)
					);
				}
			}
		}

		//Sample file
		console.log("sample file");
		//code block to force garbage collection
		{
			const sampleFileLines = (await (formData.get("samplesFile") as File).text()).split("\n");
			sampleFileLines.splice(0, 6); //TODO: parse comments out logically instead of hard-coded
			const sampleFileHeaders = sampleFileLines[0].split("\t");
			//iterate over each row
			for (let i = 1; i < sampleFileLines.length; i++) {
				const currentLine = sampleFileLines[i].split("\t");
				if (currentLine[sampleFileHeaders.indexOf("samp_name")]) {
					const sampleRow = {} as any;

					for (let j = 0; j < sampleFileHeaders.length; j++) {
						//assay table
						replaceDead(currentLine[j], sampleFileHeaders[j], sampleRow, SampleSchema, SampleScalarFieldEnumSchema);
					}

					samples.push(
						//@ts-ignore Zod enum mapping issue
						SampleSchema.parse(
							{
								//construct from least specific to most specific
								...sampleRow,
								project_id: studyCol.project_id,
								assay_name: sampToAssay[sampleRow.samp_name]
							},
							{
								errorMap: (error, ctx) => {
									return { message: `SampleSchema: ${ctx.defaultError}` };
								}
							}
						)
					);

					//TODO: add rel_cont_id to assays
				}
			}
		}

		//parse files for each analysis
		//for (const { assay_name } of analyses) {
		//assignmentsObj[assay_name] = [];
		//occurrencesObj[assay_name] = [];
		//}

		console.log("study transaction");
		await prisma.$transaction(
			async (tx) => {
				//study
				console.log("study");
				await tx.study.create({
					data: study
				});

				//assays and samples
				console.log("assays and samples");
				for (let a of Object.values(assays)) {
					const reducedSamples = samples.reduce((filtered, samp) => {
						if (sampToAssay[samp.samp_name] === a.assay_name) {
							filtered.push({
								where: {
									samp_name: samp.samp_name
								},
								create: samp
							});
						}
						return filtered;
					}, [] as Prisma.SampleCreateOrConnectWithoutAssaysInput[]);

					await tx.assay.upsert({
						where: {
							assay_name: a.assay_name
						},
						update: {
							Samples: {
								connectOrCreate: reducedSamples
							}
						},
						create: {
							...a,
							Samples: {
								connectOrCreate: reducedSamples
							}
						}
					});
				}

				//libraries
				await tx.library.createMany({
					data: libraries,
					skipDuplicates: true
				});
			},
			{ timeout: 0.5 * 60 * 1000 } //30 seconds
		);

		return { response: "Success" };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { response: "Error", error: error.message };
	}
}
