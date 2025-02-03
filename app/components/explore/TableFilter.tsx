export default function TableFilter() {
	return (
		<div className="collapse collapse-arrow bg-base-100 rounded-lg">
			<input type="checkbox" />
			<div className="collapse-title flex items-center gap-3">
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
					className="text-base-content/70"
				>
					<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
				</svg>
				<span className="font-medium text-base-content">Filters</span>
			</div>
			<div className="collapse-content">
				<div className="space-y-4">
					{/* Dummy filters - replace with real ones later */}
					<div>
						<label className="text-sm font-medium text-base-content/70 mb-2 block">Search</label>
						<input
							type="text"
							placeholder="Search projects..."
							className="input input-bordered w-full bg-base-200 border-base-300 placeholder:text-base-content/50"
						/>
					</div>
					<div>
						<label className="text-sm font-medium text-base-content/70 mb-2 block">Sort by</label>
						<select className="select select-bordered w-full bg-base-200 border-base-300 text-base-content">
							<option>Newest first</option>
							<option>Oldest first</option>
							<option>A-Z</option>
							<option>Z-A</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}
