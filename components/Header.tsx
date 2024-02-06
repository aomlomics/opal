import Link from "next/link";
import { getBaseUrl } from "@/helpers/utils";
import Image from "next/image";

export default function Header() {
	return (
		<header className="sticky top-0 z-40">
			<div className="justify-between navbar bg-base-100">
				<button id="skipNav" className="w-0 h-0"></button>
				<div className="navbar-start">
					{/* <SmallNav/> */}
					<Link className="normal-case text-xl h-20 w-60" href={`${getBaseUrl()}`}>
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
					{/* <Link href={`${getBaseUrl()}/admin`}>Admin</Link>
					<Link href={`${getBaseUrl()}/api/auth/signout?callbackUrl=/`}>Sign Out</Link> */}
				</div>
			</div>
		</header>
	);
}