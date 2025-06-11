'use client'
import { HeroesService, HeroOut } from '@/client'
import { HeroHeader } from '@/components/hero/HeroHeader'
import { ItemsStatsTable } from '@/components/hero/ItemsStatsTable'
import { useEffect, useState } from 'react'

type HeroPageProps = {
	params: Promise<{
		heroName: string
	}>
}

export default function HeroPage({ params }: HeroPageProps) {
	const [heroName, setHeroName] = useState<string | undefined>(undefined)
	const [hero, setHero] = useState<HeroOut | null>(null)

	useEffect(() => {
		params.then((resolvedParams) => {
			setHeroName(resolvedParams.heroName)
		})
	}, [params])

	useEffect(() => {
		if (heroName) {
			async function fetchHero() {
				const response = await HeroesService.readHeroByName({ name: heroName! })
				setHero(response)
			}
			fetchHero()
		}
	}, [heroName])

	return (
		<main>
			<div className='w-[99%]'>
				{hero ? (
					<div className='flex flex-col items-center justify-between gap-4 pt-4'>
						<HeroHeader {...hero} />
						<ItemsStatsTable heroId={hero.hero_id} />
					</div>
				) : (
					<p>Loading hero...</p>
				)}
			</div>
		</main>
	)
}
