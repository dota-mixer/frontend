'use client'
import { HeroesGrid } from '@/components/heroes-grid'

export default function Heroes() {
	return (
		<main className='flex flex-col items-center justify-between gap-4 pt-4'>
			<h1 className='text-2xl font-bold'>Heroes</h1>
			<HeroesGrid />
		</main>
	)
}
