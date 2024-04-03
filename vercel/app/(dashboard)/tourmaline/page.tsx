import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TestClient from "@/components/TestClient";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import TourmalineForm from "@/components/tourmalineForm/TourmalineForm";

export default function Tourmaline() {
  return (
    <div className="flex flex-col items-center z-30 flex-1">
      <div className="w-1/2 max-w-4xl bg-neutral rounded-3xl mb-4">
        <Link href={"https://github.com/aomlomics/tourmaline"}>
          <div className="relative h-40 w-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-secondary font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Tourmaline</h1>
              <p className="text-primary font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">Amplicon Sequence Processing Workflow</p>
              <p className="text-secondary font-bold text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg">Click here to go to the official GitHub page</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex justify-center z-30 bg-neutral rounded-3xl p-2 w-full max-w-5xl">
        <TourmalineForm />
      </div>
    </div>
  );
}