"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/app/helpers/prisma";
import { replaceDead } from "@/app/helpers/utils";
import {
	AnalysisOptionalDefaultsSchema,
	AnalysisScalarFieldEnumSchema,
	AssignmentOptionalDefaultsSchema,
	AssignmentPartial,
	AssignmentScalarFieldEnumSchema,
	FeatureOptionalDefaultsSchema,
	FeaturePartial,
	FeatureScalarFieldEnumSchema,
	ObservationOptionalDefaultsSchema,
	OccurrenceOptionalDefaultsSchema,
	OccurrencePartial,
	TaxonomyOptionalDefaultsSchema,
	TaxonomyPartial,
	TaxonomyScalarFieldEnumSchema
} from "@/prisma/generated/zod";

export default async function analysisSubmitAction(formData: FormData) {
	try {
		let assay_name = formData.get("assay_name") as string;
		console.log(`${assay_name} analysis submit`);

		const studyCol = {} as Record<string, string>;
		const analysisCol = {} as Record<string, string>;

		const analysisLibs = [] as Prisma.LibraryWhereUniqueInput[];

		const featToTaxa = {} as Record<string, string>;

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
				//analysis table
				replaceDead(
					currentLine[studyFileHeaders.indexOf("study_level")],
					currentLine[field_name_i],
					studyCol,
					AnalysisOptionalDefaultsSchema,
					AnalysisScalarFieldEnumSchema
				);

				//Assay Levels
				const analysis_i = studyFileHeaders.indexOf(assay_name);
				//flip table from long to wide
				//constructing "row" object
				if (currentLine[analysis_i]) {
					//Analyses
					replaceDead(
						currentLine[i],
						currentLine[field_name_i],
						analysisCol,
						AnalysisOptionalDefaultsSchema,
						AnalysisScalarFieldEnumSchema
					);
				}
			}
		}

		//Library file
		console.log("library file");
		//code block to force garbage collection
		{
			//parse file
			const libraryFileLines = (await (formData.get("libraryFile") as File).text()).split("\n");
			libraryFileLines.splice(0, 6); //TODO: parse comments out logically instead of hard-coded
			const libraryFileHeaders = libraryFileLines[0].split("\t");
			const assay_name_i = libraryFileHeaders.indexOf("assay_name");
			const library_id_i = libraryFileHeaders.indexOf("library_id");
			//iterate over each row
			for (let i = 1; i < libraryFileLines.length; i++) {
				const currentLine = libraryFileLines[i].split("\t");

				//grab the library_ids for this assay_name
				if (currentLine[libraryFileHeaders.indexOf("samp_name")]) {
					if (currentLine[assay_name_i] === assay_name) {
						analysisLibs.push({ library_id: currentLine[library_id_i] });
					}
				}
			}
		}

		const analysis = AnalysisOptionalDefaultsSchema.parse(
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
		) as Prisma.AnalysisCreateManyInput;

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

				//Feature file
				//parsing file inside transaction to reduce memory usage, since this file is large
				console.log(`${assay_name}_feat file`);
				//code block to force garbage collection
				{
					const features = [] as Prisma.FeatureCreateManyInput[];
					const taxonomies = [] as Prisma.TaxonomyCreateManyInput[];
					const assignments = [] as AssignmentPartial[];

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

					//iterate over each row
					for (let i = 1; i < featFileLines.length; i++) {
						const currentLine = featFileLines[i].split("\t");

						if (currentLine[featFileHeaders.indexOf("featureid")]) {
							const featureRow = {} as FeaturePartial;
							const assignmentRow = {} as AssignmentPartial;
							const taxonomyRow = {} as TaxonomyPartial;

							//iterate over each column
							for (let j = 0; j < featFileHeaders.length; j++) {
								//feature table
								replaceDead(
									currentLine[j],
									featFileHeaders[j],
									featureRow,
									FeatureOptionalDefaultsSchema,
									FeatureScalarFieldEnumSchema
								);

								//assignment table
								replaceDead(
									currentLine[j],
									featFileHeaders[j],
									assignmentRow,
									AssignmentOptionalDefaultsSchema,
									AssignmentScalarFieldEnumSchema
								);

								//taxonomy table
								replaceDead(
									currentLine[j],
									featFileHeaders[j],
									taxonomyRow,
									TaxonomyOptionalDefaultsSchema,
									TaxonomyScalarFieldEnumSchema
								);
							}

							features.push(
								FeatureOptionalDefaultsSchema.parse(featureRow, {
									errorMap: (error, ctx) => {
										return { message: `FeatureSchema (${assay_name}): ${ctx.defaultError}` };
									}
								})
							);

							featToTaxa[assignmentRow.featureid!] = assignmentRow.taxonomy!;

							//assignments can only be parsed after inserting the analyses
							assignments.push(assignmentRow);

							taxonomies.push(
								TaxonomyOptionalDefaultsSchema.parse(taxonomyRow, {
									errorMap: (error, ctx) => {
										return { message: `TaxonomySchema (${assay_name}): ${ctx.defaultError}` };
									}
								})
							);
						}
					}

					//upload to database
					//features
					console.log("features");
					await tx.feature.createMany({
						data: features,
						skipDuplicates: true
					});

					//taxonomies
					console.log("taxonomies");
					await tx.taxonomy.createMany({
						data: taxonomies,
						skipDuplicates: true
					});

					//assignments
					console.log("assignments");
					await tx.assignment.createManyAndReturn({
						data: assignments.map((a) =>
							AssignmentOptionalDefaultsSchema.parse(
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
						),
						select: {
							featureid: true,
							taxonomy: true
						}
					});
				}

				//Occurrence file
				//parsing file inside transaction to reduce memory usage, since this file is large
				console.log(`${assay_name}_occ file`);
				//code block to force garbage collection
				{
					const observations = [] as Prisma.ObservationCreateManyInput[];
					const occurrences = [] as OccurrencePartial[];

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

					//iterate over each row
					for (let i = 1; i < occFileLines.length; i++) {
						const currentLine = occFileLines[i].split("\t");

						if (currentLine[0]) {
							//iterate over each column
							for (let j = 1; j < occFileHeaders.length; j++) {
								//const analysisId = id;
								const samp_name = occFileHeaders[j];
								const featureid = currentLine[0];
								const organismQuantity = parseInt(currentLine[j]);

								if (organismQuantity) {
									//observation table
									observations.push(
										ObservationOptionalDefaultsSchema.parse(
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
										organismQuantity,
										taxonomy: featToTaxa[featureid]
									});
								}
							}
						}
					}

					//upload to database
					//observations
					console.log("observations");
					await tx.observation.createMany({
						data: observations,
						skipDuplicates: true
					});

					//occurrences
					console.log("occurrences");
					await tx.occurrence.createMany({
						data: occurrences.map((occ) => {
							return OccurrenceOptionalDefaultsSchema.parse(
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
				}
			},
			{ timeout: 1.5 * 60 * 1000 } //1 minute 30 seconds
		);

		return { response: "Success" };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { response: "Error", error: error.message };
	}
}
