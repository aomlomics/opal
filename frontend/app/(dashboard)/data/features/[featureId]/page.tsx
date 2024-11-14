import { prisma } from "@/app/helpers/prisma";
//import { getBaseUrl } from "@/app/helpers/utils";
import Link from "next/link";

export default async function FeatureId({ params }: { params: { featureId: string } }) {
	return (
		<div className="p-5 bg-primary rounded-xl">
			{/*<h1>Feature {feature.featureid}</h1>
			<div>
				<h2>Consensus Taxonomy:</h2>
				<Link href={`data/taxonomies/${feature.species}`}>{feature.species}</Link>
				<h2>Taxonomies:</h2>
				<Link href={`data/taxonomies/${feature.species}`}>{feature.species}</Link>
				<h2>Studies:</h2>
				<Link href={`data/projects/1/runs/1`}>Example Study</Link>
			</div>*/}
		</div>
	);
}
