import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function MetadataTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
		<div>
			<div className="label">
				<span className="label-text">Upload Metadata (.tsv):</span>
			</div>
			<input
				type="file"
				{...register('metadataFile')}
				accept=".tsv"
				// onChange={(e) => setValue('metadataFile', e.target.files ? e.target.files : undefined)}
				className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
			/>
		</div>
	)
}