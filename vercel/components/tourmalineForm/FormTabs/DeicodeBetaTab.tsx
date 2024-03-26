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
	)
}