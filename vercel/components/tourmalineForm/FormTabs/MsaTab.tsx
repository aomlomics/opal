import { FieldErrors } from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function MsaTab({ register, errors, selectedMsaMethod }: {
	register: any, 
	errors: FieldErrors<any>,
	selectedMsaMethod: "muscle" | "clustalo" | "mafft"
}) 
{
	return(
	<div>
	<div className="space-y-4 p-1 flex items-center">
		<label className="form-control w-2/3 max-w-xs">
			<span className="label-text">Multiple Sequence Alignment Method</span>
				<select {...register('msaMethod')} className={`select select-bordered w-full ${errors.msaMethod && "select-error"}`}>
					<option value="">Select Alignment Method</option>
					<option value="muscle">Muscle</option>
					<option value="clustalo">Clustal Omega</option>
					<option value="mafft">MAFFT</option>
				</select>
		</label>
			<InfoButton infoText="More information about MSA Method"/>
	</div>

	{selectedMsaMethod === 'muscle' && (
	<div className="space-y-4 p-1">
		<label className="form-control w-2/3 max-w-xs">
			<span className="label-text">Muscle Iterations</span>
			<div className="relative w-full">
				<input {...register('muscle_iters')} type="text" placeholder="Enter iterations" className="input input-bordered w-full pr-8"/>
				<div className="absolute inset-y-0 right-0 flex items-center pr-2">
					<InfoButton infoText="More information about Muscle Iterations"/>
				</div>
			</div>
		</label>
	</div>
	)}
</div>
	)
}