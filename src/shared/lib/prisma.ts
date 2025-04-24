import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	// В режиме разработки используем глобальный объект для предотвращения множественных экземпляров
	const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
	if (!globalForPrisma.prisma) {
		globalForPrisma.prisma = new PrismaClient({
			log: ['query', 'info', 'warn', 'error'], // Включаем логирование для отладки
		});
	}
	prisma = globalForPrisma.prisma;
}

export default prisma;
