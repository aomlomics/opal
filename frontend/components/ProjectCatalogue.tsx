import { prisma } from "@/helpers/prisma";
import Link from "next/link";
import { getBaseUrl } from "@/helpers/utils";

export default async function ProjectCatalogue() {
	//let projects = await prisma.study_Data.findMany(); //SCHEMA
	//if (!projects) return <div>Failed to load projects</div>;
	//projects = [...projects, ...projects, ...projects] //testing multiple entries
	let projects = [{
		id: 1,
		project_id: 1,
		project_name: "Test Project",
		project_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laudantium distinctio impedit, laborum blanditiis a vel voluptatem perferendis porro consectetur quisquam error alias dicta placeat veniam dolores expedita cum possimus eum aspernatur et recusandae iusto? Quibusdam soluta ut adipisci et illo blanditiis vitae, commodi in quae architecto quis non libero quam magnam maxime repellendus omnis ipsum quos? Nisi iste eius impedit nemo soluta? Laboriosam quo animi adipisci quis temporibus. Id illo sunt totam quod et provident sapiente numquam ipsa ab natus cum saepe, reiciendis deleniti, sit vel similique necessitatibus atque, soluta assumenda quia officiis voluptatibus. Sapiente rem ipsa incidunt sequi."
	}];
	projects = [...projects, ...projects, ...projects, ...projects, ...projects]

	return (
		<div className="p-5 bg-primary rounded-xl">
			<h1 className="text-3xl font-bold border-b-2 border-black mb-5">Projects:</h1>
			<div className="flex flex-col gap-3">
				{projects.map((proj) => (
					<Link key={proj.id} href={`${getBaseUrl()}/data/projects/${proj.project_id}`}>
						<div className="card bg-neutral-content">
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