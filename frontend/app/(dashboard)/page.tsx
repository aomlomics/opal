import Image from "next/image";

export default async function Dashboard() {
	return (
		<main className="flex flex-col gap-5 grow">
			<Image priority={true} src="/images/beautiful-photo-sea-waves_58702-11300.avif" alt="" className="fixed z-0 object-cover min-h-full w-full" width={1920} height={500}/>
			<div className="z-30 mx-20 my-10">
				<div className="carousel w-full">
					<div id="slide1" className="carousel-item relative w-full">
						<Image
						src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
						alt=""
						width={1920} height={500}
						className="w-full" />
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide4" className="btn btn-circle">❮</a>
							<a href="#slide2" className="btn btn-circle">❯</a>
						</div>
					</div>
					<div id="slide2" className="carousel-item relative w-full">
						<Image
						src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
						alt=""
						width={1920} height={500}
						className="w-full" />
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide1" className="btn btn-circle">❮</a>
							<a href="#slide3" className="btn btn-circle">❯</a>
						</div>
					</div>
					<div id="slide3" className="carousel-item relative w-full">
						<Image
						src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
						alt=""
						width={1920} height={500}
						className="w-full" />
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide2" className="btn btn-circle">❮</a>
							<a href="#slide4" className="btn btn-circle">❯</a>
						</div>
					</div>
					<div id="slide4" className="carousel-item relative w-full">
						<Image
						src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
						alt=""
						width={1920} height={500}
						className="w-full" />
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide3" className="btn btn-circle">❮</a>
							<a href="#slide1" className="btn btn-circle">❯</a>
						</div>
					</div>
				</div>
			</div>
			<div className="z-30 bg-base-100 px-20 grow">
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
				<div>test</div>
			</div>
		</main>
	);
}
