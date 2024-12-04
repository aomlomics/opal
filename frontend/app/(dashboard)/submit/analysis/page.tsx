import AnalysisSubmit from "@/app/components/submit/AnalysisSubmit";
import Link from "next/link";

export default function Analysis() {
	return (
		<main className="flex flex-col grow p-8 max-w-7xl mx-auto space-y-8">
			{/* Upload Intro Section */}
			<section className="text-center space-y-6">
				<h1 className="text-5xl font-semibold text-primary">Submit Analysis</h1>
				<div className="max-w-3xl mx-auto space-y-4 text-lg text-base-content">
					<p>Ready to contribute new insights? Upload your analysis files here.</p>
					<p className="max-w-3xl mx-auto space-y-4 text-lg text-base-content">
						First time submitting an analysis?{" "}
						<Link href="https://noaa-omics-dmg.readthedocs.io/en/latest/" className="text-primary hover:underline">
							Check out the NOAA 'Omics Data Management Guide.
						</Link>
					</p>
				</div>
			</section>

			{/* Submission Card */}
			<section>
				<div className="card bg-base-200 shadow-xl">
					<div className="card-body">
						<div className="flex items-center gap-3 mb-6 p-3 bg-primary/5 rounded-lg">
							<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
							<div className="space-y-1">
								<span className="text-base-content/80 block">
									Each analysis requires metadata, features, and occurrences
								</span>
								<span className="text-sm text-base-content/60">Files must be in TSV format</span>
							</div>
						</div>
						<AnalysisSubmit />
					</div>
				</div>
			</section>
		</main>
	);
}
