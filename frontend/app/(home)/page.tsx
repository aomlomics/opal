import Image from "next/image";
import HomeHeader from "@/components/HomeHeader";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
	ssr: false,
});

export default async function Home() {
	return (
		<main className="flex flex-col grow bg-secondary text-white">
			<HomeHeader />
			<div className="relative w-full h-[500px] bg-black overflow-hidden">
				<Image
					src="/images/hero_image.png"
					alt="Hero Image"
					width={1920}
					height={600}
					priority
					className="w-full h-full object-cover brightness-110 saturate-150 blur-sm"
				/>
				<div className="absolute inset-0 bg-black/40"></div>
				<div className="absolute z-10 text-left text-white px-4 sm:px-6 lg:px-8 top-1/2 -translate-y-2/3">
					<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
						<span className="block text-primary animate-slide-in">Welcome</span>
					</h1>
					<div className="pl-1 text-lg sm:text-xl md:text-2xl mb-6 text-white">
							<span className="block text-3xl sm:text-4xl md:text-5xl">
								to the <span className="text-primary">NOAA Ocean DNA Explorer</span> <span className="text-white">(NODE)</span>
							</span>
							<div className="flex flex-wrap">
								<span>NODE is a data sharing platform, search engine, and visualization and analysis tool</span>
								<span> for ocean environmental DNA (eDNA) data</span>
							</div>
					</div>
					<a href="/search" className="btn bg-primary text-white hover:bg-primary/80 px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
						Start Searching
					</a>
				</div>
			</div>
			<div className="flex flex-col grow bg-secondary">
				<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
					<span className="block text-primary animate-slide-in">Data summary</span>
				</h1>
			</div>
			<div className="z-30 bg-secondary px-10 grow h-[500px]">
				<div className="flex h-full">
					<div className="w-3/4 h-full">
						<Map></Map>
					</div>
					<div className="w-1/2">Data Summary</div>
				</div>
				<div>test</div>
			</div>
		</main>
	);
}
