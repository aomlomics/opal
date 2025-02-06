import TableFilter from "@/app/components/explore/TableFilter";
import Pagination from "@/app/components/paginated/Pagination";

export default async function Feature() {
	return (
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
	);
}
