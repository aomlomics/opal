import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/helpers/prisma";
import type { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
	let response = await prisma.study_Data.findMany();

	return NextResponse.json(response);
}