import { prisma } from "@/helpers/prisma";

export default function AsvUpload() {
	async function asvUpload(formData: FormData) {
		"use server"

		const content = await (formData.get("asvFile") as File).text();
		const lines = content.split("\n");
		const entriesByTaxa = {} as { [key: string]: [{}] }; //object where values are arrays of objects
		const headers = lines[0].split("\t");
		const taxonomies = new Set();

		for (let i = 1; i < lines.length; i++) {
			const obj = {} as { featureid: string, species: string, taxonomy: string };
			const currentline = lines[i].split("\t");

			for (let j = 0; j < headers.length; j++) {
				//@ts-ignore
				obj[headers[j]] = currentline[j];
			}

			const taxa = obj.taxonomy as keyof typeof entriesByTaxa;
			if (entriesByTaxa[taxa]) {
				entriesByTaxa[taxa].push(obj);
			} else {
				entriesByTaxa[taxa] = [obj];
			}
			taxonomies.add(obj.taxonomy);
		}

		//console.log(entriesByTaxa[[...taxonomies][0] as string])
		for (const taxa in entriesByTaxa) {
			console.log(taxa)
			await prisma.taxonomy.upsert({
				where: {
					stringIdentifier: taxa
				},
				update: {
					Feature: {
						createMany: {
							data: entriesByTaxa[taxa].map((obj: any) => ({ featureId: obj.featureid, sequence: obj.sequence })),
							skipDuplicates: true
						}
					}
				},
				create: {
					stringIdentifier: taxa,
					Feature: {
						createMany: {
							data: entriesByTaxa[taxa].map((obj: any) => ({ featureId: obj.featureid, sequence: obj.sequence })),
							skipDuplicates: true
						}
					}
				}
			});
		}
		console.log("success")
	}

	return (
		<form action={asvUpload}>
			<input type="file" name="asvFile" className="file-input file-input-bordered w-full max-w-xs" />
			<button className="btn">Submit</button>
		</form>
	);
}