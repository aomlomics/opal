import { FieldErrors } from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function DenoiseMethodTab({ register, errors, selectedDenoiseMethod}: {
	register: any,
	errors: FieldErrors<any>,
	selectedDenoiseMethod: "DADA2 paired-end" | "DADA2 single-end" | "Deblur single-end"
}) {
	//Function to render appropriate fields depending on denoiseMethod
	function renderDenoiseFields() {
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
											<InfoButton infoText="Position at which forward read sequences should be truncated due to decrease in quality. This truncates the 3' end of the of the input sequences, which will be the bases that were sequenced in the last cycles. Reads that are shorter than this value will be discarded. After this parameter is applied there must still be at least a 12 nucleotide overlap between the forward and reverse reads. If 0 is provided, no truncation or length filtering will be performed"/>
										</div>
									</div>
								</label>

								<label className="form-control w-1/2 max-w-xs">
									<span className="label-text">Reverse Truncation Length</span>
									<div className="relative w-full">
										<input {...register('dada2pe_trunc_len_r')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
										<div className="absolute inset-y-0 right-0 flex items-center pr-2">
											<InfoButton infoText="Position at which reverse read sequences should be truncated due to decrease in quality. This truncates the 3' end of the of the input sequences, which will be the bases that were sequenced in the last cycles. Reads that are shorter than this value will be discarded. After this parameter is applied there must still be at least a 12 nucleotide overlap between the forward and reverse reads. If 0 is provided, no truncation or length filtering will be performed"/>
										</div>
									</div>
								</label>
							</div>
						</div>

						<div className="space-y-4 p-1">
						<div className="flex gap-x-4">
						<label className="form-control w-1/2 max-w-xs relative">
							<span className="label-text">Forward Read 5' Trimming Position</span>
							<div className="relative w-full">
								<input {...register('dada2pe_trim_left_f')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2">
									<InfoButton infoText="Position at which forward read sequences should be trimmed due to low quality. This trims the 5' end of the input sequences, which will be the bases that were sequenced in the first cycles."/>
								</div>
							</div>
						</label>

						<label className="form-control w-1/2 max-w-xs relative">
							<span className="label-text">Reverse Read 5' Trimming Position</span>
							<div className="relative w-full">
								<input {...register('dada2pe_trim_left_r')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2">
									<InfoButton infoText="Position at which reverse read sequences should be trimmed due to low quality. This trims the 5' end of the input sequences, which will be the bases that were sequenced in the first cycles."/>
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
									<InfoButton infoText="Forward reads with number of expected errors higher than this value will be discarded."/>
								</div>
							</div>
						</label>

						<label className="form-control w-1/2 max-w-xs relative">
							<span className="label-text">Reverse Max Expected Errors</span>
							<div className="relative w-full">
								<input {...register('dada2pe_max_ee_r')} placeholder="Enter length" className="input input-bordered w-full pr-8"/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2">
									<InfoButton infoText="Reverse reads with number of expected errors higher than this value will be discarded."/>
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
										<InfoButton infoText="Reads are truncated at the first instance of a quality score less than or equal to this value. If the resulting read is then shorter than `trunc-len-f` or `trunc-len-r` (depending on the direction of the read) it is discarded."/>
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
						<InfoButton infoText="The method used to pool samples for denoising. 'independent': Samples are denoised indpendently. 'pseudo': The pseudo-pooling method is used to approximate pooling of samples. In short, samples are denoised independently once, ASVs detected in at least 2 samples are recorded, and samples are denoised independently a second time, but this time with prior knowledge of the recorded ASVs and thus higher sensitivity to those ASVs."/>
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-2/3 max-w-xs">
								<span className="label-text">Chimera Method</span>
								<select {...register('dada2pe_chimera_method')} className={`select select-bordered w-full ${errors.dada2pe_pooling_method && "select-error"}`}>
									<option disabled value="">Select Chimera Method</option>
									<option value="consensus">Consensus</option>
									<option value="none">None</option>
									<option value="pooled">Pooled</option>
								</select>
							</label>
							<InfoButton infoText="The method used to remove chimeras. 'none': No chimera removal is performed. 'pooled': All reads are pooled prior to chimera detection. 'consensus': Chimeras are detected in samples individually, and sequences found chimeric in a sufficient fraction of samples are removed."/>
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

	return (
		<div>
			<select
				{...register('denoiseMethod')}
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
	);
};