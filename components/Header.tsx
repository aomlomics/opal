import Link from "next/link";
import { getBaseUrl } from "@/helpers/utils";
import Image from "next/image";

export default function Header() {
	return (
		<header className="sticky top-0 z-40">
			<Link className="normal-case text-xl" href={`${getBaseUrl()}`}>
				<div className="avatar m-3">
					<div className="w-20">
						<Image src="/noaaLogoWithWriting.png" alt="" fill={true}/>
					</div>
				</div>
			</Link>
		</header>
	);
}