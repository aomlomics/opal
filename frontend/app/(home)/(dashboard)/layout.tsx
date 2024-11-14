import Header from "@/app/components/header/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}
