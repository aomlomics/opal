import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function OutlierDetectionTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1 flex items-center">
				<label className="form-control w-1/2 max-w-xs">
					<span className="label-text">Distance Metric</span>
					<select {...register('odseq_distance_metric')} className={`select select-bordered w-full ${errors.odseq_distance_metric && "select-error"}`}>
						<option value="" disabled selected>Select Distance Metric</option>
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
	)
}