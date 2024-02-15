import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/helpers/prisma";
import type { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;

	return NextResponse.json({ response: "Hello World!" });
}