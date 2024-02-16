import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getBaseUrl } from "@/helpers/utils";

export default withAuth(
	function middleware(request: NextRequestWithAuth) {
		if ((request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/api/admin")) && request.nextauth.token?.roleId !== "admin") {
			return NextResponse.rewrite(new URL(`${getBaseUrl()}/denied`, request.url));
		}
	}
);

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };