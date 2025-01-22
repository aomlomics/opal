"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ExploreTabButton({ tabName, route }: { tabName: string; route: string }) {
	const pathname = usePathname();
	const isActive = pathname.startsWith(`/explore/${route.toLowerCase()}`);

	return (
		<Link
			href={`/explore/${route.toLowerCase()}`}
			className={`px-4 py-2 text-sm border-b-2 transition-colors ${
				isActive
					? "border-primary text-primary font-medium"
					: "border-transparent text-text-main hover:border-primary/50 hover:text-primary/80"
			}`}
		>
			{tabName}
		</Link>
	);
}
