import Link from "next/link";
import ThemeAwareLogo from "../components/ThemeAwareLogo";

export default function Footer() {
	return (
		<footer className="footer pl-1 text-neutral-content mt-auto z-30 bg-base-100 border-t-4 border-primary flex items-stretch">
			<div className="text-left pt-1 text-base-content">
				<p className="-mb-4">Copyright © 2024 - All Rights Reserved.</p>
				<p className="text-base-content hover:underline -mb-4">
					<Link
						href="https://www.aoml.noaa.gov/"
						className="text-primary hover:underline break-words"
						target="_blank"
						rel="noreferrer"
					>
						NOAA's Atlantic Oceanographic and Meteorological Laboratory
					</Link>
				</p>
				<p className="text-primary hover:underline">
					<Link href="/about">Report an Issue</Link>
				</p>
			</div>

			<div className="flex items-stretch bg-base-100 justify-end ml-auto">
				<div className="rounded-l-sm flex items-center px-6 h-full">
					<div className="relative h-12 w-32 self-center mb-1">
						<Link href="https://oceanexplorer.noaa.gov/welcome.html" target="_blank" rel="noopener noreferrer">
							<ThemeAwareLogo
								src="/images/noaa_exploration_logo_FINAL.svg"
								alt="NOAA Exploration Logo"
								fill={true}
								style={{
									objectFit: "contain",
									marginTop: "3px"
								}}
							/>
						</Link>
					</div>
					<div className="pt-2 ml-10 self-center mb-2">
						<Link href="https://www.northerngulfinstitute.org/" target="_blank" rel="noopener noreferrer">
							<ThemeAwareLogo
								src="/images/ngi_msu_logo_FINAL.svg"
								alt="MSU NGI Logo"
								width={250}
								height={60}
								style={{ objectFit: "contain" }}
							/>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
