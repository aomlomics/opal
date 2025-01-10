export default async function Id({ params }: { params: { id: string } }) {
	const { id } = await params;

	return <>id {id}</>;
}
