"use client"


import { getRemoteUrl } from "@/helpers/utils";

export default function TestData() {
	async function sendTest() {
		const res = await fetch(`${getRemoteUrl()}/testData`, {
			method: "POST",
			cache: "no-store"
		});
		const data = await res.json();
		if (data.error) {
			console.log(data.error)
		} else {
			console.log("success")
		}
	}
	
	return (
		<div className="flex flex-col flex-grow m-10">
			<button className="btn btn-primary flex-grow text-9xl" onClick={sendTest}>Test</button>
		</div>
	);
}