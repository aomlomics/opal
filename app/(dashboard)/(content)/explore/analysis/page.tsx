import TableFilter from "@/app/components/explore/TableFilter";
import Pagination from "@/app/components/paginated/Pagination";
import { TABLES } from "@/app/helpers/consts";
import ExploreTabButton from "@/app/components/explore/ExploreTabButton";
import TableDescription from "@/app/components/explore/TableDescription";
import { target_gene } from "@prisma/client";

export default async function Analysis() {
	return (
		<div className="grid grid-cols-[300px_1fr] gap-6 pt-6">
			<TableFilter
				tableConfig={[
					{
						field: "asv_method",
						label: "Analysis Method",
						type: "select",
						options: ["DADA2", "Deblur", "Other"]
					},
					{
						field: "target_gene",
						label: "Target Gene",
						type: "select",
						enumType: target_gene
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
					<TableDescription description={TABLES.analysis.description} />
				</div>

				<div className="space-y-6">
					<h1 className="text-xl font-medium text-base-content">
						Showing all
						<span className="text-primary"> Analyses</span>
					</h1>

					<div className="bg-base-100 rounded-lg border border-base-300">
						<Pagination
							table="analysis"
							id="analysis_run_name"
							title="analysis_run_name"
							fields={["project_id", "assay_name", "asv_method"]}
							relCounts={["Occurrences", "Assignments"]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
