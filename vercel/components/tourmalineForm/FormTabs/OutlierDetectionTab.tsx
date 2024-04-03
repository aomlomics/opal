import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function OutlierDetectionTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1">
				<label className="form-control relative max-w-xs">
					<div className="label pb-0">
						<span className="label-text">Distance Metric</span>
						<span className="label-text-alt">
							<InfoButton infoText="Indicating the type of distance metric to be computed."/>
						</span>
					</div>
					<select {...register('odseq_distance_metric')} className={`select select-bordered w-full ${errors.odseq_distance_metric && "select-error"}`}>
						<option value="" disabled selected>Select Distance Metric</option>
						<option value="linear">Linear</option>
						<option value="affine">Affine</option>
					</select>
				</label>
			</div>

			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Bootstrap Replicates</span>
						<span className="label-text-alt">
							<InfoButton infoText="The number of bootstrap replicates to be run. The higher the more robust the detection should be."/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('odseq_bootstrap_replicates')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>

			<div className="space-y-4 p-1">
				<label className="form-control max-w-xs relative">
					<div className="label pb-0">
						<span className="label-text">Threshold</span>
						<span className="label-text-alt">
							<InfoButton infoText="The probability to be left at the right of the bootstrap scores distribution when computing outliers. This parameter may need some tuning depending on each specific problem."/>
						</span>
					</div>
					<div className="relative w-full">
						<input {...register('odseq_threshold')} placeholder="Enter length" className="input input-bordered w-full"/>
					</div>
				</label>
			</div>
		</div>
	)
}