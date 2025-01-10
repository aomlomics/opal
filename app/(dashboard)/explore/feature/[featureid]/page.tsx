export default async function Featureid({ params }: { params: Promise<{ featureid: string }> }) {
	const { featureid } = await params;

	return <>featureid {featureid}</>;
}
