import { prisma } from "../helpers/prisma";
import Link from "next/link";

export default async function DataSummary() {
	const { studyCount, sampleCount, featureCount, uniqueAssays } = await prisma.$transaction(async (tx) => {
		const studyCount = await tx.study.count();
		const sampleCount = await tx.sample.count();
		const featureCount = await tx.feature.count();
		const uniqueAssays = (await tx.assay.findMany({
			distinct: ["target_gene"],
			select: {
				target_gene: true
			}
		})) as { target_gene: string; count?: number }[];

		for (const a of uniqueAssays) {
			//get count of features that were assigned using a particular target gene
			//number of assignments = number of features (an assignment has only one feature)
			const count = await tx.analysis.findFirst({
				where: {
					Assay: {
						target_gene: a.target_gene
					}
				},
				select: {
					_count: {
						select: {
							Assignments: true
						}
					}
				}
			});
			if (count) {
				a.count = count._count.Assignments;
			}
		}

		return { studyCount, sampleCount, featureCount, uniqueAssays };
	});

	return (
		<div>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
				<DataSummaryItem title="Studies" value={studyCount} href="/explore/study" />
				<DataSummaryItem title="Samples" value={sampleCount} href="/explore/sample" />
				<DataSummaryItem title="Unique Sequence Features" value={featureCount} href="/explore/feature" />
				{uniqueAssays.map((a) => (
					<DataSummaryItem key={a.target_gene} title={a.target_gene} value={a.count || NaN} href="/explore/" />
				))}
			</div>

			<div className="mb-4 text-2xl text-base-content">
				Showing all <span className="text-primary">Studies</span>
			</div>
		</div>
	);
}

function DataSummaryItem({ title, value, href }: { title: string; value: number; href: string }) {
	return (
		<Link
			href={href}
			className="bg-div-base hover:bg-interactive-hover active:bg-interactive-active p-6 rounded-lg text-center shadow-md transition-colors"
		>
			<h3 className="text-main text-lg mb-2">{title}</h3>
			<p className="text-primary text-3xl font-bold">{value.toLocaleString()}</p>
		</Link>
	);
}
