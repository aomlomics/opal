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
							<InfoButton infoText="Minimum sum cutoff of sample across all features. The value can be at minimum zero and must be an whole integer. It is suggested to be greater than or equal to 500."/>
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
							<InfoButton infoText="Minimum sum cutoff of features across all samples. The value can be at minimum zero and must be an whole integer"/>
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
							<InfoButton infoText="Minimum percentage of samples a feature must appear with a value greater than zero. This value can range from 0 to 100 with decimal values allowed."/>
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
							<InfoButton infoText="The number of iterations to optimize the solution (suggested to be below 100; beware of overfitting)."/>
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
							<InfoButton infoText="Number of most important features (arrows) to display in the biplot ordination."/>
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