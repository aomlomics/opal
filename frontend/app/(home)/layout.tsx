import Footer from "@/app/components/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			{children}
			<Footer />
		</div>
	);
}
