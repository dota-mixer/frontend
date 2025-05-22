import { TopHeroesTable } from '@/components/heroes-table'
import { useTranslations } from 'next-intl'

export default function Home() {
	const t = useTranslations('HeroesTable')

	return (
		<main className='flex flex-col items-center justify-between gap-4 pt-4'>
			<h1 className='text-2xl font-bold'>{t('title')}</h1>
			<TopHeroesTable />
		</main>
	)
}
