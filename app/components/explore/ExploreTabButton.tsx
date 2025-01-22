"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ExploreTabButton({ tabName, route }: { tabName: string; route: string }) {
	const pathname = usePathname();
	const isActive = pathname.startsWith(`/explore/${route.toLowerCase()}`);

	return (
		<Link
			href={`/explore/${route.toLowerCase()}`}
			className={`px-6 py-3 text-base transition-colors ${
				isActive
					? "border-b-[3px] border-primary text-primary font-medium"
					: "border-b-[3px] border-transparent text-base-content hover:border-primary/50 hover:text-primary/80"
			}`}
		>
			{tabName}
		</Link>
	);
}
