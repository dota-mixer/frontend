import { TopHeroesTable } from '@/components/heroes-table'

export default function Home() {
	return (
		<main className='flex flex-col items-center justify-between gap-4 pt-4'>
			<h1 className='text-2xl font-bold'>Top Heroes</h1>
			<TopHeroesTable />
		</main>
	)
}
