import TestClient from '@/components/TestClient';
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/components/Map'), {
	ssr: false,
})

export default async function Dashboard() {
	const res = await fetch("https://opalserver-qnwedardvq-uc.a.run.app/", {
		method: "GET",
		cache: "no-store"
	});
	const data = await res.json();

	return (
		<div className="w-full grow-1">
			<Map></Map>
			<div>
				<p>Response from remote server: {data}</p>
				<p>------------------------------------------------------</p>
				<TestClient></TestClient>
			</div>
		</div>
	);
}