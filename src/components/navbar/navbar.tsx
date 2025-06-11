'use client'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { toast, Toaster } from 'sonner'
import ThemeToggle from '../theme-toggle'
import { Logo } from './logo'
import { NavMenu } from './nav-menu'
import { NavigationSheet } from './navigation-sheet'

const Navbar = () => {
	const t = useTranslations('Nav')
	const { resolvedTheme } = useTheme()

	return (
		<nav className='h-16 bg-background border-b border-accent'>
			<div className='h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6'>
				<Logo />

				{/* Desktop Menu */}
				<NavMenu className='hidden md:block' />

				<div className='flex items-center gap-3'>
					<ThemeToggle />
					<Toaster
						position='top-center'
						theme={resolvedTheme as 'light' | 'dark' | 'system' | undefined}
					/>
					<Button
						onClick={() =>
							toast(t('toasterText'), {
								action: {
									label: t('toasterButton'),
									onClick: () => {},
								},
							})
						}
						variant='outline'
						className='hidden sm:inline-flex'
					>
						{t('signIn')}
					</Button>
					<Button className='hidden xs:inline-flex'>Get Started</Button>

					{/* Mobile Menu */}
					<div className='md:hidden'>
						<NavigationSheet />
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
