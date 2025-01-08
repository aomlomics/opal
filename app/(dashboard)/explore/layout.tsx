import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/app/components/Map"), {
	ssr: false
});

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col space-y-8 p-4">
			<div className="h-[400px] rounded-lg overflow-hidden bg-base-200">
				<Map />
			</div>
			<div className="bg-base-200 p-6 rounded-lg">{children}</div>
		</div>
	);
}
