"use client";

import { Prisma } from "@prisma/client";
import dynamic from "next/dynamic";
const ActualMap = dynamic(() => import("@/app/components/map/ActualMap"), {
	ssr: false
});

export default function Map({
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
	return <ActualMap locations={locations} id={id} table={table} cluster={cluster} />;
}
