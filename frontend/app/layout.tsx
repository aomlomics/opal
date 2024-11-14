import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
	weight: ['300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata = {
	title: "Node",
	description: "NOAA Ocean DNA Explorer"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${openSans.className} bg-base-100 text-base-content`}>
				<ClerkProvider appearance={{ elements: { footer: "hidden" } }}>
					{/* <Providers> */}
						{children}
					{/* </Providers> */}
				</ClerkProvider>
			</body>
		</html>
	)
}
