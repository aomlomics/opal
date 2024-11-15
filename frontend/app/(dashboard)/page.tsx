import Image from "next/image";
import Link from "next/link";
import DataSummary from "../components/DataSummary";

export default async function Home() {
	return (
		<main className="flex flex-col grow bg-base-200 text-base-content">
			<div className="relative w-full h-[450px] bg-black overflow-hidden z-content-overlay">
				<Image
					src="/images/hero_image.png"
					alt="Hero Image"
					width={1920}
					height={600}
					priority
					className="w-full h-full object-cover brightness-110 saturate-150 blur-sm"
				/>
				<div className="absolute inset-0 bg-black/40"></div>
				<div className="absolute z-content text-left px-4 sm:px-6 lg:px-8 top-[30%]">
					<h1 className="text-5xl sm:text-6xl md:text-7xl mb-2">
						<span className="block text-primary animate-slide-in">Welcome</span>
					</h1>
					<div className="text-base-content">
						<span className="block text-3xl sm:text-4xl md:text-5xl mb-2">
							to the <span className="text-primary">NOAA Ocean DNA Explorer</span>
						</span>
						<div className="text-lg sm:text-xl mb-6 text-base-content">
							<span>NODE is a data sharing platform, search engine, and visualization and analysis tool</span>
							<span> for ocean environmental DNA (eDNA) data</span>
						</div>
					</div>

					<div className="flex flex-col items-start gap-2">
						<a href="/data" className="btn btn-lg btn-secondary bg-primary outline-none text-white hover:bg-primary/80">
							Start Searching
						</a>
						{/* <span className="text-lg sm:text-xl text-gray-300">
							Or <span className="font-bold text-white">scroll down</span> to explore our data overview
						</span> */}
					</div>
				</div>
			</div>

			<div className="h-[200px] relative">
				<Link href="#dataSummary">
					<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-modal animate-bounce">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</div>
				</Link>
			</div>
			<div id="dataSummary" className="z-content px-4 sm:px-6 lg:px-8 pt-8 pb-12">
				<DataSummary />
				{/* Funding Institutes Section */}
				<div className="mt-32 mb-24 text-center">
					<h2 className="text-3xl text-gray-300 font-semibold mb-12">Supported By:</h2>

					<div className="max-w-4xl mx-auto text-lg text-gray-300 mb-16">
						<p>
							NODE is a product of{" "}
							<a
								href="https://www.aoml.noaa.gov/"
								className="text-primary hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								NOAA's Atlantic Oceanographic and Meteorological Laboratory
							</a>{" "}
							in collaboration with{" "}
							<a
								href="https://www.msstate.edu/"
								className="text-primary hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Mississippi State University
							</a>{" "}
							and is supported by the{" "}
							<a
								href="https://www.northerngulfinstitute.org/"
								className="text-primary hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Northern Gulf Institute
							</a>{" "}
							through the{" "}
							<a
								href="https://oceanexplorer.noaa.gov/technology/omics/noaa-omics.html"
								className="text-primary hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								NOAA Omics program
							</a>
							.
						</p>
					</div>

					<div className="flex justify-center items-center gap-20">
						<div className="relative h-24 w-64">
							<Image
								src="/images/Noaa_exploration_light.svg"
								alt="NOAA Exploration Logo"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
						<div>
							<Image
								src="/images/HORIZONTAL_WEB_white_maroon.svg"
								alt="MSU NGI Logo"
								width={500}
								height={300}
								style={{ objectFit: "contain" }}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
