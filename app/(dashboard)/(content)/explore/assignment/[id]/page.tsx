import UnderConstruction from "@/app/components/UnderConstruction";

export default async function Id({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	// return <>id {id}</>;
	return <UnderConstruction />;
}
