import { prisma } from "@/app/helpers/prisma";
import { parsePaginationParams } from "@/app/helpers/utils";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		const query = parsePaginationParams(searchParams);

		const table = searchParams.get("table") as Uncapitalize<Prisma.ModelName>;
		if (table) {
			const [result, count] = await prisma.$transaction([
				//@ts-ignore
				prisma[table].findMany(query),
				//@ts-ignore
				prisma[table].count({ where: query.where })
			]);

			return Response.json({ message: "Success", result, count });
		} else {
			return Response.json({ error: "No table specified." }, { status: 400 });
		}
	} catch (err) {
		const error = err as Error;

		return Response.json({ error: error.message }, { status: 400 });
	}
}
