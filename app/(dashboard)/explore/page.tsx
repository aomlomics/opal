import Link from "next/link";

export default function Explore() {
	const tables = [
		{
			name: "Projects",
			description:
				"Research initiatives that collect eDNA samples. Each project contains metadata about the study design, objectives, and participating institutions.",
			route: "/explore/project"
		},
		{
			name: "Samples",
			description:
				"Physical eDNA samples collected during projects. Includes collection metadata, environmental parameters, and processing methods.",
			route: "/explore/sample"
		},
		{
			name: "Assays",
			description:
				"Laboratory methods used to analyze samples, including PCR primers, sequencing platforms, and protocols.",
			route: "/explore/assay"
		},
		{
			name: "Analyses",
			description:
				"Bioinformatic processing of raw sequence data. Documents software versions, parameters, and quality control steps.",
			route: "/explore/analysis"
		},
		{
			name: "Occurrences",
			description:
				"Individual species detections from processed sequence data, including abundance and confidence metrics.",
			route: "/explore/occurrence"
		},
		{
			name: "Taxonomy",
			description:
				"Standardized taxonomic classifications for detected organisms, aligned with WoRMS marine species database.",
			route: "/explore/taxonomy"
		}
	];

	return (
		<div className="p-8 max-w-4xl">
			<h1 className="text-xl mb-6">Explore NODE Data Tables</h1>

			<div className="space-y-4">
				{tables.map((table) => (
					<details key={table.name} className="collapse bg-base-200">
						<summary className="collapse-title text-lg flex items-center justify-between cursor-pointer">
							{table.name}
						</summary>
						<div className="collapse-content">
							<p className="text-base-content/70 mb-4">{table.description}</p>
							<Link href={table.route} className="text-primary">
								Browse {table.name} →
							</Link>
						</div>
					</details>
				))}
			</div>
		</div>
	);
}
