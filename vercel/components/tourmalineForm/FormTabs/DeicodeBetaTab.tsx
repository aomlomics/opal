import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function DeicodeBetaTab({register, errors}: {
	register: any, 
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Minimum Sample Count</span>
						<span className="label-text-alt">
							<InfoButton infoText="More information about Minimum Sample Count"/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('deicode_min_sample_count')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>

			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Minimum Feature Count</span>
						<span className="label-text-alt">
							<InfoButton infoText="More information about Minimum Feature Count"/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('deicode_min_feature_count')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>

			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Minimum Feature Frequency</span>
						<span className="label-text-alt">
							<InfoButton infoText="More information about Minimum Feature Frequency"/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('deicode_min_feature_frequency')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>

			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Maximum Iterations</span>
						<span className="label-text-alt">
							<InfoButton infoText="More information about Maximum Iterations"/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('deicode_max_iterations')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>

			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Number of Features</span>
						<span className="label-text-alt">
							<InfoButton infoText="More information about Number of Features"/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('deicode_num_features')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>
		</div>
	)
}