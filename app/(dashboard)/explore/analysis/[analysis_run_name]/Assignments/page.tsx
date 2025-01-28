import UnderConstruction from "@/app/components/UnderConstruction";

export default async function Assignments({ params }: { params: Promise<{ analysis_run_name: string }> }) {
	const { analysis_run_name } = await params;

	return <UnderConstruction />;
}
