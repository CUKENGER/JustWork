'use client'

import { PasswordInput, ROLES } from '@/entities/auth'
import { useRegister } from '@/features/auth'
import { Button, Form, IconInput } from '@/shared/ui'
import { SelectInput } from '@/shared/ui/SelectInput'
import { Briefcase, Mail, User } from 'lucide-react'
import Link from 'next/link'

export default function Register() {
	const { register, isLoading, error, form } = useRegister()

	return (
		<div className='flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full w-full'>
			<div className='sm:p-8 sm:pt-4 p-4 rounded-lg bg-card shadow-lg w-full max-w-xl mx-auto'>
				<h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
				<Form {...form}>
					<form onSubmit={register}>
						<div className='flex flex-col gap-4'>
							<div className='flex flex-col gap-4'>
								<IconInput
									control={form.control}
									name='name'
									label='Name'
									placeholder='Введите имя'
									icon={User}
								/>

								<IconInput
									control={form.control}
									name='email'
									label='Email'
									placeholder='Введите email'
									icon={Mail}
								/>

								<PasswordInput
									name='password'
									control={form.control}
									label='Введите пароль'
									placeholder='Введите пароль'
								/>
								<PasswordInput
									name='confirmPassword'
									control={form.control}
									label='Подтвердите пароль'
									placeholder='Подтвердите пароль'
								/>

								<SelectInput
									control={form.control}
									name='role'
									label='Role'
									placeholder='Выберите роль'
									icon={Briefcase}
									options={ROLES}
								/>
							</div>
							<div className='flex flex-col gap-2'>
								{error && <p className='text-red-500'>{error}</p>}
								<Button disabled={isLoading} type='submit' className='w-full'>
									{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
								</Button>
								<Link href='/login'>
									<Button variant='outline' type='button' className='w-full'>
										Вход
									</Button>
								</Link>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
