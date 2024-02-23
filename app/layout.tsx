import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Opal',
	description: 'Omics Portal and Analysis Lab'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClerkProvider appearance={{ elements: { footer: "hidden" } }}>
					{children}
				</ClerkProvider>
			</body>
		</html>
	)
}
