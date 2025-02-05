"use client";

import { usePathname } from "next/navigation";
import ExploreTabButton from "@/app/components/explore/ExploreTabButton";
import TableDescription from "@/app/components/explore/TableDescription";

const TABLES = [
	{
		name: "Projects",
		route: "project",
		description:
			"Research initiatives collecting eDNA samples, with metadata on study design, objectives, and participating institutions."
	},
	{
		name: "Samples",
		route: "sample",
		description: "eDNA samples with metadata on collection, environmental conditions, storage, and processing methods."
	},
	// {
	// 	name: "Assays",
	// 	route: "assay",
	// 	description:
	// 		"Laboratory protocols used to analyze samples, specifying primers, controls, PCR protocols, and target genes for DNA amplification."
	// },
	// {
	// 	name: "Libraries",
	// 	route: "library",
	// 	description:
	// 		"Sequencing preparation details for each Sample-Assay combination, including barcoding approach, sequencing platform, and adapter information."
	// },
	{
		name: "Analyses",
		route: "analysis",
		description:
			"Bioinformatic processing runs that convert raw sequence data into species detections, documenting all parameters and methods used."
	},
	// {
	// 	name: "Occurrences",
	// 	route: "occurrence",
	// 	description:
	// 		"Individual detection records linking samples to specific DNA sequences (Features), including their quantified abundance."
	// },
	{
		name: "Features",
		route: "feature",
		description:
			"Unique DNA sequences (eg, ASVs) found in samples, typically representing distinct organisms, with their consensus taxonomic classification."
	},
	// { name: "Assignments", route: "assignment", description: "Some description." },
	{
		name: "Taxonomies",
		route: "taxonomy",
		description: "Hierarchical classification of detected organisms from domain to species level."
	}
];

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const pathParts = pathname.split("/").filter(Boolean);

	// Only show tabs and description if we're at the root of a table route
	// e.g., /explore/project but not /explore/project/123
	const showTableNav = pathParts.length === 2;

	const currentRoute = pathParts[1] || "project";
	const currentTable = TABLES.find((table) => table.route === currentRoute) || TABLES[0];

	return (
		<div className="py-6 px-60 bg-base-100">
			<div className="flex flex-col space-y-4 p-4">
				{showTableNav && (
					<>
						{/* Tabs Navigation */}
						<div className="border-b border-base-300">
							<div className="flex space-x-2">
								{TABLES.map((table) => (
									<ExploreTabButton key={table.route} tabName={table.name} route={table.route} />
								))}
							</div>
						</div>

						{/* Table Description */}
						<TableDescription tableName={currentTable.name} description={currentTable.description} />
					</>
				)}

				{/* Existing Content */}
				<div className={`bg-base-200 p-6 rounded-lg ${!showTableNav && "mt-0"}`}>{children}</div>
			</div>
		</div>
	);
}
