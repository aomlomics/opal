"use client";

import { Prisma } from "@prisma/client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/app/components/Map"), {
	ssr: false
});

export default function MapWrapper({
	locations,
	id,
	table,
	cluster = false
}: {
	locations: any[];
	id: string;
	table: Uncapitalize<Prisma.ModelName>;
	cluster?: boolean;
}) {
	return <Map locations={locations} id={id} table={table} cluster={cluster} />;
}
