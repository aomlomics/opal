"use client"

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getRemoteUrl } from '@/helpers/utils';

// Define the form schema using Zod
const schema = z.object({
  denoiseMethod: z.enum(['DADA2 paired-end', 'DADA2 single-end', 'Deblur single-end']),
  taxonomicLevel: z.number().min(1).max(7), // Ensuring the number is between 1 and 7
});

type FormData = z.infer<typeof schema>;

export default function TourmalineForm() {
  const [activeTab, setActiveTab] = useState('Denoise'); // Initial active tab
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('denoiseMethod', data.denoiseMethod);
      if(data.taxonomicLevel !== undefined) { // Ensure taxonomicLevel is defined before appending
        formData.append('taxonomicLevel', data.taxonomicLevel.toString());
      }

      const response = await fetch(`${getRemoteUrl()}/tourmalineReceive`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <div className="tabs">
        <button className={activeTab === 'Denoise' ? 'active' : ''} onClick={() => setActiveTab('Denoise')}>Denoise</button>
        <button className={activeTab === 'Taxonomic Level' ? 'active' : ''} onClick={() => setActiveTab('Taxonomic Level')}>Taxonomic Level</button>
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
            {errors.denoiseMethod && <p className="text-red-500 text-xs italic">{errors.denoiseMethod.message}</p>}
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
        <div className="flex justify-center">
          <button type="submit" className="btn bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}