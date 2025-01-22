import Carousel from "@/app/components/Carousel";
import Link from "next/link";
import DataSummary from "../components/DataSummary";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import { DeadValueEnum } from "@/types/enums";
import { prisma } from "../helpers/prisma";
import MapWrapper from "../components/MapWrapper";

export default async function Home() {
	const deadValues = Object.values(DeadValueEnum).filter((v) => !isNaN(Number(v))) as number[];

	const rawLocations = await prisma.sample.groupBy({
		by: ["project_id"],
		_avg: {
			decimalLatitude: true,
			decimalLongitude: true
		},
		where: {
			AND: [
				{
					NOT: {
						decimalLatitude: {
							in: deadValues
						}
					}
				},
				{
					NOT: {
						decimalLongitude: {
							in: deadValues
						}
					}
				}
			]
		}
	});
	const avgProjectLocs = rawLocations.map((loc) => ({
		project_id: loc.project_id,
		decimalLatitude: loc._avg.decimalLatitude,
		decimalLongitude: loc._avg.decimalLongitude
	}));

	return (
		<main className="flex flex-col grow bg-base-400 text-base-content">
			<div className="relative w-full h-[80vh] bg-black overflow-hidden z-content-overlay">
				<Carousel />
				{/* Gradient for left-to-right */}
				<div className="absolute inset-0 -right-[60%] bg-gradient-to-r from-base-100 via-base-100/70 via-[20%] via-base-100/30 via-[40%] to-transparent to-[100%]"></div>
				{/* Gradient for bottom */}
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-100/40 via-[50%] to-base-100"></div>
				<div className="absolute z-content text-left px-4 sm:px-6 lg:px-8 top-1/4 max-w-3xl">
					<h1 className="text-6xl font-light drop-shadow-lg leading-tight">
						<span className="block text-primary animate-slide-in">Welcome</span>
					</h1>
					<div className="text-base-content drop-shadow-lg">
						<span className="block text-4xl font-light sm:text-5xl mb-4">
							to the <span className="text-primary">NOAA Ocean DNA Explorer</span>
						</span>
						<div className="text-2xl sm:text-3xl mb-8 text-base-content/90 leading-snug">
							<span className="block">
								a data sharing platform, search engine, and visualization and analysis tool for ocean environmental DNA
								(eDNA) data
							</span>
						</div>
					</div>

					<div className="flex flex-col items-start gap-4">
						<a
							href="/data"
							className="btn btn-lg btn-secondary bg-primary/90 backdrop-blur-sm outline-none text-white hover:bg-primary transition-all duration-300"
						>
							Start Searching
						</a>
					</div>
				</div>
			</div>

			<div className="relative mb-12 text-center">
				<Link
					href="#dataSummary"
					className="relative inline-block after:absolute after:content-[''] after:inset-[-40px] after:cursor-pointer"
				>
					<p className="text-primary mb-2">Explore Our Data</p>
					<div className="animate-bounce">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-12 text-primary mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</div>
				</Link>
			</div>
			<div id="dataSummary" className="z-content px-4 sm:px-6 lg:px-8 pb-12">
				<div className="mb-4 text-2xl text-base-content">
					Showing all
					<span className="text-primary"> Projects</span>
				</div>
				<div className="flex gap-8">
					<div className="h-[500px] w-1/2 rounded-lg overflow-hidden">
						<MapWrapper locations={avgProjectLocs} id="project_id" table="project" />
					</div>
					<div className="w-1/2">
						<DataSummary />
					</div>
				</div>

				{/* Funding Institutes Section */}
				<div className="mt-32 mb-24">
					<h2 className="text-3xl text-primary mb-12 text-center">Supported By:</h2>

					<div className="max-w-4xl mx-auto text-lg text-main mb-16 text-center leading-tight">
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
							in collaboration with the{" "}
							<a
								href="https://www.northerngulfinstitute.org/"
								className="text-primary hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Northern Gulf Institute
							</a>{" "}
							at{" "}
							<a
								href="https://www.msstate.edu/"
								className="text-primary hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Mississippi State University
							</a>{" "}
							and is supported by{" "}
							<a
								href="https://oceanexplorer.noaa.gov/"
								className="text-primary hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								NOAA Ocean Exploration
							</a>{" "}
							and{" "}
							<a
								href="https://oceanexplorer.noaa.gov/technology/omics/noaa-omics.html"
								className="text-primary hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								NOAA Omics
							</a>{" "}
							projects NO_0062 and NO_0066.
						</p>
					</div>
					<div className="shadow-md p-8 rounded-lg justify-center mx-auto max-w-fit">
						<div className="flex justify-center items-center gap-20">
							<div className="relative h-24 w-64">
								<a href="https://oceanexplorer.noaa.gov/welcome.html" target="_blank" rel="noopener noreferrer">
									<ThemeAwareLogo
										src="/images/noaa_exploration_logo_FINAL.svg"
										alt="National Oceanic and Atmospheric Administration Exploration Logo"
										fill={true}
										style={{ objectFit: "contain" }}
									/>
								</a>
							</div>
							<div>
								<a href="https://www.northerngulfinstitute.org/" target="_blank" rel="noopener noreferrer">
									<ThemeAwareLogo
										src="/images/ngi_msu_logo_FINAL.svg"
										alt="Mississippi State University, Northern Gulf Institute Logo"
										width={500}
										height={300}
										style={{ objectFit: "contain" }}
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
