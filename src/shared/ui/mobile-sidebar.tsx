'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Menu } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface MobileSidebarProps {
	children: ReactNode
}

export const MobileSidebar = ({ children }: MobileSidebarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<>
			{/* Кнопка для открытия меню */}
			<Button
				variant='outline'
				size='icon'
				className='rounded-full cursor-pointer'
				onClick={toggleMenu}
			>
				<Menu className='h-5 w-5' />
				<span className='sr-only'>Открыть меню</span>
			</Button>

			{/* Оверлей */}
			{isMenuOpen && (
				<div
					className='fixed inset-0 bg-black/50 z-40'
					onClick={toggleMenu}
				></div>
			)}

			{/* Контейнер сайдбара */}
			<div
				className={cn(
					'fixed top-0 left-0 h-full w-[18rem] bg-black z-[1000] transform ease-in-out transition-transform duration-300',
					isMenuOpen ? 'translate-x-0' : '-translate-x-full'
				)}
				style={{ zIndex: 1000 }}
			>
				{/* Кнопка закрытия внутри сайдбара */}
				<div className='flex justify-end p-4'>
					<Button variant='ghost' size='icon' onClick={toggleMenu}>
						<Menu className='h-5 w-5 rotate-90' />{' '}
						{/* Можно использовать иконку закрытия X */}
						<span className='sr-only'>Закрыть меню</span>
					</Button>
				</div>
				{/* Содержимое сайдбара */}
				{children}
			</div>
		</>
	)
}
