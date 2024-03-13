"use client"


/*
---Code changes to be made---
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

// Define the form schema using Zod
const schema = z.object({
  denoiseMethod: z.enum(['DADA2 paired-end', 'DADA2 single-end', 'Deblur single-end']),
  taxonomicLevel: z.number().min(1).max(7).optional(), // Ensuring the number is between 1 and 7
  // metadataFile does not need to be in the Zod schema since it's handled separately for the file upload
});

type FormData = z.infer<typeof schema> & {
  metadataFile?: FileList;
};

export default function TourmalineForm() {
  const [activeTab, setActiveTab] = useState('Denoise'); // Initial active tab
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { register, handleSubmit, formState: { isDirty, isValid, errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  // Manually register the file input field for metadata file
  React.useEffect(() => {
    register('metadataFile');
  }, [register]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append('denoiseMethod', data.denoiseMethod); // Append denoiseMethod to FormData
    if(data.taxonomicLevel !== undefined) { // Ensure taxonomicLevel is defined before appending
      formData.append('taxonomicLevel', data.taxonomicLevel.toString()); // Convert taxonomicLevel to string and append
    }

    // Append metadata file to FormData if it exists
    if (data.metadataFile) {
      formData.append('metadataFile', data.metadataFile[0]); // Append the first file in the metadataFile FileList
    }

    try {
      const response = await fetch(`${getRemoteUrl()}/tourmalineReceive`, {
        method: "POST",
        body: formData, // Send the FormData object as the body of the request
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
            <label htmlFor="denoiseMethod" className="mb-2 text-lg text-gray-700">Choose a Denoise method:</label>
            <select
              {...register('denoiseMethod')}
              id="denoiseMethod"
              className="appearance-none bg-white border border-gray-300 w-full py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="DADA2 paired-end">DADA2 paired-end</option>
              <option value="DADA2 single-end">DADA2 single-end</option>
              <option value="Deblur single-end">Deblur single-end</option>
            </select>
            {errors.denoiseMethod && <p className="text-red-500 text-xs italic">Please select a denoise method.</p>}
          </div>
        )}
        {activeTab === 'Taxonomic Level' && (
          <div>
            <label htmlFor="taxonomicLevel" className="mb-2 text-lg text-gray-700">Taxonomic Level (1-7):</label>
            <input
              type="number"
              {...register('taxonomicLevel', {
                valueAsNumber: true,
                min: 1,
                max: 7,
              })}
              id="taxonomicLevel"
              className="appearance-none bg-white border border-gray-300 w-full py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            {errors.taxonomicLevel && <p className="text-red-500 text-xs italic">Please enter a number between 1 and 7.</p>}
          </div>
        )}
        {activeTab === 'Metadata' && (
          <div>
            <label htmlFor="metadataFile" className="mb-2 text-lg text-gray-700">Upload Metadata (.tsv):</label>
            <input
              type="file"
              {...register('metadataFile')}
              accept=".tsv"
              onChange={(e) => setValue('metadataFile', e.target.files ? e.target.files : undefined)}
              className="appearance-none bg-white border border-gray-300 w-full py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isDirty || !isValid || formSubmitted} // Submit button is disabled based on form state and submission status
            className={`mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${!isDirty || !isValid || formSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none text-white`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}