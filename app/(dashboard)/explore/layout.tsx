export default function ExploreLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col space-y-8 p-4">
			<div className="bg-base-200 p-6 rounded-lg">{children}</div>
		</div>
	);
}
