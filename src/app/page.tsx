import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<main className='h-screen flex flex-col items-center gap-2 p-4'>
			<h1 className='text-3xl font-bold'>Hello world!</h1>
			<Button variant='default'>Hello</Button>
		</main>
	)
}
