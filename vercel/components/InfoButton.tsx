import React from 'react';

//Must define the props expected by the component, to solve TS error
type InfoButtonProps = {
	infoText: string;
};

const InfoButton: React.FC<InfoButtonProps> = ({infoText}) => {
	return(
		<div className="relative ml-2 group">
			<button
				type="button"
				className="inline-block p-2 rounded-full bg-white text-secondary hover:bg-blue-200 focus:outline-none transition duration-300 ease-in-out"
				aria-label="Info"
		>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-4 h-4">
        	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      	</svg>
      </button>
			<div className="opacity-0 transition-opacity duraction-300 ease-in-out absolute z-10 hidden group-hover:opacity-100 group-hover:flex p-2 bg-white border border-gray-200 rounded-lg shadow-lg left-full top-1/2 transform -translate-y-1/2 ml-3 w-64">
				{infoText}
			</div>
		</div>
	);
};

export default InfoButton;