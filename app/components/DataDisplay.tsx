import { DeadValueEnum } from "@/types/enums";
import Link from "next/link";

export default function DataDisplay({
	data,
	omit = ["id"]
}: {
	data: Record<string, string | number | boolean | Date | null>;
	omit?: (keyof typeof data)[];
}) {
	return (
		<div className="overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-accent scrollbar-track-base-100 w-full h-full pr-3 flex flex-col gap-5">
			{Object.entries(data).map(([field, value]) =>
				!omit.includes(field) ? (
					<div key={field}>
						<div className="text-sm font-medium text-base-content/70 mb-1 break-all">{field}</div>
						{value === null ? (
							<div key={`${field}2`} className="bg-base-300">
								{"\u200b"}
							</div>
						) : URL.canParse(value.toString()) ? (
							<Link
								key={`${field}2`}
								href={value.toString()}
								className="text-primary hover:underline break-words"
								target="_blank"
								rel="noreferrer"
							>
								{value.toString()}
							</Link>
						) : typeof value === "number" && value in DeadValueEnum ? (
							<div key={`${field}2`} className="break-words">
								{DeadValueEnum[value]}
							</div>
						) : (
							<div key={`${field}2`} className="break-words">
								{value.toString()}
							</div>
						)}
					</div>
				) : (
					<></>
				)
			)}
			{/* {Object.entries(data).reduce((acc: ReactNode[], [field, value]) => {
				if (!omit.includes(field)) {
					acc.push(
						<div key={`${field}1`} className="break-all">
							{field}
						</div>
					);

					if (value === null) {
						acc.push(<div key={`${field}2`} className="bg-base-300"></div>);
					} else if (URL.canParse(value.toString())) {
						acc.push(
							<Link
								key={`${field}2`}
								href={value.toString()}
								className="text-primary hover:underline break-words"
								target="_blank"
								rel="noreferrer"
							>
								{value.toString()}
							</Link>
						);
					} else if (typeof value === "number" && value in DeadValueEnum) {
						acc.push(
							<div key={`${field}2`} className="break-words">
								{DeadValueEnum[value]}
							</div>
						);
					} else {
						acc.push(
							<div key={`${field}2`} className="break-words">
								{value.toString()}
							</div>
						);
					}
					// acc.push(
					// 	<div key={`${field}2`} className={`break-words ${value !== null ? "" : "bg-base-300"}`}>
					// 		{value === null
					// 			? ""
					// 			: typeof value === "number" && value in DeadValueEnum
					// 			? DeadValueEnum[value]
					// 			: value.toString()}
					// 	</div>
					// );
				}

				return acc;
			}, [])} */}
		</div>
	);
}
