import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ROLES } from '@/entities/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/login')
	}

	// Пример условной отрисовки контента в зависимости от роли
	const renderRoleSpecificContent = () => {
		switch (session.user.role) {
			case ROLES[0].value:
				return (
					<div>
						<h2 className='text-xl font-semibold mt-4'>
							Freelancer Dashboard Content
						</h2>
						{/* Здесь будет форма или контент для фрилансера */}
						<p>This is the content specific to freelancers.</p>
						{/* <FreelancerForm /> */}{' '}
						{/* Пример использования отдельного компонента */}
					</div>
				)
			case ROLES[1].value:
				return (
					<div>
						<h2 className='text-xl font-semibold mt-4'>
							Client Dashboard Content
						</h2>
						{/* Здесь будет форма или контент для клиента */}
						<p>This is the content specific to clients.</p>
						{/* <ClientForm /> */}{' '}
						{/* Пример использования отдельного компонента */}
					</div>
				)
			default:
				return (
					<div>
						<h2 className='text-xl font-semibold mt-4'>
							Default Dashboard Content
						</h2>
						<p>
							Content for users with other roles or no specific role assigned.
						</p>
					</div>
				)
		}
	}

	return (
		<div className='flex items-center justify-center'>
			<div className='p-8 rounded-lg shadow-lg bg-secondary'>
				<h1 className='text-2xl font-bold mb-4'>
					Welcome, {session.user.name || 'User'}!
				</h1>
				<p>Role: {session.user.role}</p>
				<p>Email: {session.user.email}</p>
				{renderRoleSpecificContent()}{' '}
				{/* Отрисовываем контент в зависимости от роли */}
			</div>
		</div>
	)
}
