import Link from "next/link";
import Image from "next/image";
import { getBaseUrl } from "@/helpers/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import TabButton from "@/components/TabButton";

export default function HomeHeader() {
	return (
		<header className="sticky top-0 z-50 bg-secondary border-b-4 border-primary">
			<div className="justify-between navbar p-0">
				<button id="skipNav" className="w-0 h-0"></button>
				<div className="navbar-start">

					<div className="hidden lg:block">
						{/* <Search/> */}
					</div>
					<div className="navbar-center hidden lg:flex">
						<TabButton tabName='Home' route='/' />
						<TabButton tabName='Data' route='/data' />
						<TabButton tabName='Tourmaline' route='/tourmaline' />
						<TabButton tabName='About' route='/about' />
					</div>
				</div>
				<div className="navbar-center hidden lg:flex">
					{/* <Nav/> */}
					<div></div>
				</div>
				<div className="navbar-end mr-5">
					<SignedIn>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<SignInButton>
							<button className="btn">Sign In</button>
						</SignInButton>
					</SignedOut>
				</div>
			</div>
		</header>
	);
}