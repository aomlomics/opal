"use client"

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet"

const ICON = icon({
  	iconUrl: "/images/marker.svg",
  	iconSize: [32, 32],
})

export default function MyMap() {
	const centerStart = { lat: 25.7617, lng: -80.8918 };
	const ZOOM_LEVEL = 7

	const [markers, setMarkers] = useState([centerStart]);

	//jsx element to display markers where the user clicks on the map
	function LocationMarkers() {
		useMapEvent("click", (e) => {
			setMarkers((prevValue) => [...prevValue, e.latlng]);
		});

		return (
			<>
				{markers.map((marker) => {
					return <Marker icon={ICON} position={marker}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				})}
			</>
		);
	}

	return (
		<div style={{ width: '95vh', height: '75vh', marginLeft:'116.5vh'}}>
			<button className="btn btn-accent" onClick={() => setMarkers([centerStart])}>Reset Markers</button>
			<MapContainer center={centerStart} zoom={ZOOM_LEVEL} scrollWheelZoom={false} style={{ width: '100%', height: '80%' }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LocationMarkers></LocationMarkers>
			</MapContainer>
		</div>
	);
};