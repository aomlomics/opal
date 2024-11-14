"use server";

import { Analysis, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { ZodBoolean, ZodEnum, ZodNumber, ZodObject } from "zod";
import { DeadValue } from "@/types/enums";
import {
	AnalysisOptionalDefaultsSchema,
	AnalysisScalarFieldEnumSchema,
	AnalysisSchema,
	AssayScalarFieldEnumSchema,
	AssaySchema,
	AssignmentScalarFieldEnumSchema,
	AssignmentSchema,
	FeatureScalarFieldEnumSchema,
	FeatureSchema,
	LibraryScalarFieldEnumSchema,
	LibrarySchema,
	ObservationSchema,
	OccurrenceSchema,
	SampleScalarFieldEnumSchema,
	SampleSchema,
	StudyScalarFieldEnumSchema,
	StudySchema,
	TaxonomyScalarFieldEnumSchema,
	TaxonomySchema
} from "@/prisma/generated/zod";

//this function is barebones, basic, and probably dangerous in some way
function checkZodType(field: any, type: any) {
	//constantly call unwrap(), as the zod types are nested inside each other
	//if the call fails, then we know it reached the lowest level type
	try {
		if (field instanceof type) {
			return true;
		} else {
			return checkZodType(field.unwrap(), type);
		}
	} catch {
		return false;
	}
}

//replace DeadValues in number fields with enum values
function replaceDead(
	field: string,
	fieldName: string,
	obj: Record<string, string | number>,
	schema: ZodObject<any>,
	fieldOptionsEnum: ZodEnum<any>
) {
	if (field) {
		//check if the field name is in the Schema
		if (fieldOptionsEnum.options.includes(fieldName)) {
			//check if the field has a dead value
			if (field in DeadValue) {
				//check if the field name is a number
				if (checkZodType(schema.shape[fieldName], ZodNumber)) {
					//replace the value with the deadvalue equivalent
					obj[fieldName] = DeadValue[field as unknown as DeadValue];
				} else if (checkZodType(schema.shape[fieldName], ZodBoolean)) {
					obj[fieldName] = 0; //TODO: make the boolean value properly represent the dead value
				} else {
					//continue as normal
					obj[fieldName] = field;
				}
			} else {
				//continue as normal
				obj[fieldName] = field;
			}
		}
	}
}

export async function studyUploadAction(formData: FormData) {
	console.log("study upload");
	try {
		let study = {} as Prisma.StudyCreateInput;
		const assays = [] as Prisma.AssayCreateManyInput[];
		const libraries = [] as Prisma.LibraryCreateManyInput[];
		const samples = [] as Prisma.SampleCreateManyInput[];

		//Study file
		console.log("study file");
		const studyCol = {} as Record<string, string>;
		const assayCols = {} as Record<string, Record<string, string>>;
		const libraryCols = {} as Record<string, Record<string, string>>;
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
				//constucting object whose keys are "levels" (ssu16sv4v5, ssu18sv9)
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
		study = StudySchema.parse(studyCol, {
			errorMap: (error, ctx) => {
				return { message: `StudySchema: ${ctx.defaultError}` };
			}
		});

		//Library file
		console.log("library file");
		const sampToAssay = {} as Record<string, string>; //object to relate samples to their assay_name values
		const libToAssay = {} as Record<string, string>; //object to relate libraries to their assay_name values
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

				for (let j = 0; j < libraryFileHeaders.length; j++) {
					//assay table
					replaceDead(currentLine[j], libraryFileHeaders[j], assayRow, AssaySchema, AssayScalarFieldEnumSchema);

					//library table
					replaceDead(currentLine[j], libraryFileHeaders[j], libraryRow, LibrarySchema, LibraryScalarFieldEnumSchema);
				}

				sampToAssay[currentLine[libraryFileHeaders.indexOf("samp_name")]] = assayRow.assay_name;
				libToAssay[currentLine[libraryFileHeaders.indexOf("library_id")]] = assayRow.assay_name;

				if (!assays.some((a) => a.assay_name === assayRow.assay_name)) {
					assays.push(
						AssaySchema.parse(
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
						)
					);
				}

				if (!libraries.some((lib) => lib.library_id === libraryRow.library_id)) {
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
				for (let a of assays) {
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
			{ timeout: 1 * 60 * 1000 } //1 minute
		);

		return { response: "Success" };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { response: "Error", error: error.message };
	}
}

export async function analysisUploadAction(formData: FormData) {
	try {
		let assay_name = formData.get("assay_name") as string;
		console.log(`${assay_name} analysis upload`);

		//Study file
		console.log("study file");
		let analysis = {} as Prisma.AnalysisCreateManyInput;
		const studyCol = {} as Record<string, string>;
		const analysisCol = {} as Record<string, string>;

		//parse file
		const studyFileLines = (await (formData.get("studyFile") as File).text()).split("\n");
		const studyFileHeaders = studyFileLines[0].split("\t");
		const field_name_i = studyFileHeaders.indexOf("field_name");

		//iterate over each row
		for (let i = 1; i < studyFileLines.length; i++) {
			const currentLine = studyFileLines[i].split("\t");

			//Study Level
			//analysis table
			replaceDead(
				currentLine[studyFileHeaders.indexOf("study_level")],
				currentLine[field_name_i],
				studyCol,
				AnalysisSchema,
				AnalysisScalarFieldEnumSchema
			);

			//Assay Levels
			const analysis_i = studyFileHeaders.indexOf(assay_name);
			if (currentLine[analysis_i]) {
				//Analyses
				replaceDead(
					currentLine[i],
					currentLine[field_name_i],
					analysisCol,
					AnalysisSchema,
					AnalysisScalarFieldEnumSchema
				);
			}
		}

		//Library file
		console.log("library file");
		const analysisLibs = [] as Prisma.LibraryWhereUniqueInput[];
		//parse file
		const libraryFileLines = (await (formData.get("libraryFile") as File).text()).split("\n");
		libraryFileLines.splice(0, 6); //TODO: parse comments out logically instead of hard-coded
		const libraryFileHeaders = libraryFileLines[0].split("\t");
		const assay_name_i = libraryFileHeaders.indexOf("assay_name");
		const library_id_i = libraryFileHeaders.indexOf("library_id");
		//iterate over each row
		for (let i = 1; i < libraryFileLines.length; i++) {
			const currentLine = libraryFileLines[i].split("\t");

			if (currentLine[libraryFileHeaders.indexOf("samp_name")]) {
				if (currentLine[assay_name_i] === assay_name) {
					analysisLibs.push({ library_id: currentLine[library_id_i] });
				}
			}
		}

		analysis = AnalysisOptionalDefaultsSchema.parse(
			{
				...analysisCol,
				...studyCol,
				assay_name
			},
			{
				errorMap: (error, ctx) => {
					return { message: `AnalysisSchema: ${ctx.defaultError}` };
				}
			}
		);

		const features = [] as Prisma.FeatureCreateManyInput[];
		const taxonomies = [] as Prisma.TaxonomyCreateManyInput[];
		const assignments = [] as Prisma.AssignmentCreateManyInput[];
		const observations = [] as Prisma.ObservationCreateManyInput[];
		const occurrences = [] as Prisma.OccurrenceCreateManyAnalysisInput[];

		//Feature file
		console.log(`${assay_name}_feat file`);
		let featFileLines;
		if (process.env.NODE_ENV === "development") {
			//get files from form data
			const file = formData.get(`${assay_name}_feat`) as File;
			const fileText = await file.text();
			featFileLines = fileText.split("\n");
		} else {
			//fetch from blob storage
			const url = JSON.parse(formData.get(`${assay_name}_feat`) as string).url;
			const file = await fetch(url);
			const fileText = await file.text();
			featFileLines = fileText.split("\n");
		}
		const featFileHeaders = featFileLines[0].split("\t");

		//parse feature file
		for (let i = 1; i < featFileLines.length; i++) {
			const currentLine = featFileLines[i].split("\t");

			if (currentLine[featFileHeaders.indexOf("featureid")]) {
				const featureRow = {} as any;
				const assignmentRow = {} as any;
				const taxonomyRow = {} as any;

				for (let j = 0; j < featFileHeaders.length; j++) {
					//feature table
					replaceDead(currentLine[j], featFileHeaders[j], featureRow, FeatureSchema, FeatureScalarFieldEnumSchema);

					//assignment table
					replaceDead(
						currentLine[j],
						featFileHeaders[j],
						assignmentRow,
						AssignmentSchema,
						AssignmentScalarFieldEnumSchema
					);

					//taxonomy table
					replaceDead(currentLine[j], featFileHeaders[j], taxonomyRow, TaxonomySchema, TaxonomyScalarFieldEnumSchema);
				}

				features.push(
					FeatureSchema.parse(featureRow, {
						errorMap: (error, ctx) => {
							return { message: `FeatureSchema (${assay_name}): ${ctx.defaultError}` };
						}
					})
				);

				//assignments can only be parsed after inserting the analyses
				assignments.push(assignmentRow);

				taxonomies.push(
					TaxonomySchema.parse(taxonomyRow, {
						errorMap: (error, ctx) => {
							return { message: `TaxonomySchema (${assay_name}): ${ctx.defaultError}` };
						}
					})
				);
			}
		}

		//Occurrence file
		console.log(`${assay_name}_occ file`);
		let occFileLines;
		if (process.env.NODE_ENV === "development") {
			//get files from form data
			const file = formData.get(`${assay_name}_occ`) as File;
			const fileText = await file.text();
			occFileLines = fileText.split("\n");
		} else {
			//fetch from blob storage
			const url = JSON.parse(formData.get(`${assay_name}_occ`) as string).url;
			const file = await fetch(url);
			const fileText = await file.text();
			occFileLines = fileText.split("\n");
		}
		occFileLines.splice(0, 1); //TODO: parse comments out logically instead of hard-coded
		const occFileHeaders = occFileLines[0].split("\t");

		//parse occurrences file
		for (let i = 1; i < occFileLines.length; i++) {
			const currentLine = occFileLines[i].split("\t");

			if (currentLine[0]) {
				for (let j = 1; j < occFileHeaders.length; j++) {
					//const analysisId = id;
					const samp_name = occFileHeaders[j];
					const featureid = currentLine[0];
					const organismQuantity = parseInt(currentLine[j]);

					if (organismQuantity) {
						//observation table
						observations.push(
							ObservationSchema.parse(
								{
									samp_name,
									featureid
								},
								{
									errorMap: (error, ctx) => {
										return { message: `ObservationSchema: ${ctx.defaultError}` };
									}
								}
							)
						);

						//occurrence table
						occurrences.push({
							samp_name,
							featureid,
							organismQuantity
						});
					}
				}
			}
		}

		console.log(`${assay_name} transaction`);
		await prisma.$transaction(
			async (tx) => {
				//analysis
				console.log("analysis");
				const dbAnalysis = await tx.analysis.create({
					data: {
						...analysis,
						Libraries: {
							connect: analysisLibs
						}
					}
				});

				//features
				console.log("features");
				await tx.feature.createMany({
					data: features,
					skipDuplicates: true
				});

				//observations
				console.log("observations");
				await tx.observation.createMany({
					data: observations,
					skipDuplicates: true
				});

				//occurrences
				console.log("occurrences");
				let i = 0;
				await tx.occurrence.createMany({
					data: occurrences.map((occ) => {
						if (i % 100000 === 0) console.log(occ);
						i++;
						return OccurrenceSchema.parse(
							{
								...occ,
								analysisId: dbAnalysis.id
							},
							{
								errorMap: (error, ctx) => {
									return {
										message: `OccurrenceSchema (${assay_name}, ${occ.samp_name}, ${occ.featureid}): ${ctx.defaultError}`
									};
								}
							}
						);
					})
				});

				//taxonomies
				console.log("taxonomies");
				await tx.taxonomy.createMany({
					data: taxonomies,
					skipDuplicates: true
				});

				//assignments
				console.log("assignments");
				await tx.assignment.createMany({
					data: assignments.map((a) =>
						AssignmentSchema.parse(
							{
								...a,
								analysisId: dbAnalysis.id
							},
							{
								errorMap: (error, ctx) => {
									return {
										message: `AssignmentSchema (${assay_name}, ${a.featureid}, ${a.Confidence}): ${ctx.defaultError}`
									};
								}
							}
						)
					)
				});
			},
			{ timeout: 2 * 60 * 1000 } //2 minutes
		);

		return { response: "Success" };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { response: "Error", error: error.message };
	}
}
