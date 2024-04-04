import { FieldErrors } from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function MsaTab({ register, errors, selectedMsaMethod }: {
	register: any,
	errors: FieldErrors<any>,
	selectedMsaMethod: "muscle" | "clustalo" | "mafft"
}) {
	return (
		<div>
			<div className="space-y-4 p-1 flex items-center">
				<label className="form-control w-2/3 max-w-xs">
					<div className="label pb-0">
						<span className="label-text">Multiple Sequence Alignment Method</span>
						<span className="label-text-alt">
							<InfoButton infoText="'Muscle': https://drive5.com/muscle/    'Clustal Omega': http://www.clustal.org    'Mafft': Perform de novo multiple sequence alignment using MAFFT."/>
						</span>
					</div>
					<select {...register('msaMethod')} className={`select select-bordered w-full ${errors.msaMethod && "select-error"}`}>
						<option value="" disabled selected>Select Alignment Method</option>
						<option value="muscle">Muscle</option>
						<option value="clustalo">Clustal Omega</option>
						<option value="mafft">MAFFT</option>
					</select>
				</label>
			</div>

			{selectedMsaMethod === 'muscle' && (
				<div className="space-y-4 p-1 flex items-center">
					<label className="form-control w-2/3 max-w-xs">
						<div className="label pb-0">
							<span className="label-text">Alignment Muscle Iterations</span>
							<span className="label-text-alt">
								<InfoButton infoText="Number of refinement iterations."/>
							</span>
						</div>
						<input {...register('muscle_iters')} type="text" placeholder="Enter iterations" className="input input-bordered w-full"/>
					</label>
				</div>
			)}
		</div>
	);
}