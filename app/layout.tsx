import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Opal',
	description: 'Omics Portal and Analysis Lab'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
