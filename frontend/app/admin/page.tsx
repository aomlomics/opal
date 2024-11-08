import Link from "next/link";
import { cookies } from "next/headers";
//import { getRemoteUrl } from "@/helpers/utils";

export default async function Admin() {
	const jwt = cookies().get("__session");
	const res = await fetch(`/admin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ jwt: jwt?.value }),
		cache: "no-store"
	});
	const data = await res.json();
	if (data.error) {
		return <div>Error: {data.error}</div>;
	}

	return (
		<div>
			<Link href="/">
				<button className="btn btn-accent">Home</button>
			</Link>
			<p>Authentication status: {String(data.authenticated)}</p>
		</div>
	);
}
