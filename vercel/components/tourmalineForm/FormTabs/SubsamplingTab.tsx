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
	)
}