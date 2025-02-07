import ExploreTabButton from "@/app/components/explore/ExploreTabButton";
import TableDescription from "@/app/components/explore/TableDescription";
import TableFilter from "@/app/components/explore/TableFilter";
import Pagination from "@/app/components/paginated/Pagination";
import { TABLES } from "@/app/helpers/consts";
import { prisma } from "@/app/helpers/prisma";
import { detection_type } from "@prisma/client";

export default async function Project() {
	const { projInstitutionOptions: institutionOptions } = await prisma.$transaction(async (tx) => {
		const instutitionRes = await tx.project.findMany({
			distinct: ["institution"],
			select: {
				institution: true
			}
		});

		return { projInstitutionOptions: instutitionRes.map((proj) => proj.institution) };
	});
	if (!institutionOptions) return <>Loading...</>;
	console.log(institutionOptions);

	return (
		<div className="grid grid-cols-[300px_1fr] gap-6 pt-6">
			<TableFilter
				tableConfig={[
					{
						field: "detection_type",
						label: "Detection Type",
						type: "select",
						enumType: detection_type
					},
					{
						field: "institution",
						label: "Institution",
						type: "select",
						options: institutionOptions as string[]
					}
				]}
			/>
			<div className="space-y-6">
				<div className="space-y-[-1px]">
					<div className="border-b border-base-300">
						<nav className="flex tabs tabs-lifted">
							{Object.entries(TABLES).map(([route, table]) => (
								<ExploreTabButton key={route} tabName={table.tabName} route={route} />
							))}
						</nav>
					</div>
					<TableDescription description={TABLES.project.description} />
				</div>

				<div className="space-y-6">
					<h1 className="text-xl font-medium text-base-content">
						Showing all
						<span className="text-primary"> Projects</span>
					</h1>

					<div className="bg-base-100 rounded-lg border border-base-300">
						<Pagination
							id="project_id"
							table="project"
							title="project_name"
							fields={["detection_type", "study_factor", "institution", "project_contact"]}
							relCounts={["Samples", "Analyses"]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
