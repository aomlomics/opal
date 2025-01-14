import UnderConstruction from "@/app/components/UnderConstruction";

export default async function Samp_Name({ params }: { params: Promise<{ samp_name: string }> }) {
	const { samp_name } = await params;

	// return <>samp_name {samp_name}</>;
	return <UnderConstruction />;
}
