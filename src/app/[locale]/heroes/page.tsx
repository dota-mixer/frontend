'use client'
import { HeroesGrid } from '@/components/heroes-grid'
import { useTranslations } from 'next-intl'

export default function Heroes() {
	const t = useTranslations('HeroesGrid')
	return (
		<main className='flex flex-col items-center justify-between gap-4 pt-4'>
			<h1 className='text-2xl font-bold'>{t('gridTitle')}</h1>
			<HeroesGrid />
		</main>
	)
}
