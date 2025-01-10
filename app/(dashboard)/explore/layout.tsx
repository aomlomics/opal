// import dynamic from "next/dynamic";
// const Map = dynamic(() => import("@/app/components/Map"), {
// 	ssr: false
// });

// export default function ExploreLayout({ children }: { children: React.ReactNode }) {
// 	return (
// 		<div className="flex flex-col p-6 max-w-[1400px] mx-auto">
// 			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// 				{/* Left side - Map */}
// 				<div className="lg:col-span-1">
// 					<div className="sticky top-28">
// 						<div className="h-[300px] rounded-xl overflow-hidden bg-base-200 shadow-lg">
// 							<Map />
// 						</div>
// 						<div className="mt-4 p-4 bg-base-200 rounded-xl shadow-lg">
// 							<h2 className="text-lg font-semibold text-base-content mb-2">Map Overview</h2>
// 							<p className="text-sm text-base-content/80">
// 								This map shows the geographical distribution of all projects in our database. Each marker represents the
// 								average longitude and latitude of all samples in a project.
// 							</p>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Right side - Content */}
// 				<div className="lg:col-span-2">
// 					<div className="bg-base-200 p-6 rounded-xl shadow-lg">{children}</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/app/components/Map"), {
	ssr: false
});

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col space-y-8 p-4">
			<div className="bg-base-200 p-6 rounded-lg">{children}</div>
		</div>
	);
}
