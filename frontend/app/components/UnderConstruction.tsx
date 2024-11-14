import Image from "next/image";

{/* I am aware this looks terrible...it is a placeholder for now - bayden*/}
export default function UnderConstruction() {
return (
    <div className="flex flex-col text-gray-800">
			<section className="max-w-2xl mx-auto py-16">
        <h1 className="text-secondary font-bold text-6xl text-center mb-4">NODE is Under Construction</h1>
        <div className="bg-gray-100 shadow-lg rounded-3xl p-8">
          <p className="mb-6">
		  The dev team is working hard to bring you this feature. Please check back soon!
          </p>
        </div>
      </section>
		</div>
  );
}
        {/* <Image
          src="/images/under_construction.svg"
          alt="Under Construction"
          width={200}
          height={200}
          className="mx-auto mb-6"
        /> */}