"use client";

import { Prisma } from "@prisma/client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/app/components/Map"), {
	ssr: false
});

export default function MapWrapper({
	locations,
	id,
	title,
	table
}: {
	locations: any[];
	id: string;
	title: string;
	table: Uncapitalize<Prisma.ModelName>;
}) {
	return <Map locations={locations} id={id} title={title} table={table} />;
}
