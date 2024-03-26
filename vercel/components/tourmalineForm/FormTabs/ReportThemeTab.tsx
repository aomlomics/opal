import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function ReportThemeTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1 flex items-center">
				<label className="form-control w-2/3 max-w-xs">
					<span className="label-text">Report Theme</span>
					<select {...register('report_theme')} className={`select select-bordered w-full ${errors.report_theme && "select-error"}`}>
						<option value="" disabled selected>Select Report Theme</option>
						<option value="github">Github</option>
						<option value="gothic">Gothic</option>
						<option value="newsprint">Newsprint</option>
						<option value="night">Night</option>
						<option value="pixyll">Pixyll</option>
						<option value="whitey">Whitey</option>
					</select>
				</label>
				<InfoButton infoText="More information about Report Theme"/>
			</div>
		</div>
	)
}