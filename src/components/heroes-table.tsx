import { HeroesService } from '@/client'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import Image from 'next/image'

export async function TopHeroesTable() {
	const { data } = await HeroesService.getHeroes()

	return (
		<div className='h-[calc(100vh-192px)] overflow-auto w-full md:w-3/4 mx-auto bg-secondary/10 border border-accent/10 rounded-md '>
			<Table className='w-full'>
				<TableHeader>
					<TableRow>
						<TableHead>Hero</TableHead>
						<TableHead>Winrate</TableHead>
						<TableHead>Matches</TableHead>
						<TableHead>Rating</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
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
							<TableCell>
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
