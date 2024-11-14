import { prisma } from "@/app/helpers/prisma";
//import { getBaseUrl } from "@/helpers/utils";
import Link from "next/link";
import Catalogue from "@/app/components/Catalogue";

export default async function RunId({ params }: { params: { project_id: string; runId: string } }) {
	return (
		<div className="p-5 bg-primary rounded-xl">
			{/*<Link href={`data/projects/${params.project_id}`}>← Project {params.project_id}</Link>
			<h1>Features:</h1>
			<Catalogue data={result}></Catalogue>*/}
		</div>
	);
}
