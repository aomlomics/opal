"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getRemoteUrl } from '@/helpers/utils';

// Define the form schema using Zod
const schema = z.object({
  denoiseMethod: z.enum(['DADA2 paired-end', 'DADA2 single-end', 'Deblur single-end']),
});

type FormData = z.infer<typeof schema>;

export default function TourmalineForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      // Dynamically add form data fields to FormData
      // Should be able to work when I have more fields later on
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-center">
        <label htmlFor="denoiseMethod" className="mb-2 text-lg text-gray-700">Choose a Denoise method:</label>
        <div className="relative inline-block w-full text-gray-700">
          <select
            {...register('denoiseMethod')}
            id="denoiseMethod"
            className="appearance-none bg-white border border-gray-300 w-full py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="DADA2 paired-end">DADA2 paired-end</option>
            <option value="DADA2 single-end">DADA2 single-end</option>
            <option value="Deblur single-end">Deblur single-end</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 010 1.414L4.586 9l4 4 4-4-.707-.707L9 10.586 5.707 7.293a1 1 0 010-1.414z"/></svg>
          </div>
        </div>
        {errors.denoiseMethod && <p className="text-red-500 text-xs italic">{errors.denoiseMethod.message}</p>}
      </div>

      <div className="flex justify-center">
        <button type="submit" className="btn bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
          Submit
        </button>
      </div>
    </form>
  );
};