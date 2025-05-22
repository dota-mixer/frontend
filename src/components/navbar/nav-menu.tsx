'use client'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const NavMenu = (props: NavigationMenuProps) => {
	const t = useTranslations('Nav')

	return (
		<NavigationMenu {...props}>
			<NavigationMenuList className='gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start'>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link href='/'>{t('home')}</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link href='/meta'>{t('meta')}</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link href='/heroes'>{t('heroes')}</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
