import { z } from 'zod';
import { intWithMin0, intWithMin1, numWithMin0, numWithMin1, numWithMinNeg1, numWithMin0Max100 } from '@/components/tourmalineForm/validationHelper';

// Define the form schema using Zod
export const schema = z.object({
	denoiseMethod: z.enum(['DADA2 paired-end', 'DADA2 single-end', 'Deblur single-end']),

	//Dynamically rendered fields based on denoiseMethod
	//DADA2 paired-end Fields:
	dada2pe_trunc_len_f: intWithMin0().optional(),
	dada2pe_trunc_len_r: intWithMin0().optional(),
	dada2pe_trim_left_f: intWithMin0().optional(),
	dada2pe_trim_left_r: intWithMin0().optional(),
	dada2pe_max_ee_f: numWithMin0().optional(),
	dada2pe_max_ee_r: numWithMin0().optional(),
	dada2pe_trunc_q: intWithMin0().optional(),
	dada2pe_pooling_method: z.enum(['independent', 'pseudo']).optional(),
	dada2pe_chimera_method: z.enum(['consensus', 'none', 'pooled']).optional(),
	dada2pe_min_fold_parent_over_abundance: numWithMin1().optional(),
	dada2pe_n_reads_learn: intWithMin0().optional(),

	//DADA2 Single-end Fields
	dada2se_trunc_len: intWithMin0().optional(),
	dada2se_trim_left: intWithMin0().optional(),
	dada2se_max_ee: numWithMin0().optional(),
	dada2se_trunc_q: intWithMin0().optional(),
	dada2se_pooling_method: z.enum(['independent', 'pseudo']).optional(),
	dada2se_chimera_method: z.enum(['consensus', 'none', 'pooled']).optional(),
	dada2se_min_fold_parent_over_abundance: numWithMin1().optional(),
	dada2se_n_reads_learn: intWithMin0().optional(),

	//Deblur Single-end Fields
	deblur_trim_length: numWithMinNeg1().optional(),
	//deblur_sample_stats: z.
	//Not sure how to handle these. Will consult Luke/Katherine soon
	deblur_mean_error: numWithMin0().optional(),
	deblur_indel_prob: numWithMin0().optional(),
	deblur_indel_max: intWithMin0().optional(),
	deblur_min_reads: intWithMin0().optional(),
	deblur_min_size: intWithMin0().optional(),

	//Taxonomic Level Fields
	taxClassMethod: z.enum(['naive-bayes', 'consensus-blast', 'consensus-vsearch']),
	taxonomicLevel: z.coerce.number().min(1).max(7), // Ensuring the number is between 1 and 7

	//Multiple Sequence Alignment
	msaMethod: z.enum(['muscle', 'clustalo', 'mafft']),
	muscle_iters: intWithMin0().optional(), //unsure what the restrictions of muscle_iters should be

	//Outlier Detection
	odseq_distance_metric: z.enum(['linear', 'affine']),
	odseq_bootstrap_replicates: intWithMin0(),
	odseq_threshold: numWithMin0(),

	//Subsampling (Rarefaction)
	core_sampling_depth: intWithMin0(),
	alpha_max_depth: intWithMin0(),

	//Beta Group Significance
	beta_group_column: z.string(),
	beta_group_method: z.enum(['permanova', 'anosim', 'permdisp']),
	beta_group_pairwise: z.enum(['--p-no-pairwise', '--p-pairwise']),

	//Deicode Beta Diversity
	deicode_min_sample_count: intWithMin0(),
	deicode_min_feature_count: intWithMin0(),
	deicode_min_feature_frequency: numWithMin0Max100(),
	deicode_max_iterations: intWithMin1(),
	deicode_num_features: intWithMin1(),

	//Report Theme
	report_theme: z.enum(['github', 'gothic', 'newsprint', 'night', 'pixyll', 'whitey']),

	//Filtering
	filtering_election: z.enum(['unfiltered', 'filtered']).optional(),

	//Threads
	/*
	dada2pe_threads: z.number().min(1).max(8).optional(),
	dada2se_threads: z.number().min(1).max(8).optional(),
	deblur_threads: z.number().min(1).max(8).optional(),
	alignment_threads: z.number().min(1).max(8).optional(),
	feature_classifier_threads: z.number().min(1).max(8).optional(),
	phylogeny_fasttree_threads: z.number().min(1).max(8).optional(),
	diversity_core_metrics_phylogenetic_threads: z.number().min(1).max(8).optional(),
	other_threads: z.number().min(1).max(8).optional(),
	*/

	//Metadata File Field
	metadataFile: z.custom<FileList | Buffer>((data) => {
		return typeof window === 'undefined' ? data instanceof Buffer : data instanceof FileList // Check if on client/server for NextJS
	}).optional()
});

export type SchemaData = z.infer<typeof schema>;