import { prisma } from "@/app/helpers/prisma";
import { parsePaginationParams } from "@/app/helpers/utils";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		const findMany = parsePaginationParams(searchParams);

		const table = searchParams.get("table") as Uncapitalize<Prisma.ModelName>;
		if (table) {
			//@ts-ignore
			const [result, count] = await prisma.$transaction([prisma[table].findMany(findMany), prisma[table].count()]);

			return Response.json({ message: "Success", result, count });
		} else {
			return Response.json({ error: "No table specified." }, { status: 400 });
		}
	} catch (err) {
		const error = err as Error;

		return Response.json({ error: error.message }, { status: 400 });
	}
}
