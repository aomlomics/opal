import Link from "next/link";
import Image from "next/image";
//import { getBaseUrl } from "@/helpers/utils";
import Nav from "./Nav";
import LoginButton from "./LoginButton";
import Logo from "./Logo";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-secondary border-b-4 border-primary h-24">
			<div className="relative h-full flex justify-between items-center">
				{/* Logo section */}
				<div className="flex items-center">
					<Logo />
				</div>

				{/* Right side elements */}
				<div className="flex items-center gap-4">
					{/* Tabs with placeholder routes */}
					<Nav />
					<LoginButton />
				</div>
			</div>
		</header>
	);
}
