import ProgressCircle from "./ProgressCircle";

export default function ProgressLine({ 
    fileStates,
    responseObj,
    errorObj,
    loading,
    steps,
    lineHeights
}: { 
    fileStates: Record<string, File | null>;
    responseObj: Record<string, string>;
    errorObj: Record<string, string>;
    loading: string;
    steps: Array<{id: string; label: string}>;
    lineHeights: string[];
}) {
    return (
        <div className="flex flex-col items-center h-full ml-12">
            {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                    {/* Circle container */}
                    <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center border-[2px]
                        ${errorObj.status ? 'border-error bg-error/10' :
                          responseObj[step.id] ? 'border-primary bg-primary' :
                          fileStates[step.id] ? 'border-primary' : 
                          'border-primary/40'
                        }
                    `}>
                        <ProgressCircle
                            response={responseObj[step.id]}
                            error={errorObj[step.id]}
                            loading={loading === step.id}
                        />
                    </div>

                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                        <div className={`
                            ${lineHeights[index]} w-[2px]
                            ${errorObj.status ? 'bg-error/40' :
                              responseObj[step.id] ? 'bg-primary' : 
                              'bg-primary/30'
                            }
                        `} />
                    )}
                </div>
            ))}
        </div>
    );
} 