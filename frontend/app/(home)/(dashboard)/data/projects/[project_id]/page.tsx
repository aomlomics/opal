import { prisma } from "@/app/helpers/prisma";
//import { getBaseUrl } from "@/helpers/utils";
import Link from "next/link";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/app/components/Map"), {
	ssr: false
});

export default async function ProjectId({ params }: { params: { project_id: string } }) {
	// const project = await prisma.study_Data.findUnique({ //SCHEMA
	// 	where: {
	// 		project_id: params.project_id
	// 	}
	// });
	// if (!project) return <div>Failed to load project</div>;
	let runs = [
		{
			id: 1,
			uploadedBy: "User1",
			date_modified: "2024-09-30T14:42:24Z"
		}
	];
	runs = [...runs, ...runs, ...runs, ...runs, ...runs];

	return (
		<div className="flex flex-col z-40 m-5 gap-5">
			<h1>Project Name</h1>
			<div className="flex-grow">
				<Map></Map>
			</div>
			<div className="p-5 bg-primary rounded-xl">
				{/* {JSON.stringify(project/)} */}
				<h1 className="text-3xl font-bold border-b-2 border-black mb-5">Metadata:</h1>
				<div>Some metadata</div>
				<h1 className="text-3xl font-bold border-b-2 border-black mb-5">Runs:</h1>
				{runs.map((r) => (
					<Link key={r.id} href={`/data/projects/${params.project_id}/runs/${r.id}`}>
						<div className="card bg-neutral-content my-3">
							<div className="card-body">
								<h2 className="card-title">{r.uploadedBy}</h2>
								<p>{r.date_modified}</p>
								<p>Other metadata</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
