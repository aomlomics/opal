"use client"


/*
---TODO---
- Fix submit button enabling on tab switch
- Make the tabs look better (on the left side)
- Send file as well as the rest of the form data
- Have fields that load only if a certain option is selected,
	- i.e. if DADA2 paired-end is selected, show the fields for DADA2 paired-end

- Add fields until all configurations for Tourmaline are met

*/

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getRemoteUrl } from '@/helpers/utils';
import { serialize } from 'object-to-formdata';

// Define the form schema using Zod
const schema = z.object({
	denoiseMethod: z.enum(['DADA2 paired-end', 'DADA2 single-end', 'Deblur single-end']),
	taxonomicLevel: z.coerce.number().min(1).max(7).optional(), // Ensuring the number is between 1 and 7
	metadataFile: z.custom<FileList | Buffer>((data) => {
		return typeof window === 'undefined' ? data instanceof Buffer : data instanceof FileList // Check if on client/server for NextJS
	}).optional()
});

type SchemaData = z.infer<typeof schema>;

export default function TourmalineForm() {
	const [activeTab, setActiveTab] = useState('Denoise'); // Initial active tab
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { register, handleSubmit, formState: { isDirty, isValid, errors }, watch, setValue } = useForm<SchemaData>({
    	resolver: zodResolver(schema),
    	mode: 'onChange',
	});

	// Manually register the file input field for metadata file
	// React.useEffect(() => {
	// register('metadataFile');
	// }, [register]);

	async function onSubmit(data: SchemaData) {
		console.log(data)
		const body = serialize(data) // convert SchemaData object to FormData
		// formData.append('denoiseMethod', data.denoiseMethod); // Append denoiseMethod to FormData
		// if(data.taxonomicLevel !== undefined) { // Ensure taxonomicLevel is defined before appending
		//   formData.append('taxonomicLevel', data.taxonomicLevel.toString()); // Convert taxonomicLevel to string and append
		// }

		// Append metadata file to FormData if it exists
		// if (data.metadataFile) {
		//   formData.append('metadataFile', data.metadataFile[0]); // Append the first file in the metadataFile FileList
		// }

		try {
			const response = await fetch(`${getRemoteUrl()}/tourmalineReceive`, {
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data"
				},
				body // Send the FormData object as the body of the request
			});

			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`);
			}

			setFormSubmitted(true); // Indicate the form has been submitted successfully
			const result = await response.json();
			console.log(result); // Log the server response
		} catch (error) {
			console.error('Submission error:', error); // Log any errors
			setFormSubmitted(false); // Optionally reset formSubmitted to allow resubmission
		}
  	};

	return (
		<div>
			<div className="tabs">
				<button className={activeTab === 'Denoise' ? 'active' : ''} onClick={() => setActiveTab('Denoise')}>Denoise</button>
				<button className={activeTab === 'Taxonomic Level' ? 'active' : ''} onClick={() => setActiveTab('Taxonomic Level')}>Taxonomic Level</button>
				<button className={activeTab === 'Metadata' ? 'active' : ''} onClick={() => setActiveTab('Metadata')}>Metadata</button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{activeTab === 'Denoise' && (
					<div>
						<select
							{...register('denoiseMethod')}
							id="denoiseMethod"
							// className="appearance-none bg-white border border-gray-300 w-full py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							className={`select w-full max-w-xs ${errors.denoiseMethod && "select-error"}`}
						>
							<option value="DADA2 paired-end">DADA2 paired-end</option>
							<option value="DADA2 single-end">DADA2 single-end</option>
							<option value="Deblur single-end">Deblur single-end</option>
						</select>
						<div className="label">
							<span className="label-text-alt"></span>
							<span className="label-text-alt text-red-500">
								{errors.denoiseMethod && "Please select a denoise method"}
							</span>
						</div>
					</div>
				)}
				{activeTab === 'Taxonomic Level' && (
					<div>
						<div className="label">
							<span className="label-text">Taxonomic Level</span>
						</div>
						<select
							{...register('taxonomicLevel')}
							id="taxonomicLevel"
							defaultValue=""
							// className="appearance-none bg-white border border-gray-300 w-full py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							className={`select w-full max-w-xs ${errors.taxonomicLevel && "select-error"}`}
						>
							<option value="" disabled>Select Level</option>
							{Array(7).fill(0).map((_, i) => (
								<option key={i+1} value={i+1}>{i+1}</option>
							))}
						</select>
						<div className="label">
							<span className="label-text-alt"></span>
							<span className="label-text-alt text-red-500">
								{errors.taxonomicLevel && "Please select an option"}
							</span>
						</div>

					</div>
				)}
				{activeTab === 'Metadata' && (
					<div>
						<div className="label">
							<span className="label-text">Upload Metadata (.tsv):</span>
						</div>
						<input
							type="file"
							{...register('metadataFile')}
							accept=".tsv"
							// onChange={(e) => setValue('metadataFile', e.target.files ? e.target.files : undefined)}
							className="file-input file-input-bordered w-full max-w-xs"
						/>
					</div>
				)}
				<div className="flex justify-center">
					<button
						type="submit"
						disabled={!isDirty || !isValid || formSubmitted} // Submit button is disabled based on form state and submission status
						// className={`mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${!isDirty || !isValid || formSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none text-white`}
						className="btn btn-primary"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}