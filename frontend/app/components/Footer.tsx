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
			<div className="flex items-center justify-end space-x-6 ml-auto">
				<div className="relative h-12 w-32 self-end mb-[-3px]">
					<Image 
						src="/images/Noaa_exploration_light.svg"
						alt="NOAA Exploration Logo"
						fill={true}
						style={{
							objectFit: "contain",
							marginTop: "3px"
						}}
					/>
				</div>
				<div className="pt-3 pr-1">
					<Image 
						src="/images/HORIZONTAL_WEB_white_maroon.svg"
							alt="MSU NGI Logo"
							width={250}
							height={60}
							style={{objectFit: "contain"}}
					/>
				</div>
			</div>
		</footer>
	)
}