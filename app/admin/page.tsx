import Link from "next/link";
import { cookies } from "next/headers";
import { getRemoteUrl } from "@/helpers/utils";

export default async function Admin() {
	const jwt = cookies().get("__session");
	const body = JSON.stringify({ jwt: jwt?.value })
	const res = await fetch(`${getRemoteUrl()}/admin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body,
		cache: "no-store"
	});
	const data = await res.json();
	if (data.error) {
		return <div>Error: {data.error}</div>
	}

	return (
		<div>
			<Link href="/"><button className="btn btn-accent">Home</button></Link>
			<button className="btn btn-accent">Verify login</button>
			<p>Authentication status: {String(data.authenticated)}</p>
		</div>
	);
}