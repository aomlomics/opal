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
import { SubmitActionReturn } from "@/types/types";

export default async function assignSubmitAction(formData: FormData): SubmitActionReturn {
	try {
		const analysis_run_name = formData.get("analysis_run_name") as string;
		console.log(`${analysis_run_name} assignment submit`);

		//Feature file
		//parsing file inside transaction to reduce memory usage, since this file is large
		const result = await prisma.$transaction(
			async (tx) => {
				const features = [] as Prisma.FeatureCreateManyInput[];
				const taxonomies = [] as Prisma.TaxonomyCreateManyInput[];
				const assignments = [] as AssignmentPartial[];

				console.log(`${analysis_run_name}_assign file`);
				let assignFileLines;
				//fetch files from blob storage
				const url = JSON.parse(formData.get("file") as string).url;
				const file = await fetch(url);
				const fileText = await file.text();
				assignFileLines = fileText.replace(/[\r]+/gm, "").split("\n");
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
							if (assignFileHeaders[j] === "Confidence\r") {
								console.log("---------");
								console.log(currentLine[j]);
							}
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
									return { message: `FeatureSchema (${analysis_run_name}): ${ctx.defaultError}` };
								}
							})
						);

						//assignments can only be parsed after inserting the analyses
						assignments.push(assignmentRow);

						taxonomies.push(
							TaxonomyOptionalDefaultsSchema.parse(taxonomyRow, {
								errorMap: (error, ctx) => {
									return { message: `TaxonomySchema (${analysis_run_name}): ${ctx.defaultError}` };
								}
							})
						);
					}
				}

				//upload to database
				//features
				console.log("features");
				const dbFeatures = await tx.feature.createManyAndReturn({
					data: features,
					skipDuplicates: true,
					select: {
						id: true
					}
				});

				//taxonomies
				console.log("taxonomies");
				const dbTaxonomies = await tx.taxonomy.createManyAndReturn({
					data: taxonomies,
					skipDuplicates: true,
					select: {
						id: true
					}
				});

				//assignments
				console.log("assignments");
				await tx.assignment.createMany({
					data: assignments.map((a) =>
						AssignmentOptionalDefaultsSchema.parse(
							{
								...a,
								analysis_run_name
							},
							{
								errorMap: (error, ctx) => {
									return {
										message: `AssignmentSchema (${analysis_run_name}, ${a.featureid}, ${a.Confidence}): ${ctx.defaultError}`
									};
								}
							}
						)
					)
				});

				return { dbFeatures: dbFeatures.map((feat) => feat.id), dbTaxonomies: dbTaxonomies.map((taxa) => taxa.id) };
			},
			{
				timeout: 0.5 * 60 * 1000
			}
		);

		return { message: "Success", result };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { message: "Error", error: error.message };
	}
}
