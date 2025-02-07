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
	const pathParts = pathname.split("/");
	const currentTable = pathParts[2];
	const isListPage = pathParts.length === 3;
	const currentTableConfig = TABLES.find((t) => t.route === currentTable);

	return (
		<div className="w-full p-6">
			{isListPage ? (
				// List pages - consistent grid layout with filter
				<div className="grid grid-cols-[300px_1fr] gap-6">
					{/* Left Sidebar */}
					<Suspense fallback={<div>Loading filters...</div>}>
						{currentTable && <TableFilter table={currentTable} />}
					</Suspense>

					{/* Main Content */}
					<div className="space-y-6">
						{/* Tabs and Description */}
						<div className="space-y-[-1px]">
							<div className="border-b border-base-300">
								<nav className="flex tabs tabs-lifted">
									{TABLES.map((table) => (
										<ExploreTabButton key={table.route} tabName={table.tabName} route={table.route} />
									))}
								</nav>
							</div>
							{currentTableConfig && <TableDescription description={currentTableConfig.description} />}
						</div>

						{/* Page Content */}
						{children}
					</div>
				</div>
			) : (
				// Detail pages - centered with consistent top margin
				<div className="pt-6">{children}</div>
			)}
		</div>
	);
}
