"use server";

import { Occurrence, Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export default async function occDownloadAction(where: Prisma.OccurrenceWhereInput) {
	const result = await prisma.occurrence.findMany({ where });

	const occurrences = {} as Record<string, Record<string, number>>;
	const headers = new Set() as Set<string>;
	for (const occ of result as Occurrence[]) {
		if (occ.featureid in occurrences) {
			occurrences[occ.featureid][occ.samp_name] = occ.organismQuantity;
		} else {
			occurrences[occ.featureid] = { [occ.samp_name]: occ.organismQuantity };
		}
		headers.add(occ.samp_name);
	}
}
