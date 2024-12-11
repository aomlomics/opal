"use server";

import { prisma } from "@/app/helpers/prisma";

export default async function assignDeleteAction(formData: FormData) {
	try {
		const dbAssignments = JSON.parse(formData.get("del") as string);
		const assignmentChunks = [] as number[][];
		while (dbAssignments.length) {
			assignmentChunks.push(dbAssignments.splice(0, 30000));
		}

		//assignments
		console.log("assignments delete");
		await prisma.$transaction(async (tx) => {
			for (const chunk of assignmentChunks) {
				await tx.assignment.deleteMany({
					where: {
						id: {
							in: chunk
						}
					}
				});
			}
		});

		return { message: "Success" };
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		return { message: "Error", error: error.message };
	}
}
