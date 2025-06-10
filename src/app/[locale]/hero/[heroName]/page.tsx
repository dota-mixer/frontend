// src/app/[locale]/hero/[heroName]/page.tsx
import { HeroHeader } from '@/components/hero/HeroHeader'

type HeroPageProps = {
	params: {
		heroName: string
	}
}

export default function HeroPage({ params }: HeroPageProps) {
	const { heroName } = params

	return (
		<main className='flex flex-col items-center justify-between gap-4 pt-4'>
			<div className='w-[99%]'>
				<HeroHeader heroName={heroName} />
			</div>
		</main>
	)
}
