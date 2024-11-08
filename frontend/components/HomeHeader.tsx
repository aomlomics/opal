import Link from "next/link";
import Image from "next/image";
import { getBaseUrl } from "@/helpers/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import TabButton from "@/components/TabButton";

export default function HomeHeader() {
	return (
		<header className="sticky top-0 z-200 bg-secondary border-b-4 border-primary h-24">
			<div className="relative h-full flex justify-between items-center">
				{/* Logos section - unchanged */}
				<div className="flex items-center">
					{/* First (main) logo */}
					<Link className="pl-2 normal-case text-xl h-20 w-48 bg-secondary rounded-3xl lg:rounded-l-none pr-4" href={`${getBaseUrl()}`}>
						<div className="avatar w-full h-full">
							<Image src="/images/node_logo_main.png" alt="" fill={true} style={{objectFit: "contain"}} sizes="(max-width: 768px) 100vw, 33vw"/>
						</div>
					</Link>

					{/* Second (smaller) logo */}
					<Link className="py-4 px-2 h-full" href="#">
						<div className="h-12 w-32 relative">
							<Image src="/images/node_logo_full_text.png" alt="" fill={true} style={{objectFit: "contain"}}/>
						</div>
					</Link>
				</div>

				{/* Right side elements */}
				<div className="flex items-center gap-4">
					{/* Tabs with placeholder routes */}
					<div className="absolute bottom-0 right-[240px] hidden lg:flex space-x-4">
						<TabButton tabName='Home' route='/' />
						<TabButton tabName='Advanced Search' route='/data' />
						<TabButton tabName='Explore' route='/data' /> {/* Placeholder */}
						<TabButton tabName='Submit' route='/data' /> {/* Placeholder */}
						<TabButton tabName='Tourmaline' route='/tourmaline' />
						<TabButton tabName='API' route='/data' /> {/* Placeholder */}
						<TabButton tabName='About' route='/about' />
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