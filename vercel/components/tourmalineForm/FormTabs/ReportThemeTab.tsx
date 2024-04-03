import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function ReportThemeTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="space-y-4 p-1">
				<label className="form-control relative max-w-xs">
					<div className="label pb-0">
						<span className="label-text">Report Theme</span>
						<span className="label-text-alt">
							<InfoButton infoText="Report theme for your HTML report."/>
						</span>
					</div>
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
			</div>
		</div>
	)
}