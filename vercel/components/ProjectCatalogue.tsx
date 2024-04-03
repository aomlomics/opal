import { prisma } from "@/helpers/prisma";
import Link from "next/link";
import { getBaseUrl } from "@/helpers/utils";

export default async function ProjectCatalogue() {
	let projects = await prisma.study_Data.findMany(); //SCHEMA
	if (!projects) return <div>Failed to load projects</div>;
	projects = [...projects, ...projects, ...projects] //testing multiple entries

	return (
		<div className="p-5 bg-primary rounded-xl">
			<h1 className="text-black text-3xl font-bold border-b-2 border-black mb-5">Projects:</h1>
			<div className="flex flex-col gap-3">
				{projects.map((proj) => (
					<Link key={proj.id} href={`${getBaseUrl()}/${proj.project_id}`}>
						<div className="card bg-base-100">
							<div className="card-body">
								<h2 className="card-title">{proj.project_name}</h2>
								<p>{proj.project_description?.substring(0, 200)}...</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}