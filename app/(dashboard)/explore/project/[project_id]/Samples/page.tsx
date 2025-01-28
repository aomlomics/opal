import UnderConstruction from "@/app/components/UnderConstruction";

export default async function Samples({ params }: { params: Promise<{ project_id: string }> }) {
	const { project_id } = await params;

	return <UnderConstruction />;
}
