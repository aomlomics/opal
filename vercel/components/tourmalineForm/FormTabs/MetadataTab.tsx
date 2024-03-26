import {FieldErrors} from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";

export default function MetadataTab({register, errors}: {
	register: any,
	errors: FieldErrors<any>
}) {
	return(
<div className="flex flex-col items-start">
  <span className="label-text mb-1">Upload Metadata (.tsv):</span>
  <div className="relative">
    <input
      type="file"
      {...register('metadataFile')}
      accept=".tsv"
      className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
    />
    <div className="absolute right-0 -translate-y-14 translate-x-5">
      <InfoButton infoText="More information about Metadata file"/>
    </div>
  </div>
</div>
	)
}