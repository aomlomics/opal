import Link from "next/link";

export default function TableDescription({ description }: { description: string }) {
	return (
		<div className="bg-base-100 border border-base-300 rounded-lg p-4 mb-6">
			<p className="mb-2">{description}</p>
			<p className="text-sm">
				For more detailed information, visit our{" "}
				<Link href="/help" className="text-primary hover:underline">
					Help page
				</Link>
				.
			</p>
		</div>
	);
}
