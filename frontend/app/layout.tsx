import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
	weight: ['300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata = {
	title: "Opal",
	description: "Omics Portal and Analysis Lab"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={openSans.className}>
				<ClerkProvider appearance={{ elements: { footer: "hidden" } }}>
					<body className="bg-secondary text-white">
						{children}
					</body>
				</ClerkProvider>
			</body>
		</html>
	)
}
