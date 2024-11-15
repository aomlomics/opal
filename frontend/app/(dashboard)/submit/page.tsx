import Link from "next/link";

export default function Submit() {
	return (
		<>
			<button className="btn">
				<Link href={"/submit/study"} className="w-full h-full">
					New Study
				</Link>
			</button>
			<button className="btn">
				<Link href={"/submit/analysis"} className="w-full h-full">
					New Analysis
				</Link>
			</button>
		</>
	);
}
