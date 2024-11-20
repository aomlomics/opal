import Image from "next/image";

export default function Footer() {
    return(
        <footer className="footer pl-1 text-neutral-content mt-auto z-30 bg-base-100 border-t-4 border-primary flex items-stretch">
            <div className="text-left pt-1 text-base-content">
                <p className="-mb-3">Copyright © 2024 - All Rights Reserved.</p>
                <p className="text-base-content hover:underline -mb-3">
                    <a href="https://www.aoml.noaa.gov/">NOAA's Atlantic Oceanographic and Meteorological Laboratory</a>
                </p>
                <p className="text-primary hover:underline">
                    <a href="/about">Report an Issue</a>
                </p>
            </div>
            
            <div className="flex items-stretch justify-end ml-auto">
                <div className="bg-info-content rounded-l-lg flex items-center px-6 h-full">
                    <div className="relative h-12 w-32 self-center mb-1">
                        <Image 
                            src="/images/Noaa_exploration_light.svg"
                            alt="NOAA Exploration Logo"
                            fill={true}
                            style={{
                                objectFit: "contain",
                                marginTop: "3px"
                            }}
                        />
                    </div>
                    <div className="pt-3 ml-10 self-center mb-2">
                        <Image 
                            src="/images/HORIZONTAL_WEB_white_maroon.svg"
                            alt="MSU NGI Logo"
                            width={250}
                            height={60}
                            style={{objectFit: "contain"}}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}