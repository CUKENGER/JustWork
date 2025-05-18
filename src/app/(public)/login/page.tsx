'use client'

import { Button } from '@/shared/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
	email: z.string().email('Неверный email'),
	password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
})

const errorMessages: Record<string, string> = {
	CredentialsSignin: 'Неверный логин или пароль',
}

export default function Login() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			password: '',
			email: '',
		},
	})

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		setIsLoading(true)
		const res = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
		})

		if (res?.ok) {
			router.push('/dashboard')
		} else {
			const rawErrorMessage =
				res?.error || 'Произошла ошибка. Попробуйте еще раз.'
			const userFriendlyMessage =
				errorMessages[rawErrorMessage] || rawErrorMessage
			form.setError('root', { message: userFriendlyMessage })
		}
		setIsLoading(false)
	}

	return (
		<div className='flex items-center justify-center h-full w-full'>
			<div className='sm:p-8 sm:pt-4 p-4 rounded-lg bg-card shadow-lg w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col gap-2'>
							<div className='flex flex-col gap-4'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<div className='relative'>
													<Mail
														className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
														size={18}
													/>
													<Input
														className='pl-10 bg-input text-foreground placeholder-muted-foreground'
														placeholder='Введите email'
														autoFocus
														aria-describedby='email-error'
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<div className='relative'>
													<Lock
														className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
														size={18}
													/>
													<Input
														type='password'
														className='pl-10'
														placeholder='Введите пароль'
														aria-describedby='password-error'
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage />
											<Link
												href='/forgot-password'
												className='text-sm text-primary hover:underline'
											>
												Забыли пароль?
											</Link>
										</FormItem>
									)}
								/>
							</div>
							<div className='flex flex-col gap-2'>
								{form.formState.errors.root && (
									<p className='text-red-500'>
										{form.formState.errors.root.message}
									</p>
								)}
								<Button disabled={isLoading} type='submit' className='w-full'>
									{isLoading ? 'Загрузка...' : 'Войти'}
								</Button>
								<Link href='/register'>
									<Button variant={'outline'} type='button' className='w-full'>
										Регистрация
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
