'use client'

import { HeroesService, HeroOut } from '@/client'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function TopHeroesTable() {
	const t = useTranslations('HeroesTable')
	const [data, setData] = useState<HeroOut[]>([])

	useEffect(() => {
		async function fetchHeroes() {
			const { data } = await HeroesService.getHeroes()
			setData(data)
		}
		fetchHeroes()
	}, [])

	return (
		<div className='h-[calc(100vh-192px)] overflow-auto w-full md:w-3/4 mx-auto bg-secondary/10 border border-accent/10 rounded-md '>
			<Table className='w-full'>
				<TableHeader>
					<TableRow>
						<TableHead>{t('row_hero')}</TableHead>
						<TableHead>{t('row_winrate')}</TableHead>
						<TableHead>{t('row_matches')}</TableHead>
						<TableHead>{t('row_rating')}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className=''>
					{data.map((hero) => (
						<TableRow key={hero.hero_id}>
							<TableCell className='font-medium'>
								<div className='flex items-center gap-2 hover:bg-secondary p-2 rounded-md'>
									<Image
										src={`https://dota2protracker.com/static/hero_images_jpg_res/${hero.npc}_lg.jpg`}
										alt={hero.name}
										className='rounded-md'
										width={70}
										height={70}
									/>
									<span>{hero.name}</span>
								</div>
							</TableCell>
							<TableCell
								className={`${
									hero.all_winrate && hero.all_winrate < 0.5
										? 'text-red-500'
										: 'text-green-500'
								}`}
							>
								{Math.round((hero.all_winrate ?? 0) * 1000) / 10}%
							</TableCell>
							<TableCell>{hero.all_matches}</TableCell>
							<TableCell>{hero.all_elo || 'N/A'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
