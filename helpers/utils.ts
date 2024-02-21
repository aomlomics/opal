export function clientApiFetch(useSWR: any, apiRoute: string) {
	return useSWR(`${getBaseUrl()}/api/${apiRoute}`, async (url: string) => {
		const res = await fetch(url);
		if (!res.ok) return { response: "error" };
		return await res.json();
	});
}

export function getBaseUrl() {
	if (process.env.NODE_ENV === "development") {
		return "http://localhost:3000";
	}
	return "https://opal-ochre.vercel.app";
}

export function isEmpty(obj: Object) {
	for (const x in obj) { if (obj.hasOwnProperty(x))  return false; }
   	return true;
}