import {FieldErrors} from 'react-hook-form/dist/types/errors';
import InfoButton from '@/components/tourmalineForm/InfoButton';

export default function BetaGroupTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
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
						<option value="" disabled selected>Select Beta Group Method</option>
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
						<option value="" disabled selected>Select Beta Group Pairwise</option>
						<option value="--p-no-pairwise">No Pairwise (--p-no-pairwise)</option>
						<option value="--p-pairwise">Pairwise (--p-pairwise)</option>
					</select>
				</label>
				<InfoButton infoText="More information about Beta Group Pairwise"/>
			</div>
		</div>	
	)
}