import { ReactNode } from "react";

export default function DataDisplay({
	data,
	omit = []
}: {
	data: Record<string, string | number | boolean | Date | null>;
	omit?: (keyof typeof data)[];
}) {
	return (
		<div className="overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-accent scrollbar-track-base-100 w-full grid grid-cols-2 gap-y-4 gap-x-2 h-full pr-5">
			{Object.entries(data).reduce((acc: ReactNode[], [field, value]) => {
				if (!omit.includes(field)) {
					acc.push(
						<>
							<div key={`${field}1`} className="flex items-center break-all">
								{field}
							</div>
							{/* TODO: deavalues */}
							<div key={`${field}2`} className={`break-words ${value !== null ? "" : "bg-base-300"}`}>
								{value?.toString()}
							</div>
						</>
					);
				}

				return acc;
			}, [])}
		</div>
	);
}
