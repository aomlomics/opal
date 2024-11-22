"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/app/helpers/prisma";
import { ObservationOptionalDefaultsSchema, OccurrenceOptionalDefaultsSchema } from "@/prisma/generated/zod";

export default async function OccSubmitAction(formData: FormData) {
	try {
		let assay_name = formData.get("assay_name") as string;
		console.log(`${assay_name} occurrences submit`);

		const analysisId = parseInt(formData.get("analysisId") as string);

		//Occurrence file
		//parsing file inside transaction to reduce memory usage, since this file is large
		await prisma.$transaction(
			async (tx) => {
				const observations = [] as Prisma.ObservationCreateManyInput[];
				const occurrences = [] as Prisma.OccurrenceCreateManyInput[];

				console.log(`${assay_name}_occ file`);
				let occFileLines;
				if (process.env.NODE_ENV === "development") {
					//get files from form data
					const file = formData.get("file") as File;
					const fileText = await file.text();
					occFileLines = fileText.split("\n");
				} else {
					//fetch from blob storage
					const url = JSON.parse(formData.get("file") as string).url;
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
								occurrences.push(
									OccurrenceOptionalDefaultsSchema.parse(
										{
											samp_name,
											featureid,
											organismQuantity,
											analysisId
										},
										{
											errorMap: (error, ctx) => {
												return {
													message: `OccurrenceSchema (${assay_name}, ${samp_name}, ${featureid}): ${ctx.defaultError}`
												};
											}
										}
									)
								);
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
					data: occurrences
				});
			},
			{
				timeout: 1 * 60 * 1000
			}
		);

		return { message: "Success", result: {} };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { message: "Error", error: error.message };
	}
}
