"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
//import useSWR from "swr";
//import { fetcher } from "../helpers/utils";
import Link from "next/link";
import { useState } from "react";
import { DBSCAN } from "density-clustering";
import { Prisma } from "@prisma/client";

export default function Map({
	locations,
	id,
	title,
	table
}: {
	locations: any[];
	id: string;
	title: string;
	table: Uncapitalize<Prisma.ModelName>;
}) {
	const [zoomLevel, setZoomLevel] = useState(5);

	function ZoomControl() {
		const mapEvents = useMapEvents({
			zoomend: () => {
				setZoomLevel(mapEvents.getZoom());
			}
		});

		return null;
	}

	//cluster location data
	const dataset = locations.map((loc) => [loc.decimalLatitude, loc.decimalLongitude]);
	const dbscan = new DBSCAN();
	//adjust second argument to adjust when points cluster
	const clusters = dbscan.run(dataset, 15 / zoomLevel ** 2.5, 2);
	//take index of cluster and average latlongs
	const clusteredLocations = clusters.map((c) => {
		const sum = [0, 0];
		const values = [];
		for (const i of c) {
			sum[0] += dataset[i][0];
			sum[1] += dataset[i][1];
			values.push(locations[i][id]);
		}
		return { values, decimalLatitude: sum[0] / c.length, decimalLongitude: sum[1] / c.length };
	});

	const centerStart = { lat: 25.7617, lng: -80.8918 };
	const ARCGIS_API_KEY = process.env.ARCGIS_KEY;

	//const { data, error, isLoading } = useSWR("/api/sampleLocations", fetcher, {
	//	keepPreviousData: true
	//});
	//if (error) return <div>failed to load</div>;
	//if (loading) {
	//	return (
	//		<MapContainer className="w-full h-full grow" center={centerStart} zoom={ZOOM_LEVEL}>
	//			<TileLayer
	//				attribution='Powered by <a href="https://www.esri.com/en-us/home" target="_blank">Esri</a>'
	//				url={`https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}?token=${ARCGIS_API_KEY}`}
	//			/>
	//		</MapContainer>
	//	);
	//}

	return (
		<div className="flex flex-col items-start h-full w-full">
			<MapContainer className="w-full h-full grow" center={centerStart} zoom={zoomLevel}>
				<ZoomControl />
				<TileLayer
					attribution='Powered by <a href="https://www.esri.com/en-us/home" target="_blank">Esri</a>'
					url={`https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}?token=${ARCGIS_API_KEY}`}
				/>
				{clusteredLocations.map((loc) => (
					<Marker
						key={loc.values[0]}
						icon={icon({
							iconUrl: "/images/map_marker.svg",
							iconSize: [32, 32]
						})}
						position={{
							lat: loc.decimalLatitude,
							lng: loc.decimalLongitude
						}}
					>
						<Popup className="map-popup">
							<div className="font-sans bg-base-100 p-4 rounded-lg">
								{/*<h3 className="text-base-content mb-1 pt-1">{locFields.title}</h3>*/}
								<h3 className="text-base-content mb-1 pt-1">{loc.values.length}</h3>
								<div className="flex flex-col max-h-20 overflow-y-scroll pr-5">
									{loc.values.map((label) => (
										<Link
											key={label}
											href={`/explore/${table}/${label}`}
											className="text-info hover:text-info-focus hover:underline transition-colors"
										>
											{label}
										</Link>
									))}
								</div>

								<style jsx global>{`
									.leaflet-popup-content-wrapper {
										padding: 0;
										border-radius: 0.5rem;
									}
									.leaflet-popup-content {
										margin: 0;
									}
									.leaflet-popup-tip {
										background: var(--fallback-b1, oklch(var(--b1))) !important;
										opacity: 1 !important;
									}
								`}</style>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
