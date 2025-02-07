export const TABLES = {
	project: {
		tabName: "Projects",
		description:
			"Research initiatives collecting eDNA samples, with metadata on study design, objectives, and participating institutions."
	},
	sample: {
		tabName: "Samples",
		description: "eDNA samples with metadata on collection, environmental conditions, storage, and processing methods."
	},
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
	analysis: {
		tabName: "Analyses",
		description:
			"Bioinformatic processing runs that convert raw sequence data into species detections, documenting all parameters and methods used."
	},
	// occurrence: {
	// 	name: "Occurrences",
	// 	description:
	// 		"Individual detection records linking samples to specific DNA sequences (Features), including their quantified abundance."
	// },
	feature: {
		tabName: "Features",
		description:
			"Unique DNA sequences (eg, ASVs) found in samples, typically representing distinct organisms, with their consensus taxonomic classification."
	},
	// assignment: { name: "Assignments", description: "Some description." },
	taxonomy: {
		tabName: "Taxonomies",
		description: "Hierarchical classification of detected organisms from domain to species level."
	}
};
