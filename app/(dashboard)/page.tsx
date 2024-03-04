import TestClient from "@/components/TestClient";
import { getRemoteUrl } from "@/helpers/utils";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
	ssr: false,
});

export default async function Dashboard() {
	const res = await fetch(getRemoteUrl(), {
		method: "GET",
		cache: "no-store"
	});
	const data = await res.json();
	if (data.error) {
		return <div>Error: {data.error}</div>
	}

	return (
		<div className="w-full grow-1">
			<Map></Map>
			<div>
				<p>test</p>
				<p>Response from remote server: {data}</p>
				<p>------------------------------------------------------</p>
				<TestClient></TestClient>
			</div>
		</div>
	);
}
