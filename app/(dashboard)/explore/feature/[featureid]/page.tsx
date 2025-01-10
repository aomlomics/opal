export default async function Featureid({ params }: { params: { featureid: string } }) {
	const { featureid } = await params;

	return <>featureid {featureid}</>;
}
