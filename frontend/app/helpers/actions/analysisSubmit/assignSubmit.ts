"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/app/helpers/prisma";
import { replaceDead } from "@/app/helpers/utils";
import {
	AssignmentOptionalDefaultsSchema,
	AssignmentPartial,
	AssignmentScalarFieldEnumSchema,
	FeatureOptionalDefaultsSchema,
	FeaturePartial,
	FeatureScalarFieldEnumSchema,
	TaxonomyOptionalDefaultsSchema,
	TaxonomyPartial,
	TaxonomyScalarFieldEnumSchema
} from "@/prisma/generated/zod";

export default async function assignSubmitAction(formData: FormData) {
	try {
		let assay_name = formData.get("assay_name") as string;
		console.log(`${assay_name} assignment submit`);

		const analysisId = parseInt(formData.get("analysisId") as string);

		const featToTaxa = {} as Record<string, string>;

		//Feature file
		//parsing file inside transaction to reduce memory usage, since this file is large
		const dbAssignments = await prisma.$transaction(
			async (tx) => {
				const features = [] as Prisma.FeatureCreateManyInput[];
				const taxonomies = [] as Prisma.TaxonomyCreateManyInput[];
				const assignments = [] as AssignmentPartial[];

				console.log(`${assay_name}_assign file`);
				let assignFileLines;
				if (process.env.NODE_ENV !== "development") {
					//TODO: flip comparison
					//get files from form data
					const file = formData.get(`${assay_name}_assign`) as File;
					const fileText = await file.text();
					assignFileLines = fileText.split("\n");
				} else {
					//fetch from blob storage
					const url = JSON.parse(formData.get(`${assay_name}_assign`) as string).url;
					const file = await fetch(url);
					const fileText = await file.text();
					assignFileLines = fileText.split("\n");
				}
				const assignFileHeaders = assignFileLines[0].split("\t");

				//iterate over each row
				for (let i = 1; i < assignFileLines.length; i++) {
					const currentLine = assignFileLines[i].split("\t");

					if (currentLine[assignFileHeaders.indexOf("featureid")]) {
						const featureRow = {} as FeaturePartial;
						const assignmentRow = {} as AssignmentPartial;
						const taxonomyRow = {} as TaxonomyPartial;

						//iterate over each column
						for (let j = 0; j < assignFileHeaders.length; j++) {
							//feature table
							replaceDead(
								currentLine[j],
								assignFileHeaders[j],
								featureRow,
								FeatureOptionalDefaultsSchema,
								FeatureScalarFieldEnumSchema
							);

							//assignment table
							replaceDead(
								currentLine[j],
								assignFileHeaders[j],
								assignmentRow,
								AssignmentOptionalDefaultsSchema,
								AssignmentScalarFieldEnumSchema
							);

							//taxonomy table
							replaceDead(
								currentLine[j],
								assignFileHeaders[j],
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
				const dbAssignments = await tx.assignment.createManyAndReturn({
					data: assignments.map((a) =>
						AssignmentOptionalDefaultsSchema.parse(
							{
								...a,
								analysisId
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
						id: true
					}
				});

				return dbAssignments.map((a) => a.id);
			},
			{
				timeout: 0.5 * 60 * 1000
			}
		);

		return { message: "Success", result: { dbAssignments } };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { message: "Error", error: error.message };
	}
}
