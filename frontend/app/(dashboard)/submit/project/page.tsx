import ProjectSubmit from "@/app/components/submit/ProjectSubmit";
import Link from "next/link";

export default function Project() {
	return (
		<main className="flex flex-col grow p-8 max-w-7xl mx-auto space-y-8">
			{/* Upload Intro Section */}
			<section className="text-center space-y-6">
				<h1 className="text-5xl font-semibold text-primary">Submit a New Project</h1>
				<div className="max-w-3xl mx-auto space-y-4 text-lg text-base-content">
					<p>Contributing a new environmental DNA project? You're in the right place.</p>
					<p className="max-w-3xl mx-auto space-y-4 text-lg text-base-content">
						Need help preparing your data?{" "}
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
								<span className="text-base-content block">All files must be in TSV format</span>
								<span className="text-sm text-base-content">
									Make sure to follow the template structure exactly. Otherwise, you will receive errors.
								</span>
							</div>
						</div>
					</div>
					<div className="text-center mb-8">
						<ProjectSubmit />
					</div>
				</div>
			</section>
		</main>
	);
}