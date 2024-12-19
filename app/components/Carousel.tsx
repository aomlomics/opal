"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const carouselImgSrc = [
	`/images/carousel/bamboo_coral_m.jpg?v=${Date.now()}`,
	`/images/carousel/hydroid_medusa.jpg?v=${Date.now()}`,
	`/images/carousel/nice_squid_m.jpg?v=${Date.now()}`,
	`/images/carousel/polar_bear_m.jpg?v=${Date.now()}`,
	`/images/carousel/school_of_fish.jpg?v=${Date.now()}`,
	`/images/carousel/sculpin_on_coral_m.jpg?v=${Date.now()}`
];

export default function Carousel() {
	const [carouselActiveItem, setCarouselActiveItem] = useState(0);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		const play = setInterval(() => {
			let nextItem;
			do {
				nextItem = Math.floor(Math.random() * carouselImgSrc.length);
			} while (nextItem === carouselActiveItem); // Ensure we don't show the same image twice
			setCarouselActiveItem(nextItem);
		}, 11000);
		return () => clearInterval(play);
	}, [carouselActiveItem]);

	if (!isMounted) {
		return (
			<div className="relative w-full h-full">
				<div className="absolute inset-0">
					<Image src={carouselImgSrc[0]} alt="Carousel image 1" fill className="object-cover" priority />
				</div>
			</div>
		);
	}

	return (
		<div className="relative w-full h-full">
			{carouselImgSrc.map((imgSrc, index) => (
				<div
					key={imgSrc}
					className={`absolute inset-0 transition-opacity duration-[3000ms] ${
						index === carouselActiveItem ? "opacity-100" : "opacity-0"
					}`}
				>
					<Image
						src={imgSrc}
						alt={`Carousel image ${index + 1}`}
						fill
						className="object-cover"
						priority={index === carouselActiveItem}
					/>
				</div>
			))}
		</div>
	);
}
