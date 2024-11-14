import Link from "next/link";
import Image from "next/image";

export default function Logo() {
	return (
		<div className="flex flex-col">
			<Link className="pl-2 normal-case text-xl h-20 w-48 pr-4" href="/">
				<div className="avatar w-full h-full">
					<Image
						src="/images/node_logo_main.png"
						alt="NODE Logo"
						fill={true}
						style={{ objectFit: "contain" }}
						sizes="(max-width: 768px) 100vw, 33vw"
					/>
				</div>
			</Link>
			<Link className="pl-2 -mt-5" href="#">
				<div className="h-8 w-48 relative">
					<Image
						src="/images/NOAA_TEXT_LOGO_HORIZONTAL.png"
						alt="NOAA Text Logo"
						fill={true}
						style={{ objectFit: "contain" }}
					/>
				</div>
			</Link>
		</div>
	);
}
