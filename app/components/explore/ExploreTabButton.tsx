"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ExploreTabButton({ tabName, route }: { tabName: string; route: string }) {
	const pathname = usePathname();
	const isActive = pathname.startsWith(`/explore/${route.toLowerCase()}`);

	return (
		<Link
			href={`/explore/${route.toLowerCase()}`}
			className={`px-6 py-3 text-base transition-colors border-b-0 border-x border-t font-medium ${
				isActive
					? "border-base-300 rounded-t-lg bg-base-100 text-primary"
					: "border-base-200 text-base-content hover:text-primary/80"
			}`}
		>
			{tabName}
		</Link>
	);
}
