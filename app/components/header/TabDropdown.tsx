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

	return (
		<div onClick={unfocus} className="dropdown dropdown-hover">
			<Link
				href={route}
				className={`px-4 py-2 inline-block ${
					isActive
						? "bg-primary text-white rounded-t-lg -mb-1"
						: "text-text-main hover:bg-base-300 hover:text-base-content rounded-t-lg"
				}`}
			>
				{tabName}
			</Link>
			<ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
				{dropdown.map(({ label, href }) => (
					<li>
						<Link href={href}>{label}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
