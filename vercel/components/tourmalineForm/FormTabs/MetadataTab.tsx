import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function MetadataTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<label className="form-control w-full max-w-xs">
			<div className="label">
				<span className="label-text mb-1">Upload Metadata (.tsv):</span>
				<span className="label-text-alt">
					<InfoButton infoText="Visit the Tourmaline GitHub page for information and an example of an acceptable metadata file. Click 'Tourmaline' above."/>
				</span>
			</div>
			<input
				type="file"
				{...register('metadataFile')}
				accept=".tsv"
				className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
			/>
		</label>
	);
}