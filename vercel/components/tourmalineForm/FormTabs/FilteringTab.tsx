import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

// Filtering step will be significantly different once we decide how to implement it
export default function FilteringTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1">
				<label className="form-control relative max-w-xs">
					<div className="label pb-0">
						<span className="label-text">Filtering Selection</span>
						<span className="label-text-alt">
							<InfoButton infoText="More information about Filtering Selection"/>
						</span>
					</div>
					<select {...register('filtering_election')} className={`select select-bordered w-full ${errors.filtering_election && "select-error"}`}>
						<option value="" disabled selected>Select Filtering Selection</option>
						<option value="unfiltered">Unfiltered</option>
						<option value="filtered">Both: Filtered and Unfiltered</option>
					</select>
				</label>
			</div>
		</div>
	)
}