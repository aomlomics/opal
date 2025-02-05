import Link from "next/link";

export default function TableDescription({ tableName, description }: { tableName: string; description: string }) {
	return (
		<div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg">
			<input type="checkbox" defaultChecked />
			<div className="collapse-title flex items-center gap-3">
				<h2 className="text-lg font-medium">{tableName}</h2>
			</div>
			<div className="collapse-content">
				<div className="border-t border-base-300 pt-3">
					<p className="mb-2">{description}</p>
					<p className="text-sm">
						For more detailed information, visit our{" "}
						<Link href="/help" className="text-primary hover:underline">
							Help page
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
