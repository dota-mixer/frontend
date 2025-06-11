'use client'

import { HeroesService } from '@/client'
import type { ItemStat } from '@/client/types.gen'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

interface ItemsStatsTableProps {
	heroId?: number
	position?: string
	days?: number
}

type SortableColumn =
	| 'item_name'
	| 'matches'
	| 'purchase_rate'
	| 'win_rate'
	| 'avg_purchase_time'

interface SortConfig {
	key: SortableColumn
	direction: 'ascending' | 'descending'
}

interface TableColumn {
	key: SortableColumn
	label: string
}

export function ItemsStatsTable({
	heroId,
	position = 'pos 2',
	days = 8,
}: ItemsStatsTableProps) {
	const [items, setItems] = useState<ItemStat[]>([])
	const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
	const columns: TableColumn[] = [
		{ key: 'item_name', label: 'Item' },
		{ key: 'matches', label: 'Matches' },
		{ key: 'purchase_rate', label: 'Purchase rate' },
		{ key: 'win_rate', label: 'Winrate' },
		{ key: 'avg_purchase_time', label: 'Avg Time' },
	]

	useEffect(() => {
		if (!heroId) return
		async function fetchItems() {
			const response = await HeroesService.readHeroItems({
				heroId: heroId!,
				position,
				days,
			})
			const allItems = response.facets[0].items
			setItems(allItems)
		}
		fetchItems()
	}, [heroId, position, days])

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

	const sortedItems = useMemo(() => {
		const sortableItems = [...items]
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				const aValue =
					a[sortConfig.key] ?? (sortConfig.key === 'item_name' ? '' : -Infinity)
				const bValue =
					b[sortConfig.key] ?? (sortConfig.key === 'item_name' ? '' : -Infinity)

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
	}, [items, sortConfig])

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

	const getItemImageUrl = (itemName: string) => {
		const formattedName = itemName
			.replace(/'s/g, 's')
			.replace(/\s+/g, '-')
			.toLowerCase()
		return `https://www.dotabuff.com/assets/items/${formattedName}.jpg`
	}

	return (
		<div className='h-[calc(100vh-192px)] overflow-auto w-full md:w-3/4 mx-auto bg-secondary/10 border border-foreground/10 rounded-md'>
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
									{column.label}
									<span className='text-muted-foreground/90'>
										{getSortIndicator(column.key)}
									</span>
								</div>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedItems.map(
						(item) => (
							console.log(item.item_name, getItemImageUrl(item.item_name)),
							(
								<TableRow key={item.item_id}>
									<TableCell className='flex items-center gap-2'>
										<Image
											src={getItemImageUrl(item.item_name)}
											alt={item.item_name}
											width={45}
											height={33}
											className='rounded-sm border border-foreground/10'
										/>
										<span>{item.item_name}</span>
									</TableCell>
									<TableCell>{item.matches}</TableCell>
									<TableCell>
										{Math.round((item.purchase_rate ?? 0) * 1000) / 10}%
									</TableCell>
									<TableCell>
										{Math.round((item.win_rate ?? 0) * 1000) / 10}%
									</TableCell>
									<TableCell>{item.avg_purchase_time}</TableCell>
								</TableRow>
							)
						)
					)}
				</TableBody>
			</Table>
		</div>
	)
}
