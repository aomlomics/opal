import Link from "next/link";
import Image from "next/image";
//import { getBaseUrl } from "@/helpers/utils";
import Nav from "./Nav";
import LoginButton from "./LoginButton";
import Logo from "./Logo";

export default function HomeHeader() {
	return (
		<header className="sticky top-0 z-50 bg-secondary border-b-4 border-primary h-24">
			<div className="relative h-full flex justify-between items-center">
				{/* Logos section - unchanged */}
				<div className="flex items-center">
					{/* First (main) logo */}
					<Logo />

					{/* Second (smaller) logo */}
					<Link className="py-4 px-2 h-full" href="#">
						<div className="h-12 w-32 relative">
							<Image src="/images/node_logo_full_text.png" alt="" fill={true} style={{ objectFit: "contain" }} />
						</div>
					</Link>
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
