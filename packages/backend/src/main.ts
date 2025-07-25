import { Logger as defaultLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as timeout from 'connect-timeout';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ApiError } from 'exceptions/api.error';
import { AllExceptionsFilter } from 'exceptions/allExceptionFilter';
import { ERROR_CODES } from 'constants/error-codes';
import type { Request, Response, NextFunction } from 'express';
import { LoggingInterceptor } from 'interceptors/logging.interceptor';

dotenv.config();

const start = async () => {
  try {
    const PORT = Number(process.env.SERVER_PORT) || 5000;
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });
    const logger = app.get(Logger);
    app.enableCors({
      credentials: true,
      origin: [
        process.env.CLIENT_URL || 'http://localhost:5173',
        'http://mp-client:5173',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Range',
        'X-Chunk-Duration',
        'Content-Range',
        'Accept-Ranges',
        'Content-Length',
      ],
      exposedHeaders: ['X-Chunk-Duration', 'Content-Range'],
    });
    app.use((req: Request, res: Response, next: NextFunction) => {
      logger.debug(`Request: ${req.method} ${req.url}`, 'RequestLogger');
      res.on('finish', () => {
        logger.debug(`Response: ${res.statusCode}`, 'ResponseLogger');
      });
      next();
    });
    app.use(cookieParser());
    app.use(compression());

    app.use(timeout('130s'));

    const config = new DocumentBuilder()
      .setTitle('JustWork API')
      .setDescription('Freelance for poor')
      .setVersion('1.0.0')
      .addTag('CUKENGER')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document, {
      jsonDocumentUrl: 'swagger/json',
    });
    app.useLogger(logger);
    app.useGlobalInterceptors(new LoggingInterceptor(logger));
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: errors => {
          const formattedErrors = errors.map(err => {
            const messages = Object.values(err.constraints || {});
            return {
              field: err.property.split(' '),
              messages: messages.length ? messages : ['Unknown error'],
            };
          });
          const response = {
            message: `Validation failed`,
            errors: formattedErrors,
          };
          return ApiError.BadRequest(
            response.message,
            ERROR_CODES.BAD_REQUEST,
            response.errors,
          );
        },
      }),
    );
    app.useGlobalFilters(new AllExceptionsFilter(logger));

    await app.listen(PORT);
    logger.log(`Server started at ${PORT}`);
    logger.log(`Application is running on: http://localhost:${PORT}`);
  } catch (e) {
    console.error('Error starts App', e);
    defaultLogger.error('Error starts App', e);
  }
};

start().catch(err => {
  console.error(err);
  process.exit(1);
});
