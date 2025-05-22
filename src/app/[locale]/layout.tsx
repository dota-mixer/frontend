import { Navbar } from '@/components/navbar'
import { routing } from '@/i18n/routing'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { notFound } from 'next/navigation'
import './globals.css'

// import { OpenAPI } from '@/client'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

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
	icons: {
		icon: '/assets/images/favicon.ico',
	},
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${geistSans.className} ${geistMono.variable} antialiased`}
			>
				<NextIntlClientProvider locale={locale} now={new Date()} timeZone='UTC'>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<Navbar />
						{children}
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
