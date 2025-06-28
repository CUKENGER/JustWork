import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ApiError } from './api.error';
import { ERROR_CODES, ErrorCodeType } from 'constants/error-codes';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code: ErrorCodeType = ERROR_CODES.INTERNAL_SERVER_ERROR;
    let errors: unknown = null;

    if (exception instanceof ApiError) {
      status = exception.status;
      message = exception.message;
      code = exception.code;
      errors = exception.errors;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : typeof exceptionResponse === 'object' &&
              'message' in exceptionResponse
            ? (exceptionResponse.message as string)
            : message;
      code =
        status === HttpStatus.NOT_FOUND
          ? ERROR_CODES.NOT_FOUND
          : status === HttpStatus.UNAUTHORIZED
            ? ERROR_CODES.INVALID_CREDENTIALS
            : code;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    if (
      request.url === '/favicon.ico' &&
      exception instanceof NotFoundException
    ) {
      status = HttpStatus.NOT_FOUND;
      message = 'Favicon not found';
      code = ERROR_CODES.NOT_FOUND;
    }

    const logMessage = `${request.method} ${request.url} failed: ${message} (code: ${code})`;
    this.logger.error(
      logMessage,
      exception instanceof Error ? exception.stack : undefined,
    );

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      code,
      ...(errors && typeof errors === 'object' ? { errors } : {}),
    };

    response.status(status).json(responseBody);
  }
}
