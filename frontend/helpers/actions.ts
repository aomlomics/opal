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
	AssignmentOptionalDefaultsSchema,
	AssignmentPartial,
	AssignmentScalarFieldEnumSchema,
	AssignmentSchema,
	FeatureScalarFieldEnumSchema,
	FeatureSchema,
	LibraryScalarFieldEnumSchema,
	LibrarySchema,
	OccurrenceOptionalDefaultsSchema,
	OccurrencePartial,
	OccurrenceScalarFieldEnumSchema,
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
	try {
		//Study file
		const studyCol = {} as Record<string, string>;
		const assayCols = {} as Record<string, Record<string, string>>;
		const libraryCols = {} as Record<string, Record<string, string>>;
		const analysisCols = {} as Record<string, Record<string, string>>;
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

					//Analyses
					if (!analysisCols[studyFileHeaders[i]]) {
						analysisCols[studyFileHeaders[i]] = {};
					}
					replaceDead(
						currentLine[i],
						currentLine[field_name_i],
						analysisCols[studyFileHeaders[i]],
						AnalysisSchema,
						AnalysisScalarFieldEnumSchema
					);
				}
			}
		}
		const study = StudySchema.parse(studyCol, {
			errorMap: (error, ctx) => {
				return { message: `StudySchema: ${ctx.defaultError}` };
			}
		});
		const analyses = Object.entries(analysisCols).map(([assay_name, col]) =>
			AnalysisOptionalDefaultsSchema.parse(
				{
					...col,
					...studyCol,
					assay_name
				},
				{
					errorMap: (error, ctx) => {
						return { message: `AnalysisSchema: ${ctx.defaultError}` };
					}
				}
			)
		);

		//Library file
		const assays = [] as Prisma.AssayCreateInput[];
		const libraries = [] as Prisma.LibraryCreateManyInput[];
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
		const samples = [] as Prisma.SampleCreateInput[];
		//parse file
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

		//Feature files
		const features = [] as Prisma.FeatureCreateManyInput[];
		const taxonomies = [] as Prisma.TaxonomyCreateManyInput[];
		let feat16sFileLines;
		let feat18sFileLines;
		if (process.env.NODE_ENV === "development") {
			feat16sFileLines = (await (formData.get("16sFeatFile") as File).text()).split("\n");
			feat18sFileLines = (await (formData.get("18sFeatFile") as File).text()).split("\n");
		} else {
			const analysisFiles = JSON.parse(formData.get("analysisFiles") as string);
			feat16sFileLines = (await (await fetch(analysisFiles["16sFeatFile"].url)).text()).split("\n");
			feat18sFileLines = (await (await fetch(analysisFiles["18sFeatFile"].url)).text()).split("\n");
		}

		return { response: "Success" };

		const featFiles = {
			ssu16sv4v5: {
				lines: feat16sFileLines,
				headers: feat16sFileLines[0].split("\t")
			},
			ssu18sv9: {
				lines: feat18sFileLines,
				headers: feat18sFileLines[0].split("\t")
			}
		};
		const assignmentsObj = {
			ssu16sv4v5: [],
			ssu18sv9: []
		} as Record<string, AssignmentPartial[]>;

		//loop over every feature file
		let featKey: keyof typeof featFiles;
		for (featKey in featFiles) {
			for (let i = 1; i < featFiles[featKey].lines.length; i++) {
				const currentLine = featFiles[featKey].lines[i].split("\t");

				if (currentLine[featFiles[featKey].headers.indexOf("featureid")]) {
					const featureRow = {} as any;
					const assignmentRow = {} as any;
					const taxonomyRow = {} as any;

					for (let j = 0; j < featFiles[featKey].headers.length; j++) {
						//feature table
						replaceDead(
							currentLine[j],
							featFiles[featKey].headers[j],
							featureRow,
							FeatureSchema,
							FeatureScalarFieldEnumSchema
						);

						//assignment table
						replaceDead(
							currentLine[j],
							featFiles[featKey].headers[j],
							assignmentRow,
							AssignmentSchema,
							AssignmentScalarFieldEnumSchema
						);

						//taxonomy table
						replaceDead(
							currentLine[j],
							featFiles[featKey].headers[j],
							taxonomyRow,
							TaxonomySchema,
							TaxonomyScalarFieldEnumSchema
						);
					}

					features.push(
						FeatureSchema.parse(featureRow, {
							errorMap: (error, ctx) => {
								return { message: `FeatureSchema (${featKey}): ${ctx.defaultError}` };
							}
						})
					);

					//assignments can only be parsed after inserting the analyses
					assignmentsObj[featKey].push(assignmentRow);

					taxonomies.push(
						TaxonomySchema.parse(taxonomyRow, {
							errorMap: (error, ctx) => {
								return { message: `TaxonomySchema (${featKey}): ${ctx.defaultError}` };
							}
						})
					);
				}
			}
		}

		//Occurrences files
		let occ16sFileLines;
		let occ18sFileLines;
		if (process.env.NODE_ENV === "development") {
			occ16sFileLines = (await (formData.get("16sOccFile") as File).text()).split("\n");
			occ18sFileLines = (await (formData.get("18sOccFile") as File).text()).split("\n");
		} else {
			const analysisFiles = JSON.parse(formData.get("analysisFiles") as string);
			occ16sFileLines = (await (await fetch(analysisFiles["16sOccFile"].url)).text()).split("\n");
			occ18sFileLines = (await (await fetch(analysisFiles["18sOccFile"].url)).text()).split("\n");
		}
		occ16sFileLines.splice(0, 1); //TODO: parse comments out logically instead of hard-coded
		occ18sFileLines.splice(0, 1); //TODO: parse comments out logically instead of hard-coded
		const occFiles = {
			ssu16sv4v5: {
				lines: occ16sFileLines,
				headers: occ16sFileLines[0].split("\t")
			},
			ssu18sv9: {
				lines: occ18sFileLines,
				headers: occ18sFileLines[0].split("\t")
			}
		};

		await prisma.$transaction(
			async (tx) => {
				//study
				await tx.study.create({
					data: study
				});

				//assays and samples
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

				//analyses and libraries
				const dbAnalyses = [] as Analysis[];
				for (let a of analyses) {
					const analysis = await tx.analysis.create({
						data: {
							...a,
							Libraries: {
								connectOrCreate: libraries.reduce((filtered, lib) => {
									if (libToAssay[lib.library_id] === a.assay_name) {
										filtered.push({
											where: {
												library_id: lib.library_id
											},
											create: lib
										});
									}
									return filtered;
								}, [] as Prisma.LibraryCreateOrConnectWithoutAnalysisInput[])
							}
						}
					});
					dbAnalyses.push(analysis);
				}

				//features
				await tx.feature.createMany({
					data: features,
					skipDuplicates: true
				});

				//occurrences
				const occurrences = [] as Prisma.OccurrenceCreateManyInput[];
				let occKey: keyof typeof occFiles;
				for (occKey in occFiles) {
					for (let i = 1; i < occFiles[occKey].lines.length; i++) {
						const currentLine = occFiles[occKey].lines[i].split("\t");

						if (currentLine[0]) {
							for (let j = 1; j < occFiles[occKey].headers.length; j++) {
								const analysisId = dbAnalyses.find((analysis) => analysis.assay_name === occKey)!.id;
								const samp_name = occFiles[occKey].headers[j];
								const featureid = currentLine[0];
								const organismQuantity = parseInt(currentLine[j]);

								if (organismQuantity) {
									occurrences.push(
										OccurrenceOptionalDefaultsSchema.parse(
											{
												analysisId,
												samp_name,
												featureid,
												organismQuantity
											},
											{
												errorMap: (error, ctx) => {
													return {
														message: `OccurrenceSchema (${occKey}, ${featureid}, ${samp_name}): ${ctx.defaultError}`
													};
												}
											}
										)
									);
								}
							}
						}
					}
				}

				await tx.occurrence.createMany({
					data: occurrences
				});

				//taxonomies
				await tx.taxonomy.createMany({
					data: taxonomies,
					skipDuplicates: true
				});

				//assignments
				const assignments = [] as Prisma.AssignmentCreateManyInput[];
				//associate the assignment to its analysis
				for (let assay_name in assignmentsObj) {
					for (let a of assignmentsObj[assay_name]) {
						//parse the assignment, including the associated analysis
						assignments.push(
							AssignmentOptionalDefaultsSchema.parse(
								{
									...a,
									analysisId: dbAnalyses.find((analysis) => analysis.assay_name === assay_name)!.id //find the analysis associated with the assay
								},
								{
									errorMap: (error, ctx) => {
										return {
											message: `AssignmentSchema (${assay_name}, ${a.featureid}, ${a.Confidence}): ${ctx.defaultError}`
										};
									}
								}
							)
						);
					}
				}

				await tx.assignment.createMany({
					data: assignments
				});
			},
			{ timeout: 60000 }
		);

		return { response: "Success" };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { response: "Error", error: error.message };
	}
}
