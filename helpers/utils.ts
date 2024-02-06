export function getBaseUrl() {
	if (process.env.NODE_ENV === "development") {
		return "http://localhost:3000";
	}
	//TODO: add prod URL here
}