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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getRemoteUrl } from '@/helpers/utils';
import { serialize } from 'object-to-formdata';
import InfoButton from '@/components/tourmalineForm/InfoButton';
import { schema, SchemaData } from "@/components/tourmalineForm/schema";
import DenoiseMethodTab from './DenoiseMethodTab';
import ThreadsTab from './ThreadsTab';


export default function TourmalineForm() {
	const [activeTab, setActiveTab] = useState('Denoise'); // Initial active tab
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { register, handleSubmit, formState: { isValid, errors }, watch } = useForm<SchemaData>({
    	resolver: zodResolver(schema),
    	mode: 'onChange',
		//All default values can be set here
		defaultValues: {
			dada2pe_trunc_len_f: 240,
			dada2pe_trunc_len_r: 190,
			dada2pe_trim_left_f: 0,
			dada2pe_trim_left_r: 0,
			dada2pe_max_ee_f: 2,
			dada2pe_max_ee_r: 2,
			dada2pe_trunc_q: 2,
			dada2pe_pooling_method: "independent",
			dada2pe_chimera_method: "consensus",
			dada2pe_min_fold_parent_over_abundance: 1,
			dada2pe_n_reads_learn: 1000000,

			dada2se_trunc_len: 240,
			dada2se_trim_left: 0,
			dada2se_max_ee: 2,
			dada2se_trunc_q: 2,
			dada2se_pooling_method: "independent",
			dada2se_chimera_method: "consensus",
			dada2se_min_fold_parent_over_abundance: 1,
			dada2se_n_reads_learn: 1000000,

			deblur_trim_length: 240,
			deblur_mean_error: 0.005,
			deblur_indel_prob: 0.01,
			deblur_indel_max: 3,
			deblur_min_reads: 10,
			deblur_min_size: 2,

			taxClassMethod: "consensus-vsearch",
			taxonomicLevel: 7,

			msaMethod: "muscle",
			muscle_iters: 100,

			odseq_distance_metric: "linear",
			odseq_bootstrap_replicates: 100,
			odseq_threshold: 0.025,

			core_sampling_depth: 500,
			alpha_max_depth: 500,

			beta_group_column: "region",
			beta_group_method: "permanova",
			beta_group_pairwise: "--p-pairwise",

			deicode_min_sample_count: 500,
			deicode_min_feature_count: 10,
			deicode_min_feature_frequency: 0,
			deicode_max_iterations: 5,
			deicode_num_features: 5,

			report_theme: "github",

			filtering_election: "unfiltered",

			dada2pe_threads: 8,
			dada2se_threads: 8,
			deblur_threads: 8,
			alignment_threads: 8,
			feature_classifier_threads: 8,
			phylogeny_fasttree_threads: 8,
			diversity_core_metrics_phylogenetic_threads: 8,
			other_threads: 8
		}
	});

	// Watch for changes to the denoiseMethod field
	const selectedDenoiseMethod = watch('denoiseMethod');

	//Watch for msaMethod to render the muscle_iters field
	const selectedMsaMethod = watch('msaMethod');

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
					<DenoiseMethodTab
						register={register}
						errors={errors}
						selectedDenoiseMethod={selectedDenoiseMethod}
					></DenoiseMethodTab>
				)}
				{activeTab === 'Taxonomic Level' && (
					<div>
						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<div className="label pb-0">
									<span className="label-text">Taxonomic Classifier Method</span>
									<span className="label-text-alt">
										<InfoButton infoText="More information about Taxonomic Classification Method"/>
									</span>
								</div>
								<select {...register('taxClassMethod')} className={`select select-bordered w-full ${errors.taxClassMethod && "select-error"}`}>
									<option disabled value="">Select Classifier Method</option>
									<option value="naive-bayes">Naive Bayes</option>
									<option value="consensus-blast">BLAST </option>
									<option value="consensus-vsearch">VSearch</option>
								</select>
							</label>
						</div>

						<div className="space-y-4 p-1 flex items-center">
  						<label className="form-control w-2/3 max-w-xs">
    						<span className="label-text">Taxonomic Level</span>
    						<select {...register('taxonomicLevel')} className={`select select-bordered w-full ${errors.taxonomicLevel && "select-error"}`}>
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
					<ThreadsTab register={register} errors={errors}></ThreadsTab>
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