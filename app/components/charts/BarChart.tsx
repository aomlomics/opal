"use client";

import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	ChartDataset
} from "chart.js";
ChartJS.register(BarController, BarElement, LinearScale, Tooltip, Legend, CategoryScale, Title);
import { Bar } from "react-chartjs-2";

export default function BarChart({
	title,
	labels,
	datasets
}: {
	title: string;
	labels: string[];
	datasets: ChartDataset<"bar", (number | [number, number] | null)[]>[];
}) {
	return (
		<Bar
			data={{
				labels,
				datasets
			}}
			options={{
				plugins: {
					title: {
						display: true,
						text: title
					}
				},
				responsive: true,
				interaction: {
					intersect: false
				},
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true
					}
				}
			}}
		></Bar>
	);
}
