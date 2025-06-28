import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import * as path from 'path';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'exceptions/allExceptionFilter';
import { UserModule } from 'models/user/user.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    // JwtModule.register({
    //   secret: process.env.JWT_ACCESS_SECRET_KEY,
    //   signOptions: { expiresIn: '24h' },
    // }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: {
                colorize: true,
                colorizerFactory: true,
                translateTime: 'HH:MM:ss.l',
                ignore: 'pid,hostname, req.headers,context, request, req',
                errorProps: 'message,code,stack',
                errorLikeObjectKeys: ['err', 'error'],
                messageFormat: '{msg} {requestInfo}',
              },
            },
            {
              target: 'pino/file',
              options: {
                destination: path.resolve(__dirname, '/usr/app/logs/app.log'),
                mkdir: true,
              },
              level: 'error',
            },
          ],
        },
        level: 'debug',
        customSuccessMessage: (req, res) =>
          `✅ ${req.method} ${req.url} - ${res.statusCode}`,
        customErrorMessage: (req, _res, err) =>
          `❌ ${req.method} ${req.url} - ${err.message}`,
        serializers: {
          req: () => undefined,
          res: () => undefined,
          request: () => undefined,
          err: err => ({
            type: err.name,
            message: err.message,
            stack: err.stack,
          }),
        },
        redact: ['req.headers.authorization'],
      },
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule implements NestModule {
  configure(_consumer: MiddlewareConsumer) {
    // Здесь можно настроить middleware, если нужно
  }
}
