"use server";

import { prisma } from "@/app/helpers/prisma";

export default async function analysisDeleteAction(formData: FormData) {
	try {
		const analysisId = parseInt(formData.get("analysisId") as string);

		//analysis
		console.log("analysis");
		await prisma.analysis.delete({
			where: {
				id: analysisId
			}
		});

		return { response: "Success" };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { response: "Error", error: error.message };
	}
}
