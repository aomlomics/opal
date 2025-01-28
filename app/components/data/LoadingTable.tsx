export default function LoadingTable({ error }: { error?: string }) {
	return (
		<div className="w-full h-full flex flex-col">
			<div className="grid grid-cols-3 justify-items-center">
				{/* Filters Buttons */}
				<div className="flex items-center gap-5">
					<button disabled={true} className="btn btn-sm" type="button">
						Clear Filters
					</button>
					<button disabled={true} className="btn btn-sm">
						Apply Filters
					</button>
					<label className="input input-sm input-bordered flex items-center gap-2">
						Per Page:
						<input name="take" disabled={true} type="number" className="grow max-w-12" />
					</label>
				</div>
				{/* Pagination Controls */}
				<div className="flex items-center gap-8 w-full">
					<button className="btn btn-ghost gap-2" disabled={true} type="button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Previous
					</button>

					<div className="text-base-content/70 grow text-center">0-0 of 0</div>

					<button className="btn btn-ghost gap-2" disabled={true} type="button">
						Next
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</button>
				</div>
				{/* Column Selection Button */}
				<div className="flex items-center">
					<button disabled={true} className="btn btn-sm">
						Columns
					</button>
				</div>
			</div>
			<div className="flex items-center justify-center grow">
				{error ? <span>{error}</span> : <span className="loading loading-spinner loading-lg"></span>}
			</div>
		</div>
	);
}
