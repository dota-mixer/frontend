import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'

type RoleTabProps = {
	name: string
	matches: number
	winrate: number
}

function RoleTab({ name, matches, winrate }: RoleTabProps) {
	const t = useTranslations('HeroPage')

	return (
		<Button className='opacity-100 py-1 relative items-center font-medium border-t border-l border-r border-solid rounded-t-md bg-secondary/10 border-foreground/10 hover:bg-foreground/10 flex-col h-full'>
			<div className='flex font-bold gap-2 items-center justify-center text-sm lg:text-lg text-foreground/100'>
				{name}
			</div>
			<div className='mt-1 flex justify-evenly gap-1 text-foreground/[0.4] text-xs text-center'>
				<div className='flex flex-col'>
					<div className='text-yellow-400 font-bold text-[1.0rem]'>
						{matches}
					</div>
					<span className='text-[0.7rem] text-foreground/40 font-normal'>
						{t('matches')}
					</span>
				</div>
				<div className='flex flex-col'>
					<div className='text-green-400 font-bold text-[1.0rem] bg-green-950 opacity-85 rounded-sm'>
						{winrate}%
					</div>
					<span className='text-[0.7rem] text-foreground/40 font-normal'>
						{t('winrate')}
					</span>
				</div>
			</div>
		</Button>
	)
}

export function RolesTabs() {
	return (
		<div
			className='hidden lg:grid grid-cols-6 gap-2 justify-center mt-4 mx-auto'
			style={{ width: 'min(1300px, 100%)' }}
		>
			<RoleTab name='All Roles' matches={2116} winrate={53} />
			<RoleTab name='Carry' matches={2116} winrate={53} />
			<RoleTab name='Mid' matches={2116} winrate={53} />
			<RoleTab name='Offlane' matches={2116} winrate={53} />
			<RoleTab name='Support' matches={2116} winrate={53} />
			<RoleTab name='Hard Support' matches={2116} winrate={53} />
		</div>
	)
}
