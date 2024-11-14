import Link from "next/link";
import Image from "next/image";

export default function Logo() {
	return (
		<Link className="pl-2 normal-case text-xl h-20 w-48 bg-secondary rounded-3xl lg:rounded-l-none pr-4" href="/">
			<div className="avatar w-full h-full">
				<Image
					src="/images/node_logo_main.png"
					alt=""
					fill={true}
					style={{ objectFit: "contain" }}
					sizes="(max-width: 768px) 100vw, 33vw"
				/>
			</div>
		</Link>
	);
}
