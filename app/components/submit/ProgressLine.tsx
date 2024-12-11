export default function ProgressLine({ 
    isActive,
    isSuccess,
    isError
}: { 
    isActive: boolean;
    isSuccess: boolean;
    isError: boolean;
}) {
    return (
        <div className={`
            h-8 w-0.5 mx-auto my-1
            ${isError ? 'bg-error/50' :
              isSuccess ? 'bg-success' : 
              isActive ? 'bg-primary' : 
              'bg-base-300'}
        `} />
    );
} 