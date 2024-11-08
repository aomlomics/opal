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
	const ZOOM_LEVEL = 5

	const [markers, setMarkers] = useState([centerStart]);

	const ARCGIS_API_KEY = process.env.ARCGIS_KEY;

	//jsx element to display markers where the user clicks on the map
	//function LocationMarkers() {
	//	useMapEvent("click", (e) => {
	//		setMarkers((prevValue) => [...prevValue, e.latlng]);
	//	});

	//	return (
	//		<>
	//			{markers.map((marker) => {
	//				return (
	//					<Marker key={marker.toString()} icon={ICON} position={marker}>
	//						<Popup>
	//							A pretty CSS3 popup. <br /> Easily customizable.
	//						</Popup>
	//					</Marker>
	//				);
	//			})}
	//		</>
	//	);
	//}

	//jsx element to reset display markers (DOES NOT WORK WITH LocationMarkers INTERCEPTING CLICK EVENT)
	function ResetMarkersButton() {
		return (
			<div className="leaflet-left leaflet-bottom">
				<div className="leaflet-bar leaflet-control">
					<button className="text-black bg-white p-1" onClick={() => setMarkers([centerStart])}>Reset Markers</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-start h-80 w-3/5">
			<button className="btn btn-accent" onClick={() => setMarkers([centerStart])}>Reset Markers</button>
			<MapContainer className="w-full grow" center={centerStart} zoom={ZOOM_LEVEL}>
				<TileLayer
					attribution='Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri &mdash; Powered by <a href="https://www.esri.com/en-us/home" target="_blank">Esri</a>'
					url={`https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}?token=${ARCGIS_API_KEY}`}
				/>
				{/*}
				<TileLayer
					attribution="&copy; <a href='http://www.openseamap.org'></a>"
					url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
				/>{*/}
				{/*<LocationMarkers></LocationMarkers>*/}
				{/* <ResetMarkersButton></ResetMarkersButton> */}
			</MapContainer>
		</div>
	);
};