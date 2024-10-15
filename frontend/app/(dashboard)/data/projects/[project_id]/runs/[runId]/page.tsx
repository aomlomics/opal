import { prisma } from "@/helpers/prisma";
import { getBaseUrl } from "@/helpers/utils";
import Link from "next/link";
import { promises as fs } from "fs";
import { parse }  from "csv-parse/sync";
import Catalogue from "@/components/Catalogue";

export default async function RunId({ params }: { params: { project_id: string, runId: string } }) {
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
	//const records = parse(content, { bom: true, columns: true });
	//console.log(records)

	return (
		<div className="p-5 bg-primary rounded-xl">
			<Link href={`${getBaseUrl()}/data/projects/${params.project_id}`}>← Project {params.project_id}</Link>
			<h1>Features:</h1>
			<Catalogue data={result}></Catalogue>
		</div>
	);
}