import Image from "next/image";

export default function Footer() {
	return(
		<footer className="footer pl-1 text-neutral-content mt-auto z-30 bg-secondary border-t-4 border-primary">
			<div className="text-left pt-1">
				<p className="-mb-3">Copyright © 2024 - All Rights Reserved.</p>
				<p className="text-neutral-content hover:underline -mb-3">
					<a href="https://www.aoml.noaa.gov/">NOAA's Atlantic Oceanographic and Meteorological Laboratory</a>
				</p>
				<p className="text-primary hover:underline">
					<a href="/about">Report an Issue</a>
				</p>
			</div>
			
			{/* Added justify-end to push logos to the right */}
			<div className="flex items-center justify-end ml-auto space-x-8 pr-2">
				<div className="relative h-12 w-36">
					<Image 
						src="/images/Noaa_exploration_light.svg"
						alt="NOAA Exploration Logo"
						fill={true}
						style={{objectFit: "contain"}}
					/>
				</div>
				<div className="relative h-16 w-48">
					<Image 
						src="/images/MSU_NGI_white_logo.svg"
						alt="MSU NGI Logo"
						fill={true}
						style={{objectFit: "contain"}}
					/>
				</div>
			</div>
		</footer>
	)
}