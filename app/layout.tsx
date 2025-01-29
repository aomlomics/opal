import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Source_Sans_3 } from "next/font/google";
import ScrollToTop from "@/app/components/ScrollToTop";

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
				<ClerkProvider
					appearance={{
						elements: {
							footer: "hidden",
							logoImage: {
								width: "1200px"
							}
						}
					}}
					localization={{
						signIn: {
							start: {
								title: "Continue to NODE",
								__experimental_titleCombined: "Continue to NODE",
								subtitle:
									"Sign in with a NOAA (@noaa.gov) or NGI (@ngi.msstate.edu) email using Google or Microsoft respectively.",
								// @ts-ignore - subtitleCombined is needed for the UI but not in types
								subtitleCombined:
									"Sign in with a NOAA (@noaa.gov) or NGI (@ngi.msstate.edu) email using Google or Microsoft respectively.",
								actionText: "You must use a NOAA or MSState email address to sign in."
							}
						},
						socialButtonsBlockButton__google: "NOAA Users",
						socialButtonsBlockButton__microsoft: "MSU Users",
						dividerText: "or",
						formFieldLabel: {
							emailAddress: "Email Address"
						}
					}}
					signInFallbackRedirectUrl="/dashboard"
					fallbackRedirectUrl="/dashboard"
					after_sign_in_url="/dashboard"
				>
					{children}
				</ClerkProvider>
				<ScrollToTop />
			</body>
		</html>
	);
}
