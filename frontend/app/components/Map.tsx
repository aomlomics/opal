"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const ICON = icon({
	iconUrl: "/images/marker.svg",
	iconSize: [32, 32]
});

export default function MyMap() {
	const centerStart = { lat: 25.7617, lng: -80.8918 };
	const ZOOM_LEVEL = 5;

	const initialMarkers = [
		centerStart,
		{ lat: 28.3852, lng: -65.7218 }, // North Atlantic
		{ lat: 22.4937, lng: -72.834 }, // Caribbean
		{ lat: 32.1451, lng: -77.3428 }, // Gulf Stream
		{ lat: 19.8968, lng: -84.9472 }, // Western Caribbean
		{ lat: 26.7459, lng: -88.2437 } // Gulf of Mexico
	];

	const [markers, setMarkers] = useState(initialMarkers);

	const ARCGIS_API_KEY = process.env.ARCGIS_KEY;

	//jsx element to display markers where the user clicks on the map
	function LocationMarkers() {
		useMapEvent("click", (e) => {
			setMarkers((prevValue) => [...prevValue, e.latlng]);
		});

		return (
			<>
				{markers.map((marker) => {
					return (
						<Marker key={`${marker.lat}:${marker.lng}`} icon={ICON} position={marker}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					);
				})}
			</>
		);
	}

	return (
		<div className="flex flex-col items-start h-full w-full">
			<MapContainer className="w-full h-full grow" center={centerStart} zoom={ZOOM_LEVEL}>
				<TileLayer
					attribution='Powered by <a href="https://www.esri.com/en-us/home" target="_blank">Esri</a>'
					url={`https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}?token=${ARCGIS_API_KEY}`}
				/>
				<LocationMarkers />
			</MapContainer>
		</div>
	);
}
