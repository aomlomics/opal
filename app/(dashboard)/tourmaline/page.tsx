import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TestClient from "@/components/TestClient";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import FileUploadForm from "@/components/TourmalineForm";

//Code for interface on Form values, if needed
/*
interface FormValues {
	fastqSequences: File[] | null;
	metadata: File | null;
	manifestFile: File | null;
	refDatabase1: File | null;
	refDatabase2: File | null;
  }
*/


export default function Tourmaline() {
	
	return (
			<div className="flex justify-center z-30 flex-1">
				<div className="normal-case text-xl h-40 w-100 bg-neutral rounded-3xl">
					<Link href={"https://github.com/aomlomics/tourmaline"}>
					<div className="avatar w-full h-full">
						<Image src="/images/tourmalineLogo.png" alt="" fill={true} style={{objectFit: "contain"}}/>
					</div>
					</Link>

					<div className="flex justify-center">
					<p>This is where the Tourmaline form will be for input parameters and files.</p>
					</div>

					<div className="flex justify-center z-30 bg-accent rounded-3xl">
						<div className="h-100 w-120 rounded-3xl">
							<FileUploadForm/>
						</div>
					</div>

				</div>
			</div>
	);
}