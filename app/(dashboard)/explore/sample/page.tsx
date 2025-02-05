import TableFilter from "@/app/components/explore/TableFilter";
import Pagination from "@/app/components/paginated/Pagination";

export default async function Project() {
	return (
		<div className="space-y-6">
			<h1 className="text-xl font-medium text-base-content">
				Showing all
				<span className="text-primary"> Samples</span>
			</h1>

			<TableFilter />

			<div className="bg-base-100 rounded-lg border border-base-300">
				<Pagination
					table="sample"
					id="samp_name"
					title="samp_name"
					fields={["project_id", "geo_loc_name"]}
					relCounts={["Occurrences"]}
				/>
			</div>
		</div>
	);
}
