import Link from "next/link";

export default function Submit() {
	return (
		<>
			<Link href={"/submit/study"} className="btn">
				New Study
			</Link>
			<Link href={"/submit/analysis"} className="btn">
				New Analysis
			</Link>
		</>
	);
}
