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
      <div className="text-xl w-1/2 max-w-4xl bg-neutral rounded-3xl mb-4">
        <Link href={"https://github.com/aomlomics/tourmaline"}>
          <div className="relative h-40 w-full">
            <Image src="/images/tourmalineLogo.png" alt="" layout="fill" objectFit="contain"/>
          </div>
        </Link>
      </div>

      <div className="flex justify-center z-30 bg-neutral rounded-3xl p-2 w-full max-w-5xl">
        <TourmalineForm/>
      </div>
    </div>
  );
}