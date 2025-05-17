import { OpenAPI } from '@/client'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Dota Mixer',
	description: '',
}

OpenAPI.BASE = process.env.API_BASE_URL || '/api'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.className} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
