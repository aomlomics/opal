"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ExploreTabButtons() {
	const pathname = usePathname();

	const TAB_NAMES = {
		project: "Projects",
		sample: "Samples",
		// assay: {
		// 	name: "Assays",
		// 	description:
		// 		"Laboratory protocols used to analyze samples, specifying primers, controls, PCR protocols, and target genes for DNA amplification."
		// },
		// library: {
		// 	name: "Libraries",
		// 	description:
		// 		"Sequencing preparation details for each Sample-Assay combination, including barcoding approach, sequencing platform, and adapter information."
		// },
		analysis: "Analyses",
		// occurrence: {
		// 	name: "Occurrences",
		// 	description:
		// 		"Individual detection records linking samples to specific DNA sequences (Features), including their quantified abundance."
		// },
		feature: "Features",
		// assignment: { name: "Assignments", description: "Some description." },
		taxonomy: "Taxonomies"
	};

	return (
		<nav className="flex tabs tabs-lifted">
			{/* {Object.entries(TAB_NAMES).map(([route, name]) => ( */}
			<Link
				href="/explore/project"
				className={`px-6 py-3 text-base transition-colors border-b-0 border-x border-t font-medium ${
					pathname.startsWith("/explore/project")
						? "border-base-300 rounded-t-lg bg-base-100 text-primary"
						: "border-base-200 text-base-content hover:text-primary/80"
				}`}
			>
				Projects
			</Link>
			<Link
				href="/explore/sample"
				className={`px-6 py-3 text-base transition-colors border-b-0 border-x border-t font-medium ${
					pathname.startsWith("/explore/sample")
						? "border-base-300 rounded-t-lg bg-base-100 text-primary"
						: "border-base-200 text-base-content hover:text-primary/80"
				}`}
			>
				Samples
			</Link>
			<Link
				href="/explore/analysis"
				className={`px-6 py-3 text-base transition-colors border-b-0 border-x border-t font-medium ${
					pathname.startsWith("/explore/analysis")
						? "border-base-300 rounded-t-lg bg-base-100 text-primary"
						: "border-base-200 text-base-content hover:text-primary/80"
				}`}
			>
				Analyses
			</Link>
			<Link
				href="/explore/feature"
				className={`px-6 py-3 text-base transition-colors border-b-0 border-x border-t font-medium ${
					pathname.startsWith("/explore/feature")
						? "border-base-300 rounded-t-lg bg-base-100 text-primary"
						: "border-base-200 text-base-content hover:text-primary/80"
				}`}
			>
				Features
			</Link>
			<Link
				href="/explore/taxonomy"
				className={`px-6 py-3 text-base transition-colors border-b-0 border-x border-t font-medium ${
					pathname.startsWith("/explore/taxonomy")
						? "border-base-300 rounded-t-lg bg-base-100 text-primary"
						: "border-base-200 text-base-content hover:text-primary/80"
				}`}
			>
				Taxonomies
			</Link>
		</nav>
	);
}
