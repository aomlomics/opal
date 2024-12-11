'use client';

import { useState, useEffect } from 'react';

type Step = {
  label: string;
  isComplete: boolean;
  isActive: boolean;
  hasFile: boolean;
};

export default function FileUploadProgress({ 
  fileStates,
  isSubmitting,
  isSuccess,
  isError 
}: { 
  fileStates: Record<string, File | null>;  // tracks if each file input has a file
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
}) {
  const steps: Step[] = [
    { label: 'Project File', isComplete: false, isActive: false, hasFile: !!fileStates.projectFile },
    { label: 'Samples File', isComplete: false, isActive: false, hasFile: !!fileStates.samplesFile },
    { label: 'Library File', isComplete: false, isActive: false, hasFile: !!fileStates.libraryFile },
    { label: 'Submission', isComplete: isSuccess, isActive: isSubmitting, hasFile: true }
  ];

  return (
    <div className="flex flex-col items-center h-full gap-2">
      {steps.map((step, index) => (
        <div key={step.label} className="flex flex-col items-center">
          {/* Circle */}
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center border-2
            ${isError ? 'border-error bg-error/10' :
              step.isComplete ? 'border-success bg-success text-white' :
              step.isActive ? 'border-warning animate-pulse' :
              step.hasFile ? 'border-primary' : 'border-base-300'}
          `}>
            {isSubmitting && step.isActive ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : step.isComplete ? (
              '✓'
            ) : (
              index + 1
            )}
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div className={`
              w-0.5 h-8 mt-1 mb-1
              ${isError ? 'bg-error/50' :
                step.isComplete ? 'bg-success' : 'bg-base-300'}
            `} />
          )}
        </div>
      ))}
    </div>
  );
} 