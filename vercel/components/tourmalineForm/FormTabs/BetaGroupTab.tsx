import {FieldErrors} from 'react-hook-form/dist/types/errors';
import InfoButton from '@/components/tourmalineForm/InfoButton';

export default function BetaGroupTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1">
				<label className="form-control relative max-w-xs">
					<div className="label pb-0">
						<span className="label-text">Beta Group Column</span>
						<span className="label-text-alt">
							<InfoButton infoText="Metadata column to test beta group significance; this column must appear in the metadata file."/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('beta_group_column')} type="text" placeholder="Enter column name" className="input input-bordered w-full"/>
					</div>
					<label className="label">
						<span className="label-text-alt text-red-500">Warning: The column name must match the desired column in your metadata file EXACTLY.</span>
					</label>
				</label>
			</div>
			<div className="space-y-4 p-1">
				<label className="form-control relative max-w-xs">
					<div className="label pb-0">
						<span className="label-text">Beta Group Method</span>
						<span className="label-text-alt">
							<InfoButton infoText="Choose one of the available methods."/>
						</span>
					</div>
					<select {...register('beta_group_method')} className={`select select-bordered w-full ${errors.beta_group_method && "select-error"}`}>
						<option value="" disabled selected>Select Beta Group Method</option>
						<option value="permanova">Permanova</option>
						<option value="anosim">Anosim</option>
						<option value="permdisp">Permdisp</option>
					</select>
				</label>
			</div>

			<div className="space-y-4 p-1">
				<label className="form-control relative max-w-xs">
					<div className="label pb-0">
						<span className="label-text">Beta Group Pairwise</span>
						<span className="label-text-alt">
							<InfoButton infoText="Choosing '--p-pairwise' can significantly slow down performance speed."/>
						</span>
					</div>
					<select {...register('beta_group_pairwise')} className={`select select-bordered w-full ${errors.beta_group_pairwise && "select-error"}`}>
						<option value="" disabled selected>Select Beta Group Pairwise</option>
						<option value="--p-no-pairwise">No Pairwise (--p-no-pairwise)</option>
						<option value="--p-pairwise">Pairwise (--p-pairwise)</option>
					</select>
				</label>
			</div>
		</div>	
	)
}