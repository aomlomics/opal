import { Taxonomy } from "@prisma/client";
import Image from "next/image";

export default async function PhyloPic({ taxonomy }: { taxonomy: Taxonomy }) {
	const errorImg = <>An error occurred</>;

	//check for the most specific rank of the taxonomy
	let mostSpecificRank = "" as keyof typeof taxonomy;
	if (taxonomy.species) {
		mostSpecificRank = "species";
	} else if (taxonomy.genus) {
		mostSpecificRank = "genus";
	} else if (taxonomy.family) {
		mostSpecificRank = "family";
	} else if (taxonomy.order) {
		mostSpecificRank = "order";
	} else if (taxonomy.taxonClass) {
		mostSpecificRank = "taxonClass";
	} else if (taxonomy.phylum) {
		mostSpecificRank = "phylum";
	} else if (taxonomy.kingdom) {
		mostSpecificRank = "kingdom";
	} else {
		return errorImg;
	}

	//retrieve suggested taxonomies from GBIF
	//TODO: split more logically
	const gbifTaxaRes = await fetch(
		`https://api.gbif.org/v1/species/suggest?q=${(taxonomy[mostSpecificRank] as string).split("_")[0]}`
	);
	const gbifTaxa = await gbifTaxaRes.json();
	//get only the taxonomies that match the specific rank
	//TODO: check GBIF API docs to do this step in the previous fetch
	const gbifTaxonomy = gbifTaxa.filter((taxa: Record<string, any>) => taxa.rank.toLowerCase() === mostSpecificRank)[0];
	if (!gbifTaxonomy) {
		return errorImg;
	}

	//use result of GBIF API to query PhyloPics for the vector image
	const phyloPicRes = await fetch(
		`https://api.phylopic.org/resolve/gbif.org/species?build=470&embed_primaryImage=true&objectIDs=${gbifTaxonomy.speciesKey},${gbifTaxonomy.genusKey},${gbifTaxonomy.familyKey},${gbifTaxonomy.orderKey},${gbifTaxonomy.classKey},${gbifTaxonomy.phylumKey},${gbifTaxonomy.kingdomKey}`
	);
	const phyloPic = await phyloPicRes.json();
	const imageUrl = phyloPic._embedded.primaryImage._links.vectorFile.href;

	//TODO: make image not take up entire screen
	return <Image src={imageUrl} alt="Image of taxonomy" fill />;
}
