import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Link from "next/link";

export default function About() {
	return (
		<div className="flex flex-col text-gray-800">
			<section className="max-w-2xl mx-auto py-16">
				<h1 className="text-secondary font-bold text-6xl text-center mb-4">About</h1>
				<div className="bg-gray-100 shadow-lg rounded-3xl p-8">
					<p className="mb-6">
						Opal is a product of{" "}
						<a
							href="https://www.aoml.noaa.gov/"
							className="font-bold text-secondary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							NOAA's Atlantic Oceanographic and Meteorological Laboratory
						</a>{" "}
						in collaboration with{" "}
						<a
							href="https://www.msstate.edu/"
							className="font-bold text-secondary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Mississippi State University
						</a>{" "}
						and is supported by the{" "}
						<a
							href="https://www.northerngulfinstitute.org/"
							className="font-bold text-secondary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Northern Gulf Institute
						</a>{" "}
						through the{" "}
						<a
							href="https://oceanexplorer.noaa.gov/technology/omics/noaa-omics.html"
							className="font-bold text-secondary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							NOAA Omics program
						</a>
						.
					</p>
				</div>
			</section>
		</div>
	);
}
