import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/helpers/prisma";
import type { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
	let response = await prisma.project.findMany();

	return NextResponse.json(response);
}