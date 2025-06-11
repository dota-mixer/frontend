'use client'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'
import { Home, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
	{ href: '/', labelKey: 'home', Icon: Home },
	// { href: '/meta', labelKey: 'meta', Icon: BarChart3 },
	{ href: '/heroes', labelKey: 'heroes', Icon: Users },
]

export const NavMenu = (props: NavigationMenuProps) => {
	const t = useTranslations('Nav')
	const pathname = usePathname().slice(3) || '/'

	return (
		<NavigationMenu {...props}>
			<NavigationMenuList className='gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start'>
				{navItems.map(({ href, labelKey, Icon }) => {
					const isActive = pathname === href
					return (
						<NavigationMenuItem key={href}>
							<NavigationMenuLink asChild active={isActive} className=''>
								<Link
									href={href}
									className={`flex flex-row items-center gap-2 ${
										isActive
											? 'bg-accent font-medium focus-visible:transform'
											: ''
									}`}
								>
									<Icon className={`h-4 w-4`} />
									{t(labelKey)}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					)
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
