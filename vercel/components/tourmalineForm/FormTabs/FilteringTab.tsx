import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

// Filtering step will be significantly different once we decide how to implement it
export default function FilteringTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1 flex items-center">
				<label className="form-control w-2/3 max-w-xs">
					<span className="label-text">Filtering Selection</span>
					<select {...register('filtering_election')} className={`select select-bordered w-full ${errors.filtering_election && "select-error"}`}>
						<option value="" disabled selected>Select Filtering Selection</option>
						<option value="unfiltered">Unfiltered</option>
						<option value="filtered">Both: Filtered and Unfiltered</option>
					</select>
				</label>
				<InfoButton infoText="More information about Filtering Selection"/>
			</div>
		</div>
	)
}