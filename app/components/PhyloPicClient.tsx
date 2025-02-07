"use client";

import { Taxonomy } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PhyloPic({ taxonomy }: { taxonomy: Taxonomy }) {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const errorImg = <div className="text-center">No Image</div>;

	let ranksBySpecificity = [
		"species",
		"genus",
		"family",
		"order",
		"class",
		"phylum",
		"subdivision",
		"division",
		"supergroup",
		"kingdom",
		"domain"
	] as Array<keyof typeof taxonomy>;

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				let gbifTaxonomy;
				for (const rank of ranksBySpecificity) {
					if (taxonomy[rank]) {
						//retrieve suggested taxonomies from GBIF
						//TODO: split more logically
						const gbifTaxaRes = await fetch(`https://api.gbif.org/v1/species/suggest?q=${taxonomy[rank] as string}`);
						const gbifTaxa = await gbifTaxaRes.json();
						//get only the taxonomies that match the specific rank
						//TODO: check GBIF API docs to do this step in the previous fetch
						//have to replace our database class field with the proper keyword
						gbifTaxonomy = gbifTaxa.filter((taxa: Record<string, any>) => taxa.rank.toLowerCase() === rank)[0];
						if (gbifTaxonomy) {
							break;
						}
					}
				}
				if (!gbifTaxonomy) {
					setLoading(false);
					return errorImg;
				}

				//use result of GBIF API to query PhyloPics for the vector image
				const objectIDs =
					`${gbifTaxonomy.speciesKey ? gbifTaxonomy.speciesKey + "," : ""}` +
					`${gbifTaxonomy.genus ? gbifTaxonomy.genus + "," : ""}` +
					`${gbifTaxonomy.familyKey ? gbifTaxonomy.familyKey + "," : ""}` +
					`${gbifTaxonomy.orderKey ? gbifTaxonomy.orderKey + "," : ""}` +
					`${gbifTaxonomy.classKey ? gbifTaxonomy.classKey + "," : ""}` +
					`${gbifTaxonomy.phylumKey ? gbifTaxonomy.phylumKey + "," : ""}` +
					`${gbifTaxonomy.kingdomKey ? gbifTaxonomy.kingdomKey : ""}`;
				const phyloPicRes = await fetch(
					`https://api.phylopic.org/resolve/gbif.org/species?embed_primaryImage=true&objectIDs=${objectIDs}`
				);
				const phyloPic = await phyloPicRes.json();
				setLoading(false);
				setImageUrl(phyloPic._embedded.primaryImage._links.vectorFile.href);
			} catch {
				setLoading(false);
				return errorImg;
			}
		}

		fetchData();
	}, []);

	return (
		<div className="w-full h-full relative flex flex-col items-center justify-center">
			{!!imageUrl ? (
				<Image src={imageUrl} alt="Image of taxonomy" fill className="object-contain" />
			) : loading ? (
				<span className="loading loading-spinner loading-lg h-full"></span>
			) : (
				<>{errorImg}</>
			)}
		</div>
	);
}
