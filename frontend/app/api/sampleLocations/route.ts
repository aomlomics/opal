import { prisma } from "@/app/helpers/prisma";
import { DeadValue } from "@/types/enums";

export async function GET(request: Request) {
	//maps enum to only its numeric values, discarding the string values
	const deadValues = Object.values(DeadValue).filter((v) => !isNaN(Number(v))) as number[];

	try {
		const rawLocations = await prisma.sample.groupBy({
			by: ["project_id"],
			_avg: {
				decimalLatitude: true,
				decimalLongitude: true
			},
			where: {
				AND: [
					{
						NOT: {
							decimalLatitude: {
								in: deadValues
							}
						}
					},
					{
						NOT: {
							decimalLongitude: {
								in: deadValues
							}
						}
					}
				]
			}
		});

		return Response.json({ message: "Success", rawLocations });
	} catch (err) {
		const error = err as Error;

		return Response.json({ error: error.message }, { status: 400 });
	}
}
