'use client'

import { HeroesService, HeroOut } from '@/client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroesGrid() {
	const t = useTranslations('HeroesGrid')
	const rolesMap = {
		1: t('carry'),
		2: t('mid'),
		3: t('offlane'),
		4: t('support'),
		5: t('fullSupport'),
	} as const

	const [groupedHeroes, setGroupedHeroes] = useState<Record<number, HeroOut[]>>(
		{
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
		}
	)

	useEffect(() => {
		const fetchHeroes = async () => {
			const { data } = await HeroesService.getHeroes()
			console.log(data)

			const result: Record<number, HeroOut[]> = {
				1: [],
				2: [],
				3: [],
				4: [],
				5: [],
			}

			for (const hero of data) {
				const matches = [
					hero.pos_1?.matches || 0,
					hero.pos_2?.matches || 0,
					hero.pos_3?.matches || 0,
					hero.pos_4?.matches || 0,
					hero.pos_5?.matches || 0,
				]
				const max = Math.max(...matches)
				const mainRole = matches.findIndex((m) => m === max) + 1
				result[mainRole].push(hero)
			}

			setGroupedHeroes(result)
		}

		fetchHeroes()
	}, [])

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full md:w-3/4'>
			{Object.entries(groupedHeroes).map(([role, heroes]) => (
				<div
					key={role}
					className='rounded-lg bg-secondary/10 p-4 border border-accent/10'
				>
					<h2 className='flex items-center text-lg font-normal gap-2'>
						<Image
							src={`https://dota2protracker.com/static/pos/pos_${role}.png`}
							alt={`position ${role}`}
							className='w-5 h-5 inline-block svelte-mbo9az'
							width={5}
							height={5}
						/>
						{rolesMap[role as unknown as keyof typeof rolesMap]}
					</h2>
					<HeroCardList heroes={heroes} />
				</div>
			))}
		</div>
	)
}

function HeroCardList({ heroes }: { heroes: HeroOut[] }) {
	return (
		<div className='flex gap-2 flex-wrap mt-4'>
			{heroes.map((hero) => (
				<div
					key={hero.npc}
					className={`flex flex-wrap items-center rounded-md hover:scale-110 transition-transform duration-200 border ${
						(console.log(hero.name, hero.all_winrate),
						(hero.all_winrate ?? 0) >= 0.5
							? 'border-[#EFAD38]'
							: 'border-accent opacity-95')
					}`}
				>
					<Link
						href={`/hero/${hero.npc}`}
						className='flex items-center gap-2'
						title={hero.name}
					>
						<Image
							src={`https://dota2protracker.com/static/hero_images_jpg_res/${hero.npc}_vert.jpg`}
							alt={hero.name}
							width={53}
							height={63}
							className='rounded-md bg-secondary/10'
						/>
					</Link>
				</div>
			))}
		</div>
	)
}
