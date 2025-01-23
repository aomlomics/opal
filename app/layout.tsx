import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Source_Sans_3 } from "next/font/google";
import ScrollToTop from "@/app/components/ScrollToTop";

const sourceSans = Source_Sans_3({
	weight: ["300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	display: "swap"
});

const localization = {
	signIn: {
		start: {
			title: "Sign in to NODE",
			subtitle:
				"You must use a NOAA (@noaa.gov) or NGI (@ngi.msstate.edu) email using Google or Microsoft respectively.",
			actionText: "You must use a NOAA or MSState email address to sign in.",
			actionLink: "test"
		}
	}
};

export const metadata = {
	title: "NODE",
	description: "NOAA Ocean DNA Explorer"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<body className={`${sourceSans.className} bg-base-100 text-base-content`}>
				<ClerkProvider appearance={{ elements: { footer: "hidden" } }} localization={localization}>
					{children}
				</ClerkProvider>
				<ScrollToTop />
			</body>
		</html>
	);
}
