import { prisma } from "@/app/helpers/prisma";
import Link from "next/link";

export default async function Project_Id({ params }: { params: { project_id: string } }) {
	const study = await prisma.study.findUnique({
		where: {
			project_id: params.project_id
		},
		include: {
			_count: {
				select: {
					Samples: true,
					Analyses: true
				}
			}
		}
	});
	if (!study) return <>Study not found</>;
	return (
		<>
			<h1>project_id {study.project_id}</h1>
			<div className="flex gap-5">
				<Link href={`/explore/study/${params.project_id}/Samples`} className="btn">
					{study._count.Samples} Samples
				</Link>
				<Link href={`/explore/study/${params.project_id}/Analyses`} className="btn">
					{study._count.Analyses} Analyses
				</Link>
			</div>
		</>
	);
}
