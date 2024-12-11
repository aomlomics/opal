"use server";

import { prisma } from "@/app/helpers/prisma";
import { replaceDead } from "@/app/helpers/utils";
import { AnalysisOptionalDefaultsSchema, AnalysisScalarFieldEnumSchema } from "@/prisma/generated/zod";
import { SubmitActionReturn } from "@/types/types";

export default async function analysisSubmitAction(formData: FormData): SubmitActionReturn {
	try {
		const analysisCol = {} as Record<string, string>;

		//Analysis file
		console.log("Analysis file");
		//code block to force garbage collection
		{
			//parse file
			const analysisFileLines = (await (formData.get("file") as File).text()).replace(/[\r]+/gm, "").split("\n");
			//iterate over each row
			for (let i = 1; i < analysisFileLines.length; i++) {
				const currentLine = analysisFileLines[i].split("\t");

				//Analysis
				if (currentLine[0]) {
					replaceDead(
						currentLine[1].replace(/[\r\n]+/gm, ""),
						currentLine[0],
						analysisCol,
						AnalysisOptionalDefaultsSchema,
						AnalysisScalarFieldEnumSchema
					);
				}
			}
		}

		//analysis
		console.log("analysis");
		const dbAnalysis = await prisma.analysis.create({
			data: AnalysisOptionalDefaultsSchema.parse(analysisCol, {
				errorMap: (error, ctx) => {
					return { message: `AnalysisSchema: ${ctx.defaultError}` };
				}
			}),
			select: {
				analysis_run_name: true
			}
		});

		return { message: "Success", result: { analysis_run_name: dbAnalysis.analysis_run_name } };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { message: "Error", error: error.message };
	}
}
