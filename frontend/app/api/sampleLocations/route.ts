import { prisma } from "@/app/helpers/prisma";
import { DeadValue } from "@/types/enums";

type ProjSampleAvgLocs = {
	_avg: {
		decimalLatitude: number;
		decimalLongitude: number;
	};
	project_id: string;
	id: number;
};

export async function GET(request: Request) {
	//maps enum to only its numeric values, discarding the string values
	const deadValues = Object.values(DeadValue).filter((v) => !isNaN(Number(v))) as number[];

	try {
		const rawLocations = await prisma.$transaction(async (tx) => {
			const studiesRes = await prisma.study.findMany({
				select: {
					project_id: true,
					id: true
				}
			});
			//convert array of studies into object where keys are project_id and values are database id
			const studies = studiesRes.reduce((accum, study) => ({ ...accum, [study.project_id]: study.id }), {});

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

			for (const study of rawLocations as ProjSampleAvgLocs[]) {
				study.id = studies[study.project_id as keyof typeof studies];
			}

			return rawLocations;
		});

		return Response.json({ message: "Success", rawLocations });
	} catch (err) {
		const error = err as Error;

		return Response.json({ error: error.message }, { status: 400 });
	}
}
