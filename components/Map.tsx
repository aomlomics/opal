"use client"

import React, { useState, useRef} from 'react'
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"


export default function MyMap() {
	const [center, setCenter] = useState({ lat: 25.7617, lng: -80.8918 })
	const ZOOM_LEVEL = 7
	const mapRef = useRef()

	return (
		<div style={{ width: '95vh', height: '75vh', marginLeft:'116.5vh'}}>
		  <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false} style={{ width: '100%', height: '80%' }}>
			<TileLayer
			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={center}>
			  <Popup>
				A pretty CSS3 popup. <br /> Easily customizable.
			  </Popup>
			</Marker>
		  </MapContainer>
		</div>
	  );
	};