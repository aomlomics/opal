"use client";

export default function DownloadButton({ text }: { text: string }) {
	function download() {}

	return (
		<button onClick={download} className="btn btn-secondary">
			{text}
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
					stroke="base-content"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-6 w-6"
				/>
				<path
					d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
					stroke="base-content"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
}
