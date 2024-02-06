export async function fetcher(url: string) {
	const res = await fetch(url);
	if (!res.ok) return { response: "error" };
	return await res.json();
}

export function getBaseUrl() {
	if (process.env.NODE_ENV === "development") {
		return "http://localhost:3000";
	}
	//TODO: add prod URL here
}

export function isEmpty(obj: Object) {
	for (const x in obj) { if (obj.hasOwnProperty(x))  return false; }
   	return true;
}