"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import useSWR from "swr";
import { fetcher } from "../helpers/utils";

const ICON = icon({
	iconUrl: "/images/map_marker.svg",
	iconSize: [32, 32]
});

type ProjSampleAvgLocs = {
	_avg: {
		decimalLatitude: number;
		decimalLongitude: number;
	};
	project_id: string;
};

export default function Map() {
	const centerStart = { lat: 25.7617, lng: -80.8918 };
	const ZOOM_LEVEL = 5;
	const ARCGIS_API_KEY = process.env.ARCGIS_KEY;

	const { data, error, isLoading } = useSWR("/api/sampleLocations", fetcher, {
		keepPreviousData: true
	});
	if (error) return <div>failed to load</div>;
	if (isLoading)
		return (
			<MapContainer className="w-full h-full grow" center={centerStart} zoom={ZOOM_LEVEL}>
				<TileLayer
					attribution='Powered by <a href="https://www.esri.com/en-us/home" target="_blank">Esri</a>'
					url={`https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}?token=${ARCGIS_API_KEY}`}
				/>
			</MapContainer>
		);

	return (
		<div className="flex flex-col items-start h-full w-full">
			<MapContainer className="w-full h-full grow" center={centerStart} zoom={ZOOM_LEVEL}>
				<TileLayer
					attribution='Powered by <a href="https://www.esri.com/en-us/home" target="_blank">Esri</a>'
					url={`https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}?token=${ARCGIS_API_KEY}`}
				/>
				{data.rawLocations.map((location: ProjSampleAvgLocs) => {
					if (location._avg.decimalLatitude && location._avg.decimalLongitude) {
						return (
							<Marker
								key={location.project_id}
								icon={ICON}
								position={{
									lat: location._avg.decimalLatitude,
									lng: location._avg.decimalLongitude
								}}
							>
								<Popup>Study ID: {location.project_id}</Popup>
							</Marker>
						);
					}
					return null;
				})}
			</MapContainer>
		</div>
	);
}
