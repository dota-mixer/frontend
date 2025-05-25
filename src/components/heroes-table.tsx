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
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type SortableColumn = keyof Pick<
	HeroOut,
	'name' | 'all_winrate' | 'all_matches' | 'all_elo'
>

interface SortConfig {
	key: SortableColumn
	direction: 'ascending' | 'descending'
}

interface TopHeroesTableProps {
	defaultSortKey?: SortableColumn
	defaultSortDirection?: 'ascending' | 'descending'
}

interface TableColumn {
	key: SortableColumn
	labelKey: 'row_hero' | 'row_winrate' | 'row_matches' | 'row_rating'
}

export function TopHeroesTable({
	defaultSortKey,
	defaultSortDirection,
}: TopHeroesTableProps) {
	const t = useTranslations('HeroesTable')
	const [data, setData] = useState<HeroOut[]>([])
	const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

	const columns: TableColumn[] = [
		{ key: 'name', labelKey: 'row_hero' },
		{ key: 'all_winrate', labelKey: 'row_winrate' },
		{ key: 'all_matches', labelKey: 'row_matches' },
		{ key: 'all_elo', labelKey: 'row_rating' },
	]

	useEffect(() => {
		async function fetchHeroes() {
			const response = await HeroesService.getHeroes()
			setData(response.data)

			const initialSortKey = defaultSortKey || 'all_elo'
			const initialSortDirection = defaultSortDirection || 'descending'
			setSortConfig({ key: initialSortKey, direction: initialSortDirection })
		}
		fetchHeroes()
	}, [defaultSortKey, defaultSortDirection])

	const sortedData = useMemo(() => {
		const sortableItems = [...data]
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				const aValue =
					a[sortConfig.key] ?? (sortConfig.key === 'name' ? '' : -Infinity)
				const bValue =
					b[sortConfig.key] ?? (sortConfig.key === 'name' ? '' : -Infinity)

				if (aValue < bValue) {
					return sortConfig.direction === 'ascending' ? -1 : 1
				}
				if (aValue > bValue) {
					return sortConfig.direction === 'ascending' ? 1 : -1
				}
				return 0
			})
		}
		return sortableItems
	}, [data, sortConfig])

	const requestSort = (key: SortableColumn) => {
		let direction: 'ascending' | 'descending' = 'ascending'
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
		) {
			direction = 'descending'
		}
		setSortConfig({ key, direction })
	}

	const getSortIndicator = (columnName: SortableColumn) => {
		if (!sortConfig || sortConfig.key !== columnName) {
			return <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
		}
		return sortConfig.direction === 'ascending' ? (
			<ArrowUp className='ml-2 h-4 w-4' />
		) : (
			<ArrowDown className='ml-2 h-4 w-4 text-yellow-500' />
		)
	}

	return (
		<div className='h-[calc(100vh-192px)] overflow-auto w-full md:w-3/4 mx-auto bg-secondary/10 border border-accent/10 rounded-md '>
			<Table className='w-full'>
				<TableHeader className='sticky top-0 z-10 bg-background/95'>
					<TableRow>
						{columns.map((column) => (
							<TableHead
								key={column.key}
								className='cursor-pointer'
								onClick={() => requestSort(column.key)}
							>
								<div className='flex items-center text-foreground/80 hover:text-foreground'>
									{t(column.labelKey)}
									<span className='text-muted-foreground/90'>
										{getSortIndicator(column.key)}
									</span>
								</div>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody className=''>
					{sortedData.map((hero) => (
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
							<TableCell>{hero.all_matches ?? 0}</TableCell>
							<TableCell>
								{hero.all_elo ? Math.round(hero.all_elo) : 'N/A'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
