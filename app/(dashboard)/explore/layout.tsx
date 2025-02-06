"use client";

import { usePathname } from "next/navigation";
import { Suspense, ReactNode } from "react";
import ExploreTabButton from "@/app/components/explore/ExploreTabButton";
import TableDescription from "@/app/components/explore/TableDescription";
import TableFilter from "@/app/components/explore/TableFilter";

const TABLES = [
	{
		tabName: "Projects",
		route: "project",
		description:
			"Research initiatives collecting eDNA samples, with metadata on study design, objectives, and participating institutions."
	},
	{
		tabName: "Samples",
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
		tabName: "Analyses",
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
		tabName: "Features",
		route: "feature",
		description:
			"Unique DNA sequences (eg, ASVs) found in samples, typically representing distinct organisms, with their consensus taxonomic classification."
	},
	// { name: "Assignments", route: "assignment", description: "Some description." },
	{
		tabName: "Taxonomies",
		route: "taxonomy",
		description: "Hierarchical classification of detected organisms from domain to species level."
	}
];

export default function ExploreLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const currentTable = pathname.split("/")[2];
	const currentTableConfig = TABLES.find((t) => t.route === currentTable);

	return (
		<div className="max-w-[1400px] mx-auto p-6">
			<div className="tabs mb-6">
				{TABLES.map((table) => (
					<ExploreTabButton key={table.route} tabName={table.tabName} route={table.route} />
				))}
			</div>

			<div className="grid grid-cols-[300px_1fr] gap-6">
				<Suspense fallback={<div>Loading filters...</div>}>
					{currentTable && <TableFilter table={currentTable} />}
				</Suspense>

				<div>
					{currentTableConfig && (
						<TableDescription tableName={currentTableConfig.tabName} description={currentTableConfig.description} />
					)}
					{children}
				</div>
			</div>
		</div>
	);
}
