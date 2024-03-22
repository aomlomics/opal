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
								<select {...register('dada2pe_chimera_method')} className={`select select-bordered w-full ${errors.dada2pe_pooling_method && "select-error"}`}>
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