import Image from "next/image";

export default function ProgressCircle({
	response,
	error,
	loading
}: {
	response: string;
	error: string;
	loading: boolean;
}) {
	return (
		<div className="flex items-center">
			{!!response ? (
				<div className="tooltip tooltip-success flex items-center h-fit" data-tip={response}>
					<div className="btn btn-success btn-sm rounded-full aspect-square p-1">
						<Image src="/images/checkmark.svg" alt="Checkmark" fill className="p-1" />
					</div>
				</div>
			) : (
				<>
					{!!error ? (
						<div className="tooltip tooltip-error flex items-center h-fit" data-tip={error}>
							<div className="btn btn-error btn-sm rounded-full aspect-square p-1">
								<Image src="/images/x-symbol.svg" alt="X mark" width={400} height={400} className="p-1" />
							</div>
						</div>
					) : (
						<>
							{loading && (
								<div className="tooltip tooltip-warning flex items-center h-fit">
									<div className="btn btn-warning btn-sm rounded-full aspect-square p-0">
										<span className="loading loading-spinner loading-sm"></span>
									</div>
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
}
