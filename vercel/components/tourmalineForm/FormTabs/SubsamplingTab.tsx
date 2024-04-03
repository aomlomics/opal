import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function SubsamplingTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Core Sampling Depth</span>
						<span className="label-text-alt">
							<InfoButton infoText="Subsampling depth for core diversity analyses."/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('core_sampling_depth')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>

			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Alpha Max Depth</span>
						<span className="label-text-alt">
							<InfoButton infoText="Maximum subsampling depth for alpha diversity rarefaction analysis."/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('alpha_max_depth')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>
		</div>
	)
}