import { z } from 'zod';

// Define the form schema using Zod
export const schema = z.object({
	denoiseMethod: z.enum(['DADA2 paired-end', 'DADA2 single-end', 'Deblur single-end']),

	//Dynamically rendered fields based on denoiseMethod
	//DADA2 paired-end:
	dada2pe_trunc_len_f: z.number().min(0).refine(val => Number.isInteger(val), {
		message: "Must be an integer",
	}),

	// DADA2 Paired-end Fields
	dada2pe_trunc_len_r: z.number().min(0).optional(),
	dada2pe_trim_left_f: z.number().min(0).optional(),
	dada2pe_trim_left_r: z.number().min(0).optional(),
	dada2pe_max_ee_f: z.number().min(0).optional(),
	dada2pe_max_ee_r: z.number().min(0).optional(),
	dada2pe_trunc_q: z.number().min(0).optional(),
	dada2pe_pooling_method: z.enum(['independent', 'pseudo']).optional(),
	dada2pe_chimera_method: z.enum(['consensus', 'none', 'pooled']).optional(),
	dada2pe_min_fold_parent_over_abundance: z.number().min(1).optional(),
	dada2pe_n_reads_learn: z.number().min(1).optional(),

	//DADA2 Single-end Fields
	dada2se_trunc_len: z.number().min(0).optional(),
	dada2se_trim_left: z.number().min(0).optional(),
	dada2se_max_ee: z.number().min(0).optional(),
	dada2se_trunc_q: z.number().min(0).optional(),
	dada2se_pooling_method: z.enum(['independent', 'pseudo']).optional(),
	dada2se_chimera_method: z.enum(['consensus', 'none', 'pooled']).optional(),
	dada2se_min_fold_parent_over_abundance: z.number().min(1).optional(),
	dada2se_n_reads_learn: z.number().min(1).optional(),

	//Deblur Single-end Fields
	deblur_trim_length: z.number().min(-1).optional(),
	//deblur_sample_stats: z.
	//Not sure how to handle these. Will consult Luke/Katherine soon
	deblur_mean_error: z.number().min(0).optional(),
	deblur_indel_prob: z.number().min(0).optional(),
	deblur_indel_max: z.number().min(0).optional(),
	deblur_min_reads: z.number().min(0).optional(),
	deblur_min_size: z.number().min(0).optional(),

	//Taxonomic Level Fields
	taxClassMethod: z.enum(['naive-bayes', 'consensus-blast', 'consensus-vsearch']),
	taxonomicLevel: z.coerce.number().min(1).max(7).optional(), // Ensuring the number is between 1 and 7

	//Multiple Sequence Alignment
	msaMethod: z.enum(['muscle', 'clustalo', 'mafft']).optional(),
	muscle_iters: z.number().min(0).optional(),

	//Outlier Detection
	odseq_distance_metric: z.enum(['linear', 'affine']).optional(),
	odseq_bootstrap_replicates: z.number().min(0).optional(),
	odseq_threshold: z.number().min(0).optional(),

	//Subsampling (Rarefaction)
	core_sampling_depth: z.number().min(0).optional(),
	alpha_max_depth: z.number().min(0).optional(),

	//Beta Group Significance
	beta_group_column: z.string().optional(),
	beta_group_method: z.enum(['permanova', 'anosim', 'permdisp']).optional(),
	beta_group_pairwise: z.enum(['--p-no-pairwise', '--p-pairwise']).optional(),

	//Deicode Beta Diversity
	deicode_min_sample_count: z.number().min(0).optional(),
	deicode_min_feature_count: z.number().min(0).optional(),
	deicode_min_feature_frequency: z.number().min(0).max(100).optional(),
	deicode_max_iterations: z.number().min(1).optional(),
	deicode_num_features: z.number().min(1).optional(),

	//Report Theme
	report_theme: z.enum(['github', 'gothic', 'newsprint', 'night', 'pixyll', 'whitey']).optional(),

	//Filtering
	filtering_election: z.enum(['unfiltered', 'filtered']).optional(),

	//Threads
	dada2pe_threads: z.number().min(1).max(8).optional(),
	dada2se_threads: z.number().min(1).max(8).optional(),
	deblur_threads: z.number().min(1).max(8).optional(),
	alignment_threads: z.number().min(1).max(8).optional(),
	feature_classifier_threads: z.number().min(1).max(8).optional(),
	phylogeny_fasttree_threads: z.number().min(1).max(8).optional(),
	diversity_core_metrics_phylogenetic_threads: z.number().min(1).max(8).optional(),
	other_threads: z.number().min(1).max(8).optional(),

	//Metadata File Field
	metadataFile: z.custom<FileList | Buffer>((data) => {
		return typeof window === 'undefined' ? data instanceof Buffer : data instanceof FileList // Check if on client/server for NextJS
	}).optional()
});

export type SchemaData = z.infer<typeof schema>;