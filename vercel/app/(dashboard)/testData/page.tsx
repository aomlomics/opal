"use client"


import { getRemoteUrl } from "@/helpers/utils";

export default function TestData() {
	//TAXON
	async function sendTaxon() {
		const res = await fetch(`${getRemoteUrl()}/testTaxon`, {
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

	async function sendDeleteTaxon() {
		const res = await fetch(`${getRemoteUrl()}/deleteTestTaxon`, {
			method: "POST",
			cache: "no-store"
		});
		const data = await res.json();
		if (data.error) {
			console.log(data.error)
		} else {
			console.log("deletion successful")
		}
	}

	//FEATURES
	async function sendFeatures() {
		const res = await fetch(`${getRemoteUrl()}/sendFeatures`, {
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

	async function sendDeleteFeatures() {
		const res = await fetch(`${getRemoteUrl()}/sendDeleteFeatures`, {
			method: "POST",
			cache: "no-store"
		});
		const data = await res.json();
		if (data.error) {
			console.log(data.error)
		} else {
			console.log("deletion successful")
		}
	}

	//METADATA
	async function sendMeta() {
		const res = await fetch(`${getRemoteUrl()}/sendMeta`, {
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

	async function sendDeleteMeta() {
		const res = await fetch(`${getRemoteUrl()}/sendDeleteMeta`, {
			method: "POST",
			cache: "no-store"
		});
		const data = await res.json();
		if (data.error) {
			console.log(data.error)
		} else {
			console.log("deletion successful")
		}
	}

	//METADATA
	async function sendOccurrence() {
		const res = await fetch(`${getRemoteUrl()}/sendOccurrence`, {
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

	async function sendDeleteOccurrence() {
		const res = await fetch(`${getRemoteUrl()}/sendDeleteOccurrence`, {
			method: "POST",
			cache: "no-store"
		});
		const data = await res.json();
		if (data.error) {
			console.log(data.error)
		} else {
			console.log("deletion successful")
		}
	}
	
	return (
		<div className="flex flex-grow flex-col m-10">
			<h1 className="text-primary text-4xl">Taxon:</h1>
			<div className="flex flex-grow">
				<button className="btn btn-primary flex-grow text-8xl h-full" onClick={sendTaxon}>Test</button>
				<button className="btn btn-primary flex-grow text-8xl h-full" onClick={sendDeleteTaxon}>Delete</button>
			</div>
			<h1 className="text-primary text-4xl">Features:</h1>
			<div className="flex flex-grow">
				<button className="btn btn-primary flex-grow text-8xl h-full" onClick={sendFeatures}>Test</button>
				<button className="btn btn-primary flex-grow text-8xl h-full" onClick={sendDeleteFeatures}>Delete</button>
			</div>
			<h1 className="text-primary text-4xl">Metadata:</h1>
			<div className="flex flex-grow">
				<button className="btn btn-primary flex-grow text-8xl h-full" onClick={sendMeta}>Test</button>
				<button className="btn btn-primary flex-grow text-8xl h-full" onClick={sendDeleteMeta}>Delete</button>
			</div>
			<h1 className="text-primary text-4xl">Occurrences:</h1>
			<div className="flex flex-grow">
				<button className="btn btn-primary flex-grow text-8xl h-full" onClick={sendOccurrence}>Test</button>
				<button className="btn btn-primary flex-grow text-8xl h-full" onClick={sendDeleteOccurrence}>Delete</button>
			</div>
		</div>
	);
}