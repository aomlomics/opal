"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function TabButton({ tabName, route }: { tabName: string; route: string }) {
	const router = useRouter();
	const pathname = usePathname();

	// Special case for home route to prevent it from matching all paths
	const isActive = route === "/" ? pathname === "/" : pathname.startsWith(route);
	// We use startsWith now to make sure any page past /explore (for example, explore/project) shows 'Explore' as the active tab- BLW

	// Redirect handler
	const handleRedirect = () => {
		router.push(route);
	};

	// Returns a link instead of a button (you can now do open in new tab)
	return (
		<Link
			href={route}
			className={`px-4 py-2 ${
				isActive
					? "bg-primary text-white rounded-t-lg -mb-1"
					: "text-text-main hover:bg-base-300 hover:text-base-content rounded-t-lg"
			}`}
		>
			{tabName}
		</Link>
	);
}
