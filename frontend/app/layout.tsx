import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({
	weight: ["300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	display: "swap"
});

export const metadata = {
	title: "NODE",
	description: "NOAA Ocean DNA Explorer"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<body className={`${sourceSans.className} bg-base-100 text-base-content`}>
				<ClerkProvider appearance={{ elements: { footer: "hidden" } }}>{children}</ClerkProvider>
			</body>
		</html>
	);
}
