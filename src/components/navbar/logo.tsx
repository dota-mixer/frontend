import Image from 'next/image'

export const Logo = () => {
	return (
		<div className='relative w-[124px] h-[32px]'>
			<Image
				src='/assets/images/light-logo.png'
				alt='Logo light'
				fill
				className='block dark:hidden'
			/>
			<Image
				src='/assets/images/dark-logo.png'
				alt='Logo dark'
				fill
				className='hidden dark:block'
			/>
		</div>
	)
}
