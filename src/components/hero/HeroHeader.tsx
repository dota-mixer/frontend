// src/components/hero/HeroHeader.tsx
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { RolesTabs } from './RoleTabs'

type HeroHeaderProps = {
	heroName: string
	// Добавьте сюда реальные пропсы для матчей и винрейта, когда будете их загружать
	// matches: number;
	// winrate: number;
}

export function HeroHeader({ heroName }: HeroHeaderProps) {
	const t = useTranslations('HeroPage')
	return (
		<Card className='w-full bg-secondary/10'>
			<CardContent>
				<div className='flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-6 py-4'>
					<div className='flex gap-6 items-center'>
						<Image
							src={`https://dota2protracker.com/static/hero_images_jpg_res/${decodeURIComponent(
								heroName
							)}_lg.jpg`}
							className='rounded-md object-cover border-solid border-white/10 border-1'
							alt={decodeURIComponent(heroName)}
							width={110}
							height={62}
						/>
						<div className='text-[32px] text-foreground font-black'>
							{decodeURIComponent(heroName)}
						</div>
					</div>
					<div className='flex gap-4 items-center bg-secondary/15 px-4 py-2 rounded-md border border-solid border-white/10'>
						<div className='text-foreground/60 text-sm flex flex-col items-center'>
							<span className='text-yellow-400 font-bold'>2116</span>
							{t('matches')}
						</div>
						<div className='text-foreground/60 text-sm flex flex-col items-center'>
							<span className='text-green-400 font-bold'>53%</span>
							{t('winrate')}
						</div>
					</div>
				</div>
				<div className='text-center text-foreground/70 text-sm mt-2 mb-6'>
					{t('roleStats')}
				</div>

				<div>
					<RolesTabs />
				</div>
			</CardContent>
		</Card>
	)
}
