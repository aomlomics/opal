"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/app/helpers/prisma";
import { replaceDead } from "@/app/helpers/utils";
import { AnalysisOptionalDefaultsSchema, AnalysisScalarFieldEnumSchema } from "@/prisma/generated/zod";

export default async function analysisSubmitAction(formData: FormData) {
	try {
		let assay_name = formData.get("assay_name") as string;
		console.log(`${assay_name} analysis submit`);

		const studyCol = {} as Record<string, string>;
		const analysisCol = {} as Record<string, string>;

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

		//analysis
		console.log("analysis");
		const dbAnalysis = await prisma.analysis.create({
			data: analysis,
			select: {
				id: true
			}
		});

		return { message: "Success", result: { analysisId: dbAnalysis.id } };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { message: "Error", error: error.message };
	}
}
