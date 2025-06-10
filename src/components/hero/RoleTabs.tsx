import { HeroOut } from '@/client'
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
		<Button className='opacity-100 py-1 relative items-center font-medium border border-solid rounded-t-md bg-secondary/10 border-foreground/10 hover:bg-foreground/10 flex-col h-full'>
			<div className='flex font-bold gap-2 items-center justify-center text-sm lg:text-lg text-foreground/100'>
				{name}
			</div>
			<div className='flex justify-evenly gap-1 text-foreground/[0.4] text-xs text-center'>
				<div className='flex flex-col'>
					<div className='text-yellow-400 font-bold text-[1.0rem]'>
						{matches}
					</div>
					<span className='text-[0.7rem] text-foreground/40 font-normal'>
						{t('matches')}
					</span>
				</div>
				<div className='flex flex-col'>
					<div
						className={`font-bold text-[1.0rem] bg-green-950 opacity-85 rounded-sm ${
							winrate && winrate < 0.5
								? 'text-red-400 bg-red-950'
								: 'text-green-400 bg-green-950'
						}`}
					>
						{Math.round((winrate ?? 0) * 1000) / 10}%
					</div>
					<span className='text-[0.7rem] text-foreground/40 font-normal'>
						{t('winrate')}
					</span>
				</div>
			</div>
		</Button>
	)
}

export function RolesTabs(hero: HeroOut) {
	const t = useTranslations('RolesTabs')
	const rolesData = [
		{
			name: t('allRoles'),
			matches: hero.all_matches,
			winrate: hero.all_winrate,
		},
		{
			name: t('carry'),
			matches: hero.pos_1?.matches,
			winrate: hero.pos_1?.winrate,
		},
		{
			name: t('mid'),
			matches: hero.pos_2?.matches,
			winrate: hero.pos_2?.winrate,
		},
		{
			name: t('offlane'),
			matches: hero.pos_3?.matches,
			winrate: hero.pos_3?.winrate,
		},
		{
			name: t('support'),
			matches: hero.pos_4?.matches,
			winrate: hero.pos_4?.winrate,
		},
		{
			name: t('fullSupport'),
			matches: hero.pos_5?.matches,
			winrate: hero.pos_5?.winrate,
		},
	]

	return (
		<div
			className='hidden lg:grid grid-cols-6 gap-2 justify-center mt-4 mx-auto'
			style={{ width: 'min(1300px, 100%)' }}
		>
			{rolesData.map((role) => (
				<RoleTab
					key={role.name}
					name={role.name}
					matches={role.matches ?? 0}
					winrate={role.winrate ?? 0}
				/>
			))}
		</div>
	)
}
