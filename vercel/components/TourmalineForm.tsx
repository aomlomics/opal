"use client"
/*
---TODO---

	- Have an Intro/Homepage/About page that explains the form, the options, and the process
	      - This page displays before the form appears
	- Have a seperate tab for submission. its slightly confusing from a UI perspective to have it
		on every page
	- Add explanations from Tourmaline container --help commands and config.yaml to info buttons
	- Add a title for each tab with a brief description of what the tab is for
	- IMPORTANT: Refine the constraints and error messaging
  - Filtering tab needs to be completed after discussions 
	- Potentially: abstract more things into their own components  

*/

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getRemoteUrl } from '@/helpers/utils';
import { serialize } from 'object-to-formdata';
import InfoButton from '@/components/InfoButton';

// Define the form schema using Zod
const schema = z.object({
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

type SchemaData = z.infer<typeof schema>;



export default function TourmalineForm() {
	const [activeTab, setActiveTab] = useState('Denoise'); // Initial active tab
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { register, handleSubmit, formState: { isValid, errors }, watch, setValue } = useForm<SchemaData>({
    	resolver: zodResolver(schema),
    	mode: 'onChange',
			//All default values can be set here
			defaultValues: {
				//DADA2 Paired-end
				dada2pe_trunc_len_f: 240,
				dada2pe_trunc_len_r: 190,
				dada2pe_trim_left_f: 0,
				dada2pe_trim_left_r: 0,
				dada2pe_max_ee_f: 2,
				dada2pe_max_ee_r: 2,
				dada2pe_trunc_q: 2,
				dada2pe_pooling_method: 'independent',
				dada2pe_chimera_method: 'consensus',
				dada2pe_min_fold_parent_over_abundance: 1,
				dada2pe_n_reads_learn: 1000000,
				
				//DADA2 Single-end
				dada2se_trunc_len: 240,
				dada2se_trim_left: 0,
				dada2se_max_ee: 2,
				dada2se_trunc_q: 2,
				dada2se_pooling_method: 'independent',
				dada2se_chimera_method: 'consensus',
				dada2se_min_fold_parent_over_abundance: 1,
				dada2se_n_reads_learn: 1000000,

				//Deblur Single-end
				deblur_trim_length: 240,
				deblur_mean_error: 0.005,
				deblur_indel_prob: 0.01,
				deblur_indel_max: 3,
				deblur_min_reads: 10,
				deblur_min_size: 2,

				//Taxonomic Level
				taxClassMethod: 'consensus-vsearch',
				taxonomicLevel: 7,

				//Multiple Sequence Alignment
				msaMethod: 'muscle',
				muscle_iters: 100,

				//Outlier Detection
				odseq_distance_metric: 'linear',
				odseq_bootstrap_replicates: 100,
				odseq_threshold: 0.025,

				//Subsampling (Rarefaction)
				core_sampling_depth: 500,
				alpha_max_depth: 500,

				//Beta Group Significance
				beta_group_column: 'region',
				beta_group_method: 'permanova',
				beta_group_pairwise: '--p-pairwise',

				//Deicode Beta Diversity
				deicode_min_sample_count: 500,
				deicode_min_feature_count: 10,
				deicode_min_feature_frequency: 0,
				deicode_max_iterations: 5,
				deicode_num_features: 5,

				//Report Theme
				report_theme: 'github',

				//Filtering
				filtering_election: 'unfiltered',

				//Threads
				dada2pe_threads: 8,
				dada2se_threads: 8,
				deblur_threads: 8,
				alignment_threads: 8,
				feature_classifier_threads: 8,
				phylogeny_fasttree_threads: 8,
				diversity_core_metrics_phylogenetic_threads: 8,
				other_threads: 8,
			}
	});

	// Watch for changes to the denoiseMethod field
	const selectedDenoiseMethod = watch('denoiseMethod');
	//Watch for msaMethod to render the muscle_iters field
	const selectedMsaMethod = watch('msaMethod');

	//Function to render appropriate fields depending on denoiseMethod
		const renderDenoiseFields = () => {
		switch(selectedDenoiseMethod){
			case 'DADA2 paired-end':
				return(
					<>
						<div className="space-y-4 p-1">
							<div className="flex gap-x-4">
								<label className="form-control w-1/2 max-w-xs">
									<span className="label-text">Forward Truncation Length</span>
									<div className="relative w-full">
										<input {...register('dada2pe_trunc_len_f')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
										<div className="absolute inset-y-0 right-0 flex items-center pr-2">
											<InfoButton infoText="More information about Forward Truncation Length"/>
										</div>
									</div>
								</label>
								
								<label className="form-control w-1/2 max-w-xs">
									<span className="label-text">Reverse Truncation Length</span>
									<div className="relative w-full">
										<input {...register('dada2pe_trunc_len_r')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
										<div className="absolute inset-y-0 right-0 flex items-center pr-2">
											<InfoButton infoText="More information about Reverse Truncation Length"/>
										</div>
									</div>
								</label>
							</div>
						</div>
						
						<div className="space-y-4 p-1">
						<div className="flex gap-x-4">
						<label className="form-control w-1/2 max-w-xs relative">
							<span className="label-text">Forward Left Trim Length</span>
							<div className="relative w-full">
								<input {...register('dada2pe_trim_left_f')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2">
									<InfoButton infoText="More information about Forward Left Trim Length"/>
								</div>
							</div>
						</label>

						<label className="form-control w-1/2 max-w-xs relative">
							<span className="label-text">Forward Right Trim Length</span>
							<div className="relative w-full">
								<input {...register('dada2pe_trim_left_r')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2">
									<InfoButton infoText="More information about Forward Right Trim Length"/>
								</div>
							</div>
						</label>
						</div>
					</div>

					<div className="space-y-4 p-1">
						<div className="flex gap-x-4">
						<label className="form-control w-1/2 max-w-xs relative">
							<span className="label-text">Forward Max Expected Errors</span>
							<div className="relative w-full">
								<input {...register('dada2pe_max_ee_f')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2">
									<InfoButton infoText="More information about Forward Max Expected Errors"/>
								</div>
							</div>
						</label>

						<label className="form-control w-1/2 max-w-xs relative">
							<span className="label-text">Reverse Max Expected Errors</span>
							<div className="relative w-full">
								<input {...register('dada2pe_max_ee_r')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2">
									<InfoButton infoText="More information about Reverse Max Expected Errors"/>
								</div>
							</div>
						</label>
						</div>
					</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Truncation Quality Threshold</span>
								<div className="relative w-1/2">
									<input {...register('dada2pe_trunc_q')} placeholder="dada2pe_trunc_q" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Truncation Quality Threshold"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1 flex items-center">
  						<label className="form-control w-2/3 max-w-xs">
    						<span className="label-text">Pooling Method</span>
    						<select {...register('dada2pe_pooling_method')} className={`select select-bordered w-full ${errors.dada2pe_pooling_method && "select-error"}`}>
      						<option disabled value="">Select Pooling Method</option>
      						<option value="independent">Independent</option>
      						<option value="pseudo">Pseudo</option>
    						</select>
  						</label>
  						<InfoButton infoText="More information about Pooling Method"/>
						</div>
								
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Chimera Method</span>
								<select {...register('dada2pe_chimera_method')} className={`select select-bordered w-full ${errors.dada2pe_chimera_method && "select-error"}`}>
									<option disabled value="">Select Chimera Method</option>
									<option value="consensus">Consensus</option>
									<option value="none">None</option>
									<option value="pooled">Pooled</option>
								</select>
							</label>
							<InfoButton infoText="More information about Chimera Method"/>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Minimum Fold Parent Over Abundance</span>
								<div className="relative w-1/2">
									<input {...register('dada2se_trunc_len')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Minimum Fold Parent Over Abundance"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Number of Reads to Learn</span>
								<div className="relative w-1/2">
									<input {...register('dada2pe_n_reads_learn')} placeholder="dada2pe_n_reads_learn" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Number of Reads to Learn"/>
									</div>
								</div>							
							</label>
						</div>
					</>
				);


			case 'DADA2 single-end':
				return(
					<>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Truncation Length</span>
								<div className="relative w-1/2">
									<input {...register('dada2se_trunc_len')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Truncation Length"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Trim Left</span>
								<div className="relative w-1/2">
									<input {...register('dada2se_trim_left')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Trim Left"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Max Expected Errors</span>
								<div className="relative w-1/2">
									<input {...register('dada2se_max_ee')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Max Expected Errors"/>
									</div>
								</div>
							</label>
						</div>
						
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Truncation Quality Threshold</span>
								<div className="relative w-1/2">
									<input {...register('dada2se_trunc_q')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Truncation Quality Threshold"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Pooling Method</span>
								<select {...register('dada2se_pooling_method')} className={`select select-bordered w-full ${errors.dada2se_pooling_method && "select-error"}`}>
										<option disabled value="">Select Pooling Method</option>
										<option value="independent">Independent</option>
										<option value="pseudo">Pseudo</option>
									</select>
							</label>
							<InfoButton infoText="More information about Pooling Method"/>
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Chimera Method</span>
								<select {...register('dada2se_chimera_method')} className={`select select-bordered w-full ${errors.dada2se_chimera_method && "select-error"}`}>
										<option disabled value="">Select Chimera Method</option>
										<option value="consensus">Consensus</option>
										<option value="none">None</option>
										<option value="pooled">Pooled</option>
									</select>
							</label>
							<InfoButton infoText="More information about Chimera Method"/>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Minimum Fold Parent Over Abundance</span>
								<div className="relative w-1/2">
									<input {...register('dada2se_min_fold_parent_over_abundance')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Minimum Fold Parent Over Abundance"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Number of Reads to Learn</span>
								<div className="relative w-1/2">
									<input {...register('dada2se_n_reads_learn')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Number of Reads to Learn"/>
									</div>
								</div>
							</label>
						</div>
					</>
				);

			case 'Deblur single-end':
				return(
					<>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Trim Length</span>
								<div className="relative w-1/2">
									<input {...register('deblur_trim_length')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Trim Length"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Mean Error</span>
								<div className="relative w-1/2">
									<input {...register('deblur_mean_error')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Mean Error"/>
									</div>
								</div>
							</label>
						</div>
						
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Indel Probability</span>
								<div className="relative w-1/2">
									<input {...register('deblur_indel_prob')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Indel Probability"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Indel Max</span>
								<div className="relative w-1/2">
									<input {...register('deblur_indel_max')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Indel Max"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Minimum Reads</span>
								<div className="relative w-1/2">
									<input {...register('deblur_min_reads')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Minimum Reads"/>
									</div>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Minimum Size</span>
								<div className="relative w-1/2">
									<input {...register('deblur_min_size')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Minimum Size"/>
									</div>
								</div>
							</label>
						</div>
					</>
				);
			default:
				return null;
		}
	}


	// Manually register the file input field for metadata file
	// React.useEffect(() => {
	// register('metadataFile');
	// }, [register]);

	async function onSubmit(data: SchemaData) {
		console.log(data)
		const body = serialize(data) // convert SchemaData object to FormData
		// formData.append('denoiseMethod', data.denoiseMethod); // Append denoiseMethod to FormData
		// if(data.taxonomicLevel !== undefined) { // Ensure taxonomicLevel is defined before appending
		//   formData.append('taxonomicLevel', data.taxonomicLevel.toString()); // Convert taxonomicLevel to string and append
		// }

		// Append metadata file to FormData if it exists
		// if (data.metadataFile) {
		//   formData.append('metadataFile', data.metadataFile[0]); // Append the first file in the metadataFile FileList
		// }

		try {
			const response = await fetch(`${getRemoteUrl()}/tourmalineReceive`, {
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data"
				},
				body // Send the FormData object as the body of the request
			});

			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`);
			}

			setFormSubmitted(true); // Indicate the form has been submitted successfully
			const result = await response.json();
			console.log(result); // Log the server response
		} catch (error) {
			console.error('Submission error:', error); // Log any errors
			setFormSubmitted(false); // Optionally reset formSubmitted to allow resubmission
		}
  	};

	return (
		<div className="flex w-full bg-neutral rounded-2xl">
							<ul className="menu bg-white w-1/4 rounded-2xl"> 
									<li className={activeTab === 'Denoise' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Denoise')}>Denoise</a>
									</li>
									<li className={activeTab === 'Taxonomic Level' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Taxonomic Level')}>Taxonomic Level</a>
									</li>
									<li className={activeTab === 'Multiple Sequence Alignment' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Multiple Sequence Alignment')}>Multiple Sequence Alignment</a>
									</li>
									<li className={activeTab === 'Outlier Detection' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Outlier Detection')}>Outlier Detection</a>
									</li>
									<li className={activeTab === 'Subsampling (Rarefaction)' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Subsampling (Rarefaction)')}>Subsampling (Rarefaction)</a>
									</li>
									<li className={activeTab === 'Beta Group Significance' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Beta Group Significance')}>Beta Group Significance</a>
									</li>
									<li className={activeTab === 'Deicode Beta Diversity' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Deicode Beta Diversity')}>Deicode Beta Diversity</a>
									</li>
									<li className={activeTab === 'Report Theme' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Report Theme')}>Report Theme</a>
									</li>
									<li className={activeTab === 'Filtering' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Filtering')}>Filtering</a>
									</li>
									<li className={activeTab === 'Threads' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Threads')}>Threads</a>
									</li>
									<li className={activeTab === 'Metadata' ? 'bg-secondary text-white rounded-2xl' : ''}>
											<a onClick={() => setActiveTab('Metadata')}>Metadata</a>
									</li>
							</ul>
				<div className="flex-grow p-1 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
				{activeTab === 'Denoise' && (
					<div>
						<select
							{...register('denoiseMethod')}
							id="denoiseMethod"
							// className="appearance-none bg-white border border-gray-300 w-full py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							className={`select w-full max-w-xs ${errors.denoiseMethod && "select-error"}`}
						>
							<option value="DADA2 paired-end">DADA2 paired-end</option>
							<option value="DADA2 single-end">DADA2 single-end</option>
							<option value="Deblur single-end">Deblur single-end</option>
						</select>

						{/* Conditionally render fields based on denoiseMethod */}
						{renderDenoiseFields()}

						<div className="label">
							<span className="label-text-alt"></span>
							<span className="label-text-alt text-red-500">
								{errors.denoiseMethod && "Please select a denoise method"}
							</span>
						</div>
					</div>
				)}
				{activeTab === 'Taxonomic Level' && (
					<div>
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Taxonomic Classifier Method</span>
								<select {...register('taxClassMethod')} className={`select select-bordered w-full ${errors.taxClassMethod && "select-error"}`}>
									<option disabled value="">Select Classifier Method</option>
									<option value="naive-bayes">Naive Bayes</option>
									<option value="consensus-blast">BLAST </option>
									<option value="consensus-vsearch">VSearch</option>
								</select>
							</label>
							<InfoButton infoText="More information about Taxonomic Classification Method"/>
						</div>

						<div className="space-y-4 p-1 flex items-center">
  						<label className="form-control w-2/3 max-w-xs">
    						<span className="label-text">Taxonomic Level</span>
    						<select {...register('taxonomicLevel')} id="taxonomicLevel" className={`select select-bordered w-full ${errors.taxonomicLevel && "select-error"}`}>
      						<option value="" disabled>Select Level</option>
      							{Array(7).fill(null).map((_, i) => (
        					<option key={i+1} value={i+1}>{i+1}</option>
      							))}
    						</select>
  						</label>
 								<InfoButton infoText="More information about Taxonomic Level"/>
  						<div className="label">
    						<span className="label-text-alt text-red-500">
      						{errors.taxonomicLevel && "Please select an option"}
    						</span>
  						</div>
						</div>
					</div>
				)}
				{activeTab === 'Multiple Sequence Alignment' && (
					<div>
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Multiple Sequence Alignment Method</span>
									<select {...register('msaMethod')} className={`select select-bordered w-full ${errors.msaMethod && "select-error"}`}>
										<option value="">Select Alignment Method</option>
										<option value="muscle">Muscle</option>
										<option value="clustalo">Clustal Omega</option>
										<option value="mafft">MAFFT</option>
									</select>
							</label>
								<InfoButton infoText="More information about MSA Method"/>
						</div>
							
						{selectedMsaMethod === 'muscle' && (
  					<div className="space-y-4 p-1">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Muscle Iterations</span>
								<div className="relative w-full">
									<input {...register('muscle_iters')} type="text" placeholder="Enter iterations" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Muscle Iterations"/>
									</div>
								</div>
							</label>
						</div>
						)}
  				</div>
				)}
				{activeTab === 'Outlier Detection' && (
					<div>
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">Distance Metric</span>
								<select {...register('odseq_distance_metric')} className={`select select-bordered w-full ${errors.odseq_distance_metric && "select-error"}`}>
									<option value="">Select Distance Metric</option>
									<option value="linear">Linear</option>
									<option value="affine">Affine</option>
								</select>
							</label>
							<InfoButton infoText="More information about Distance Metric"/>
						</div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Bootstrap Replicates</span>
								<div className="relative w-1/2">
									<input {...register('odseq_bootstrap_replicates')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Bootstrap Replicates"/>
									</div>
								</div>
							</label>
						</div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Threshold</span>
								<div className="relative w-1/2">
									<input {...register('odseq_threshold')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Threshold"/>
									</div>
								</div>
							</label>
						</div>
					</div>
				)}
				{activeTab === 'Subsampling (Rarefaction)' && (
					<div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Core Sampling Depth</span>
								<div className="relative w-3/4">
									<input {...register('core_sampling_depth')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Core Sampling Depth"/>
									</div>
								</div>
							</label>
						</div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Alpha Max Depth</span>
								<div className="relative w-3/4">
									<input {...register('alpha_max_depth')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Alpha Max Depth"/>
									</div>
								</div>
							</label>
						</div>
					</div>
				)}
				{activeTab === 'Beta Group Significance' && (
					<div>
						<div className="space-y-4 p-1">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Beta Group Column</span>
								<div className="relative w-full">
									<input {...register('beta_group_column')} type="text" placeholder="Enter column name" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Beta Group Column"/>
									</div>
								</div>
								<label className="label">
									<span className="label-text-alt text-red-500">Warning: The column name must match the desired column in your metadata file EXACTLY.</span>
								</label>
							</label>
						</div>
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Beta Group Method</span>
								<select {...register('beta_group_method')} className={`select select-bordered w-full ${errors.beta_group_method && "select-error"}`}>
									<option value="">Select Beta Group Method</option>
									<option value="permanova">Permanova</option>
									<option value="anosim">Anosim</option>
									<option value="permdisp">Permdisp</option>
								</select>
							</label>
							<InfoButton infoText="More information about Beta Group Method"/>
						</div>
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Beta Group Pairwise</span>
								<select {...register('beta_group_pairwise')} className={`select select-bordered w-full ${errors.beta_group_pairwise && "select-error"}`}>
									<option value="">Select Beta Group Pairwise</option>
									<option value="--p-no-pairwise">No Pairwise (--p-no-pairwise)</option>
									<option value="--p-pairwise">Pairwise (--p-pairwise)</option>
								</select>
							</label>
							<InfoButton infoText="More information about Beta Group Pairwise"/>
						</div>
					</div>
				)}
				{activeTab === 'Deicode Beta Diversity' && (
					<div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Minimum Sample Count</span>
								<div className="relative w-3/4">
									<input {...register('deicode_min_sample_count')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Minimum Sample Count"/>
									</div>
								</div>
							</label>
						</div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Minimum Feature Count</span>
								<div className="relative w-3/4">
									<input {...register('deicode_min_feature_count')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Minimum Feature Count"/>
									</div>
								</div>
							</label>
						</div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Minimum Feature Frequency</span>
								<div className="relative w-3/4">
									<input {...register('deicode_min_feature_frequency')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Minimum Feature Frequency"/>
									</div>
								</div>
							</label>
						</div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Maximum Iterations</span>
								<div className="relative w-3/4">
									<input {...register('deicode_max_iterations')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Maximum Iterations"/>
									</div>
								</div>
							</label>
						</div>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<span className="label-text">Number of Features</span>
								<div className="relative w-3/4">
									<input {...register('deicode_num_features')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2">
										<InfoButton infoText="More information about Number of Features"/>
									</div>
								</div>
							</label>
						</div>
					</div>
				)}
				{activeTab === 'Report Theme' && (
					<div>
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Report Theme</span>
								<select {...register('report_theme')} className={`select select-bordered w-full ${errors.report_theme && "select-error"}`}>
									<option value="">Select Report Theme</option>
									<option value="github">Github</option>
									<option value="gothic">Gothic</option>
									<option value="newsprint">Newsprint</option>
									<option value="night">Night</option>
									<option value="pixyll">Pixyll</option>
									<option value="whitey">Whitey</option>
								</select>
							</label>
							<InfoButton infoText="More information about Report Theme"/>
						</div>
					</div>
				)}
				{/* Filtering tab structure is still under discussion */}
				{activeTab === 'Filtering' && (
					<div>
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Filtering Selection</span>
								<select {...register('filtering_election')} className={`select select-bordered w-full ${errors.filtering_election && "select-error"}`}>
									<option value="">Select Filtering Selection</option>
									<option value="unfiltered">Unfiltered</option>
									<option value="filtered">Both: Filtered and Unfiltered</option>
								</select>
							</label>
							<InfoButton infoText="More information about Filtering Selection"/>
						</div>
					</div>
				)}
				{activeTab === 'Threads' && (
					//write me the 8 fields for threads
					<div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">DADA2 Paired-end Threads</span>
								<select {...register('dada2pe_threads')} className={`select select-bordered w-full ${errors.dada2pe_threads && "select-error"}`}>
									<option value="" disabled>Select the Number of Threads</option>
									{Array.from({ length: 8 }, (_, i) => (
										<option key={i+1} value={i+1}>{i+1}</option>
									))}
								</select>
							</label>
							<InfoButton infoText="More information about DADA2 Paired-end Threads"/>
							{errors.dada2pe_threads && (
								<div className="label">
									<span className="label-text-alt text-red-500">
										Please select an option
									</span>
								</div>
							)}
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">DADA2 Single-end Threads</span>
								<select {...register('dada2se_threads')} className={`select select-bordered w-full ${errors.dada2se_threads && "select-error"}`}>
									<option value="" disabled>Select the Number of Threads</option>
									{Array.from({ length: 8 }, (_, i) => (
										<option key={i+1} value={i+1}>{i+1}</option>
									))}
								</select>
							</label>
							<InfoButton infoText="More information about DADA2 Paired-end Threads"/>
							{errors.dada2pe_threads && (
								<div className="label">
									<span className="label-text-alt text-red-500">
										Please select an option
									</span>
								</div>
							)}
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">Deblur Threads</span>
								<select {...register('deblur_threads')} className={`select select-bordered w-full ${errors.deblur_threads && "select-error"}`}>
									<option value="" disabled>Select the Number of Threads</option>
									{Array.from({ length: 8 }, (_, i) => (
										<option key={i+1} value={i+1}>{i+1}</option>
									))}
								</select>
							</label>
							<InfoButton infoText="More information about DADA2 Paired-end Threads"/>
							{errors.dada2pe_threads && (
								<div className="label">
									<span className="label-text-alt text-red-500">
										Please select an option
									</span>
								</div>
							)}
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">Alignment Threads</span>
								<select {...register('alignment_threads')} className={`select select-bordered w-full ${errors.alignment_threads && "select-error"}`}>
									<option value="" disabled>Select the Number of Threads</option>
									{Array.from({ length: 8 }, (_, i) => (
										<option key={i+1} value={i+1}>{i+1}</option>
									))}
								</select>
							</label>
							<InfoButton infoText="More information about DADA2 Paired-end Threads"/>
							{errors.dada2pe_threads && (
								<div className="label">
									<span className="label-text-alt text-red-500">
										Please select an option
									</span>
								</div>
							)}
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">Feature Classifier Threads</span>
								<select {...register('feature_classifier_threads')} className={`select select-bordered w-full ${errors.feature_classifier_threads && "select-error"}`}>
									<option value="" disabled>Select the Number of Threads</option>
									{Array.from({ length: 8 }, (_, i) => (
										<option key={i+1} value={i+1}>{i+1}</option>
									))}
								</select>
							</label>
							<InfoButton infoText="More information about DADA2 Paired-end Threads"/>
							{errors.dada2pe_threads && (
								<div className="label">
									<span className="label-text-alt text-red-500">
										Please select an option
									</span>
								</div>
							)}
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">Phylogeny FastTree Threads</span>
								<select {...register('phylogeny_fasttree_threads')} className={`select select-bordered w-full ${errors.phylogeny_fasttree_threads && "select-error"}`}>
									<option value="" disabled>Select the Number of Threads</option>
									{Array.from({ length: 8 }, (_, i) => (
										<option key={i+1} value={i+1}>{i+1}</option>
									))}
								</select>
							</label>
							<InfoButton infoText="More information about DADA2 Paired-end Threads"/>
							{errors.dada2pe_threads && (
								<div className="label">
									<span className="label-text-alt text-red-500">
										Please select an option
									</span>
								</div>
							)}
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">Diversity Core Metrics Phylogenetic Threads</span>
								<select {...register('diversity_core_metrics_phylogenetic_threads')} className={`select select-bordered w-full ${errors.diversity_core_metrics_phylogenetic_threads && "select-error"}`}>
									<option value="" disabled>Select the Number of Threads</option>
									{Array.from({ length: 8 }, (_, i) => (
										<option key={i+1} value={i+1}>{i+1}</option>
									))}
								</select>
							</label>
							<InfoButton infoText="More information about DADA2 Paired-end Threads"/>
							{errors.dada2pe_threads && (
								<div className="label">
									<span className="label-text-alt text-red-500">
										Please select an option
									</span>
								</div>
							)}
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-1/2 max-w-xs">
								<span className="label-text">Other Threads</span>
								<select {...register('other_threads')} className={`select select-bordered w-full ${errors.other_threads && "select-error"}`}>
									<option value="" disabled>Select the Number of Threads</option>
									{Array.from({ length: 8 }, (_, i) => (
										<option key={i+1} value={i+1}>{i+1}</option>
									))}
								</select>
							</label>
							<InfoButton infoText="More information about DADA2 Paired-end Threads"/>
							{errors.dada2pe_threads && (
								<div className="label">
									<span className="label-text-alt text-red-500">
										Please select an option
									</span>
								</div>
							)}
						</div>
					</div>
				)}
				{activeTab === 'Metadata' && (
					<div>
						<div className="label">
							<span className="label-text">Upload Metadata (.tsv):</span>
						</div>
						<input
							type="file"
							{...register('metadataFile')}
							accept=".tsv"
							// onChange={(e) => setValue('metadataFile', e.target.files ? e.target.files : undefined)}
							className="file-input file-input-bordered w-full max-w-xs"
						/>
					</div>
				)}
				<div className="flex justify-center p-4">
					<button
						type="submit"
						//Removed isDirty check, because it doesn't work if you dont change initial value of Denoise rendered fields
						disabled={!isValid || formSubmitted} // Submit button is disabled based on form state and submission status
						// className={`mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${!isDirty || !isValid || formSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none text-white`}
						className="btn btn-secondary"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	</div>
	);
}