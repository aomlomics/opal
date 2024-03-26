import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function TaxonomicTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
	<div>
		<div className="space-y-4 p-1 flex items-center">
			<label className="form-control w-2/3 max-w-xs">
				<div className="label pb-0">
					<span className="label-text">Taxonomic Classifier Method</span>
					<span className="label-text-alt">
						<InfoButton infoText="More information about Taxonomic Classification Method"/>
					</span>
				</div>
				<select {...register('taxClassMethod')} className={`select select-bordered w-full ${errors.taxClassMethod && "select-error"}`}>
					<option disabled value="">Select Classifier Method</option>
					<option value="naive-bayes">Naive Bayes</option>
					<option value="consensus-blast">BLAST </option>
					<option value="consensus-vsearch">VSearch</option>
				</select>
			</label>
		</div>
		<div className="space-y-4 p-1 flex items-center">
			<label className="form-control w-2/3 max-w-xs">
				<div className="label pb-0">
					<span className="label-text">Taxonomic Level</span>
					<span className="label-text-alt">
						<InfoButton infoText="More information about Taxonomic Level"/>
					</span>
				</div>
					<select {...register('taxonomicLevel')} className={`select select-bordered w-full ${errors.taxonomicLevel && "select-error"}`}>
						<option value="" disabled>Select Level</option>
						{Array(7).fill(null).map((_, i) => (
							<option key={i+1} value={i+1}>{i+1}</option>
						))}
					</select>
					</label>
					{errors.taxonomicLevel && (
					<div className="label">
						<span className="label-text-alt text-red-500">
							Please select an option
						</span>
				</div>
			)}
		</div>
	</div>
	)
}
