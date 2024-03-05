"use client"

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Avoid TypeScript form value errors with this:
interface FormValues {
  fastqSequences: File | null;
  /* You can use Filelist instead of file if you want to allow multiple files */
  metadata: File | null;
  manifestFile: File | null;
  refDatabase1: File | null;
  refDatabase2: File | null;
}

// Validation schema for the form fields using Yup (WIP)
const fileUploadSchema = Yup.object().shape({
  fastqSequences: Yup.mixed().required("FASTQ file is required"),
  metadata: Yup.mixed().required("Metadata file is required"),
  manifestFile: Yup.mixed().required("Manifest file is required"),
  refDatabase1: Yup.mixed().required("First reference database file is required"),
  refDatabase2: Yup.mixed().required("Second reference database file is required"),
});

const FileUploadForm: React.FC = () => {
  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const formData = new FormData();

    /*
    if (values.fastqSequences) {
      Array.from(values.fastqSequences).forEach(file => {
        formData.append('fastqSequences', file);
      });
    ^ Use something like this if multiple files per upload*/
    
    if (values.fastqSequences) formData.append('fastqSequences', values.fastqSequences);
    if (values.metadata) formData.append('metadata', values.metadata);
    if (values.manifestFile) formData.append('manifestFile', values.manifestFile);
    if (values.refDatabase1) formData.append('refDatabase1', values.refDatabase1);
    if (values.refDatabase2) formData.append('refDatabase2', values.refDatabase2);

    // Have not made API route yet, so this is a placeholder:
    try {
      const response = await fetch(`/api/tourmaline`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      console.log('Successfully uploaded data to Tourmaline Server', data);
    } catch (error) {
      console.error('Upload error:', error);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        fastqSequences: null,
        metadata: null,
        manifestFile: null,
        refDatabase1: null,
        refDatabase2: null,
      }}
      validationSchema={fileUploadSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label htmlFor="fastqSequences" className="flex justify-center block text-xl font-medium text-black-700">FASTQ Sequences</label>
            <input 
              id="fastqSequences" 
              name="fastqSequences" 
              type="file" 
              onChange={event => setFieldValue("fastqSequences", event.target.files ? event.target.files[0] : null)} 
              className="file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs" 
            />
          </div>

          <div>
            <label htmlFor="metadata" className="flex justify-center block text-xl font-medium text-black-700">Metadata</label>
            <input 
              id="metadata" 
              name="metadata" 
              type="file" 
              onChange={event => setFieldValue("metadata", event.target.files ? event.target.files[0] : null)} 
              className="file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs" 
            />
          </div>

          <div>
            <label htmlFor="manifestFile" className="flex justify-center block text-xl font-medium text-black-700">Manifest</label>
            <input 
              id="manifestFile" 
              name="manifestFile" 
              type="file" 
              onChange={event => setFieldValue("manifestFile", event.target.files ? event.target.files[0] : null)} 
              className="file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs" 
            />
          </div>

          <div>
            <label htmlFor="refDatabase1" className="flex justify-center block text-xl font-medium text-black-700">Reference Database Sequence File</label>
            <input 
              id="refDatabase1" 
              name="refDatabase1" 
              type="file" 
              onChange={event => setFieldValue("refDatabase1", event.target.files ? event.target.files[0] : null)} 
              className="file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs" 
            />
          </div>

          <div>
            <label htmlFor="refDatabase2" className="flex justify-center block text-xl font-medium text-black-700">Reference Database Taxonomy File</label>
            <input 
              id="refDatabase2" 
              name="refDatabase2" 
              type="file" 
              onChange={event => setFieldValue("refDatabase2", event.target.files ? event.target.files[0] : null)} 
              className="file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs" 
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" disabled={isSubmitting} className="btn btn-secondary">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FileUploadForm;