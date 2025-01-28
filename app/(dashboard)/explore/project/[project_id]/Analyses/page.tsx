import UnderConstruction from "@/app/components/UnderConstruction";

export default async function Analyses({ params }: { params: Promise<{ project_id: string }> }) {
	const { project_id } = await params;

	return <UnderConstruction />;
}
