import ExploreTabButton from "@/app/components/explore/ExploreTabButton";
import TableDescription from "@/app/components/explore/TableDescription";
import TableFilter from "@/app/components/explore/TableFilter";
import Pagination from "@/app/components/paginated/Pagination";
import { TABLES } from "@/app/helpers/consts";

export default async function Feature() {
	return (
		<div className="grid grid-cols-[300px_1fr] gap-6 pt-6">
			<TableFilter
				tableConfig={[
					{
						field: "dna_sequence_length",
						label: "Sequence Length",
						type: "range"
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
					<TableDescription description={TABLES.feature.description} />
				</div>

				<div className="space-y-6">
					<h1 className="text-xl font-medium text-base-content">
						Showing all
						<span className="text-primary"> Features</span>
					</h1>

					<div className="bg-base-100 rounded-lg border border-base-300">
						<Pagination
							id="featureid"
							table="feature"
							title="featureid"
							fields={["dna_sequence"]}
							relCounts={["Occurrences", "Assignments"]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
