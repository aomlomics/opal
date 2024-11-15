import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import TabButton from "./TabButton";

export default function Header() {
	return (
		<header className="top-0 z-header bg-div-base border-b-4 border-primary h-24">
			<div className="relative h-full flex justify-between items-center">
				{/* Logo section */}
				<div className="flex items-center">
					<Link className="ml-3 normal-case text-xl h-20 w-48 flex flex-col items-center" href="/">
						<div className="avatar w-full h-full">
							<Image
								src="/images/node_logo_main.png"
								alt="NODE Logo"
								fill={true}
								style={{ objectFit: "contain" }}
								sizes="(max-width: 768px) 100vw, 33vw"
							/>
						</div>
						<div className="h-8 w-48 relative -mt-5">
							<Image
								src="/images/NOAA_TEXT_LOGO_HORIZONTAL.png"
								alt="NOAA Text Logo"
								fill={true}
								style={{ objectFit: "contain" }}
							/>
						</div>
					</Link>
				</div>

				{/* Right side elements */}
				<div className="flex items-center gap-4">
					{/* Tabs with placeholder routes */}
					<ThemeToggle />
					<div className="absolute bottom-0 right-[240px] hidden lg:flex space-x-4">
						<TabButton tabName="Home" route="/" />
						<TabButton tabName="Search" route="/search" />
						<TabButton tabName="Explore" route="/explore" />
						<TabButton tabName="Submit" route="/submit" />
						<TabButton tabName="Assays" route="/assays" />
						<TabButton tabName="Tourmaline" route="/tourmaline" />
						<TabButton tabName="API" route="/api" />
						<TabButton tabName="Help" route="/help" />
					</div>
					<div className="mr-5">
						<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
							<SignInButton>
								<button className="btn bg-primary text-white hover:bg-primary/80">Sign In</button>
							</SignInButton>
						</SignedOut>
					</div>
				</div>
			</div>
		</header>
	);
}
