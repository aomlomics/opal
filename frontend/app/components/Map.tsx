"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet"
import { getMapLocations } from "@/app/helpers/actions/getMapLocations";
import { DeadValue } from "@/types/enums";
import { useEffect, useState } from "react";

const ICON = icon({
	iconUrl: "/images/map_marker.svg",
	iconSize: [32, 32],
})

export default function Map() {
	const [studyLocations, setStudyLocations] = useState<any[]>([]);
	const centerStart = { lat: 25.7617, lng: -80.8918 };
	const ZOOM_LEVEL = 5;
	const ARCGIS_API_KEY = process.env.ARCGIS_KEY;

	useEffect(() => {
		getMapLocations().then(rawLocations => {
			console.log("Raw locations from DB:", JSON.stringify(rawLocations, null, 2));
			
			const processedLocations = rawLocations.map(location => {
				const processed = {
					project_id: location.project_id,
					_avg: {
						decimalLatitude: location._sum.decimalLatitude! / location._count.decimalLatitude,
						decimalLongitude: location._sum.decimalLongitude! / location._count.decimalLongitude
					}
				};
				
				console.log(`Processed location for ${location.project_id}:`, processed);
				return processed;
			});

			console.log("Final processed locations:", processedLocations);
			setStudyLocations(processedLocations);
		});
	}, []);

	return (
		<div className="flex flex-col items-start h-full w-full">
			<MapContainer className="w-full h-full grow" center={centerStart} zoom={ZOOM_LEVEL}>
				<TileLayer
					attribution='Powered by <a href="https://www.esri.com/en-us/home" target="_blank">Esri</a>'
					url={`https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}?token=${ARCGIS_API_KEY}`}
				/>
				{studyLocations.map((location) => {
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
								<Popup>
									Study ID: {location.project_id}
								</Popup>
							</Marker>
						);
					}
					return null;
				})}
			</MapContainer>
		</div>
	);
}
