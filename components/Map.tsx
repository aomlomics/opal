"use client"

import React, { useState, useRef } from 'react'
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MyMap() {
	const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
	const ZOOM_LEVEL = 9
	const mapRef = useRef()

	return (
		<MapContainer className='min-w-full' center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
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
	)
}