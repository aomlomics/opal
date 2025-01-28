import Link from "next/link";
import Image from "next/image";

export default function Submit() {
	return (
		<main className="flex flex-col grow bg-base-100 mx-12">
			{/* Hero Section with Quick Links */}
			<section className="py-8">
				<div className="px-4 lg:px-6 max-w-[1400px] mx-auto">
					<div className="flex justify-between items-start gap-12">
						<div className="max-w-2xl">
							<h1 className="text-5xl text-primary mb-6">Submit to NODE</h1>
							<p className="text-xl text-base-content/80 leading-relaxed mb-4">
								Transform your eDNA data into actionable insights. Whether you're submitting new research or analyzing existing datasets, 
								NODE provides the tools and structure to make your data FAIR and impactful.
							</p>
							<Link href="/help" className="text-xl text-primary hover:underline">
								Need help? Visit our documentation →
							</Link>
						</div>
						<div className="hidden lg:flex flex-col items-center mt-10 mr-12 bg-base-100 rounded-lg p-3 w-[600px] mx-auto h-[150px] justify-center">
							{/* <h3 className="text-xl text-base-content/80 mb-3">Submission Resources</h3> */}
							<div className="flex gap-4 justify-center">
								<Link 
									href="/help" 
									className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-base-200 transition-colors text-center group"
								>
									<svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
									</svg>
									<span className="text-lg text-base-content/80">Templates</span>
								</Link>
								<Link 
									href="/help" 
									className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-base-200 transition-colors text-center group"
								>
									<svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									<span className="text-lg text-base-content/80">Format Guide</span>
								</Link>
								<Link 
									href="/help" 
									className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-base-200 transition-colors text-center group"
								>
									<svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
									</svg>
									<span className="text-lg text-base-content/80">Tutorials</span>
								</Link>
								<Link 
									href="/help" 
									className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-base-200 transition-colors text-center group"
								>
									<svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<span className="text-lg text-base-content/80">FAQ</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Upload Options */}
			<section className="px-4 lg:px-6 max-w-[1400px] mx-auto mt-8 mb-16">
				<div className="grid lg:grid-cols-2 gap-8">
					{/* Project Card */}
					<div className="card bg-base-200 shadow-xl h-[260px] relative overflow-hidden hover:shadow-2xl transition-shadow">
						<div className="card-body">
							<div className="w-full h-full flex flex-col">
								<div>
									<h2 className="text-3xl text-primary mb-4">Project Submission</h2>
									<p className="text-base-content/80 text-lg mb-6">
										Submit a complete eDNA dataset including sample metadata, environmental measurements, and sequencing data.
									</p>
								</div>
								<div className="mt-auto">
									<Link href="/submit/project" className="btn btn-primary">
										Start New Project
									</Link>
								</div>
							</div>
							<div className="absolute bottom-5 right-0 w-3/4 h-60 translate-x-1/3 translate-y-1/3">
								<Image
									src="/images/Catcher_Vessel4.svg"
									alt="Project Upload Illustration"
									fill
									className="object-contain opacity-80"
								/>
							</div>
						</div>
					</div>

					{/* Analysis Card */}
					<div className="card bg-base-200 shadow-xl h-[260px] relative overflow-hidden hover:shadow-2xl transition-shadow">
						<div className="card-body">
							<div className="w-full h-full flex flex-col">
								<div>
									<h2 className="text-3xl text-primary mb-4">Analysis Submission</h2>
									<p className="text-base-content/80 text-lg mb-6">
										Share your analysis of existing NODE data, including methods, parameters, and interpretations.
									</p>
								</div>
								<div className="mt-auto">
									<Link href="/submit/analysis" className="btn btn-primary">
										Start New Analysis
									</Link>
								</div>
							</div>
							<div className="absolute bottom-4 right-0 w-3/5 h-52 translate-x-1/3 translate-y-1/3">
								<Image
									src="/images/Ruler.svg"
									alt="Analysis Upload Illustration"
									fill
									className="object-contain opacity-80"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
