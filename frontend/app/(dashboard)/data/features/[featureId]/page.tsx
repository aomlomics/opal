import { prisma } from "@/helpers/prisma";
import { getBaseUrl } from "@/helpers/utils";
import Link from "next/link";
import { promises as fs } from "fs";
import { parse }  from "csv-parse/sync";

export default async function FeatureId({ params }: { params: { featureId: string } }) {
	const content = await fs.readFile(`${process.cwd()}/app/exampleData.tsv`, "utf8");
	const lines = content.split("\n");
	const result = [];
	const headers = lines[0].split("\t");

	for (let i = 1; i < lines.length; i++) {
		const obj = {};
		const currentline = lines[i].split("\t");

		for (let j = 0; j < headers.length; j++) {
			//@ts-ignore
			obj[headers[j]] = currentline[j];
		}

    	result.push(obj);
 	}
	const feature = result.find((f) => f.featureid === params.featureId);
	//const records = parse(content, { bom: true, columns: true });
	//console.log(records)

	return (
		<div className="p-5 bg-primary rounded-xl">
			<h1>Feature {feature.featureid}</h1>
			<div>
				<h2>Consensus Taxonomy:</h2>
				<Link href={`${getBaseUrl()}/data/taxonomies/${feature.species}`}>{feature.species}</Link>
				<h2>Taxonomies:</h2>
				<Link href={`${getBaseUrl()}/data/taxonomies/${feature.species}`}>{feature.species}</Link>
				<h2>Studies:</h2>
				<Link href={`${getBaseUrl()}/data/projects/1/runs/1`}>Example Study</Link>
			</div>
		</div>
	);
}