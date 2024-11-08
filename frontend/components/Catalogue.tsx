"use client";

import Link from "next/link";
//import { getBaseUrl } from "@/helpers/utils";
import { useEffect, useState } from "react";

export default function Catalogue({ data }: { data: Array<any> }) {
	const [sliceNum, setSliceNum] = useState(0);

	const [slicedData, setSlicedData] = useState(data.slice(sliceNum, 5));
	useEffect(() => {
		setSlicedData(data.slice(sliceNum, sliceNum + 5));
	}, [sliceNum]);

	return (
		<div className="p-5 bg-primary rounded-xl">
			<div className="flex flex-col gap-3">
				{slicedData.map((d, i) => (
					<Link key={i} href={`/data/features/${d.featureid}`}>
						<div className="card bg-neutral-content">
							<div className="card-body p-5">{d.featureid}</div>
						</div>
					</Link>
				))}
			</div>
			<div className="join grid grid-flow-col">
				<button
					className="join-item btn btn-outline"
					onClick={() => {
						if (sliceNum >= 5) {
							setSliceNum(sliceNum - 5);
						}
					}}
				>
					Previous page
				</button>
				<div className="flex items-center justify-center">
					{sliceNum}-{sliceNum + 5}
				</div>
				<button
					className="join-item btn btn-outline"
					onClick={() => {
						if (sliceNum + 5 <= data.length) {
							setSliceNum(sliceNum + 5);
						}
					}}
				>
					Next
				</button>
			</div>
		</div>
	);
}
