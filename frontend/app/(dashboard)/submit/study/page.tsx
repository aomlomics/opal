export const maxDuration = 120;

import StudySubmit from "@/app/components/StudySubmit";

export default function Study() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto bg-base-200 rounded-lg shadow-lg">
				<div className="p-6">
					<h1 className="text-2xl font-bold text-primary mb-6">Submit Study Data</h1>
					<StudySubmit />
				</div>
			</div>
		</div>
	);
}
