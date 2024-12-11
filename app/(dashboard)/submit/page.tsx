import Link from "next/link";
import Image from "next/image";

export default function Submit() {
	return (
		<main className="flex flex-col grow p-8 max-w-7xl mx-auto space-y-12">
			{/* Upload Intro Section */}
			<section className="text-center space-y-6">
				<h1 className="text-5xl font-semibold text-primary">Built for FAIR eDNA Data</h1>
				<div className="max-w-3xl mx-auto space-y-4 text-lg text-base-content">
					<p>
						Is your data currently in Google Sheets or Excel? Upgrade your eDNA data storage to NODE and benefit from
						complex query and visualization capabilities, API integration, and more.
					</p>
					<p>
						Still not convinced?{" "}
						<Link href="/help" className="text-primary hover:underline">
							Check out our Data Submission Guide
						</Link>{" "}
						to learn about FAIR eDNA templates and how to prepare your data.
					</p>
				</div>
			</section>

			{/* Upload Options Section */}
			<section className="grid md:grid-cols-2 gap-8">
				<div className="card bg-base-200 shadow-xl overflow-hidden">
					<div className="card-body relative">
						<div className="w-3/4">
							<h2 className="card-title text-3xl text-primary mb-4">New Project</h2>
							<p className="text-base-content mb-6">
								Submit a complete dataset for a new eDNA project, including assays, library metadata, sample metadata,
								and project metadata.
							</p>
							<div className="card-actions">
								<Link href="/submit/project" className="btn btn-secondary text-white">
									Submit a Project
								</Link>
							</div>
						</div>

						<div className="absolute bottom-5 right-0 w-4/5 h-64 translate-x-1/3 translate-y-1/3">
							<Image
								src="/images/Catcher_Vessel4.svg"
								alt="Project Submission Illustration of a Research Vessel"
								fill
								className="object-contain opacity-80"
							/>
						</div>
					</div>
				</div>

				<div className="card bg-base-200 shadow-xl overflow-hidden">
					<div className="card-body relative">
						<div className="w-3/4">
							<h2 className="card-title text-3xl text-primary mb-4">New Analysis</h2>
							<p className="text-base-content mb-6">
								Contribute a new analysis based on existing data in NODE, using different methods or parameters to
								generate novel insights.
							</p>
							<div className="card-actions">
								<Link href="/submit/analysis" className="btn btn-secondary text-white">
									Submit an Analysis
								</Link>
							</div>
						</div>

						<div className="absolute bottom-4 right-0 w-4/5 h-64 translate-x-1/3 translate-y-1/3">
							<Image
								src="/images/Ruler.svg"
								alt="Analysis Upload Illustration"
								fill
								className="object-contain opacity-80"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Requirements Section */}
			<section className="flex justify-center">
				<div className="card bg-base-200 shadow-xl w-[80vh]">
					<div className="card-body">
						<h2 className="card-title text-3xl text-primary mb-6">Need Help with Cleaning up your Data?</h2>
						<div className="space-y-8 text-base-content">
							{/* TODO: NEED TO ADD LINKS TO GITHUB PAGES AND A BETTER EXPLANATION */}
							{/* Tools Section */}
							{/* <div>
								<h3 className="text-xl font-semibold mb-3">Recommended Tools:</h3>
								<p className="mb-3">We and our collaborators have built these tools, available on GitHub:</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>
										<Link href="#" className="text-primary hover:underline">
											edna2obis
										</Link>
										{" - Convert eDNA data to OBIS format"}
									</li>
									<li>
										<Link href="#" className="text-primary hover:underline">
											TermMatchAI
										</Link>
										{" - AI-powered term matching and standardization"}
									</li>
									<li>
										<Link href="#" className="text-primary hover:underline">
											TACT
										</Link>
										{" - Taxonomic data cleaning and validation"}
									</li>
									<li>
										<Link href="/tourmaline" className="text-primary hover:underline">
											Tourmaline
										</Link>
										{" - Amplicon sequence processing workflow"}
									</li>
								</ul>
							</div> */}
							<Link href="https://noaa-omics-dmg.readthedocs.io/en/latest/" className="text-primary hover:underline">
								Check out the NOAA 'Omics Data Management Guide.
							</Link>

							{/* File Types Section */}
							<div>
								<h3 className="text-xl font-semibold mb-3">File Types:</h3>
								<p>
									All files must be in <span className="font-mono bg-base-300 px-1 rounded">TSV</span> format
								</p>
							</div>

							{/* Dead Values Section */}
							<div>
								<h3 className="text-xl font-semibold mb-3">Dead Values:</h3>
								<p className="mb-3">Special values to use instead of empty or null cells in your data:</p>
								<div className="grid grid-cols-2 gap-4 ml-4">
									<div className="font-mono bg-base-300 px-3 py-1 rounded flex justify-between">
										{/* <span>-9999</span> */}
										<span className="text-base-content">Not applicable</span>
									</div>
									<div className="font-mono bg-base-300 px-3 py-1 rounded flex justify-between">
										{/* <span>-9998</span> */}
										<span className="text-base-content">Not provided</span>
									</div>
									<div className="font-mono bg-base-300 px-3 py-1 rounded flex justify-between">
										{/* <span>-9997</span> */}
										<span className="text-base-content">Missing</span>
									</div>
									<div className="font-mono bg-base-300 px-3 py-1 rounded flex justify-between">
										{/* <span>-9996</span> */}
										<span className="text-base-content">Unknown</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
