"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { getBaseUrl } from "@/helpers/utils";

export default function LogInOut() {
	const { data, status } = useSession();

	return(
		<>
		{status === "loading" ?
			<div>Loading...</div>
		:
			<>
				{status === "authenticated" ?
					<Link href={`${getBaseUrl()}/api/auth/signout?callbackUrl=/`}>
						<button className="btn">Sign Out</button>
					</Link>
				:
					<Link href={`${getBaseUrl()}/api/auth/signin?callbackUrl=/`}>
						<button className="btn">Sign In</button>
					</Link>
				}
			</>
		}
		</>
	)
}