import Link from "next/link";
import { cookies } from "next/headers";
import { getRemoteUrl } from "@/helpers/utils";

export default async function Admin() {
	const jwt = cookies().get("__session");
	const res = await fetch(`${getRemoteUrl()}/admin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ jwt: jwt?.value }),
		cache: "no-store"
	});
	if (!res.ok) {
		return <div>Error {res.status}: {res.statusText}</div>
	}
	const data = await res.json();
	console.log(data)

	return (
		<div>
			<Link href="/"><button className="btn btn-accent">Home</button></Link>
			<button className="btn btn-accent">Verify login</button>
		</div>
	);
}