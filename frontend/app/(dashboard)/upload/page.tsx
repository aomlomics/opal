import Link from "next/link";

export default function Upload() {
	return (
		<>
			<Link href={"/upload/study"}>
				<button className="btn">New Study</button>
			</Link>
			<Link href={"/upload/analysis"}>
				<button className="btn">New Analysis</button>
			</Link>
		</>
	);
}
