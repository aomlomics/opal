import Link from "next/link";
import { getBaseUrl } from "@/helpers/utils";
import Image from "next/image";
import UserNav from "@/components/UserNav";

export default function Header() {
	
	return (
		<header className="sticky top-0 z-40 bg-secondary">
			<div className="justify-between navbar p-0">
				<button id="skipNav" className="w-0 h-0"></button>
				<div className="navbar-start">
					{/* <SmallNav/> */}
					<Link className="normal-case text-xl h-20 w-60 bg-neutral" href={`${getBaseUrl()}`}>
						<div className="avatar w-full h-full">
							<Image src="/images/noaaLogo.svg" alt="" fill={true} style={{objectFit: "contain"}}/>
						</div>
					</Link>
					<div className="hidden lg:block">
						{/* <Search/> */}
					</div>
				</div>
				<div className="navbar-center hidden lg:flex">
					{/* <Nav/> */}
					<div></div>
				</div>
				<div className="navbar-end">
					<UserNav></UserNav>
				</div>
			</div>
		</header>
	);
}