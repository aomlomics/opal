"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";

export default function TabDropdown({
	tabName,
	route,
	dropdown
}: {
	tabName: string;
	route: string;
	dropdown: Array<{ label: string; href: string }>;
}) {
	const router = useRouter();
	const pathname = usePathname();

	// Special case for home route to prevent it from matching all paths
	const isActive = route === "/" ? pathname === "/" : pathname.startsWith(route);
	// We use startsWith now to make sure any page past /explore (for example, explore/project) shows 'Explore' as the active tab- BLW

	// Redirect handler
	const handleRedirect = () => {
		router.push(route);
	};

	//black magic do not touch
	function __unfocus() {
		const el = document.getElementById("unfocusButton");
		if (el) {
			el.focus();
			el.blur();
		}
	}

	function unfocus() {
		__unfocus();
	}

	// Returns a link instead of a button (you can now do open in new tab)
	return (
		<div className="dropdown dropdown-hover">
			<Link
				onClick={unfocus}
				href={route}
				className={`px-4 py-2 dropdown dropdown-hover- ${
					isActive
						? "bg-primary text-white rounded-t-lg -mb-1"
						: "text-text-main hover:bg-base-300 hover:text-base-content rounded-t-lg"
				}`}
			>
				{tabName}
			</Link>
			<ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
				{dropdown.map(({ label, href }) => (
					<li onClick={unfocus}>
						<Link href={href}>{label}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
