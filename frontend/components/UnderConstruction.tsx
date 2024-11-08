import Image from "next/image";

{/* I am aware this looks terrible...it is a placeholder for now - bayden*/}
export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <div className="bg-neutral rounded-xl p-8 max-w-2xl text-center">
        {/* <Image
          src="/images/under_construction.svg"
          alt="Under Construction"
          width={200}
          height={200}
          className="mx-auto mb-6"
        /> */}
        <h1 className="text-4xl font-bold text-primary mb-4">NODE is actively under construction</h1>
        <p className="text-lg text-white">
          The dev team is working hard to bring you this feature. Please check back soon!
        </p>
      </div>
    </div>
  );
} 