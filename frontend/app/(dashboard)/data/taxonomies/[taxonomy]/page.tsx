import { prisma } from "@/helpers/prisma";
import { getBaseUrl } from "@/helpers/utils";
import Link from "next/link";
import { promises as fs } from "fs";
import { parse }  from "csv-parse/sync";

export default async function FeatureId({ params }: { params: { taxonomy: string } }) {
	const content = await fs.readFile(`${process.cwd()}/app/exampleData.tsv`, "utf8");
	const lines = content.split("\n");
	const result = [];
	const headers = lines[0].split("\t");

	for (let i = 1; i < lines.length; i++) {
		const obj = {} as { featureid: String, species: String };
		const currentline = lines[i].split("\t");

		for (let j = 0; j < headers.length; j++) {
			//@ts-ignore
			obj[headers[j]] = currentline[j];
		}

    	result.push(obj);
 	}
	const features = result.filter((f) => f.species === params.taxonomy.replace("%20", " "));
	//const records = parse(content, { bom: true, columns: true });
	//console.log(records)

	return (
		<div className="p-5 bg-primary rounded-xl">
			<h1>Taxonomy {params.taxonomy.replace("%20", " ")}</h1>
			{/*<h2>{features[0]}</h2>*/}
			<div>
				<h2>Features:</h2>
				{features.map((f, i) => (
					<Link key={i} href={`${getBaseUrl()}/data/features/${f.featureid}`}>
						<div className="card bg-neutral-content m-3">
							<div className="card-body p-5">
								{f.featureid}
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}