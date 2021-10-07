import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      code: status,
      message: 'Bad Request',
      timestamp: new Date().toISOString(),
      errors: (<any>exception.getResponse()).message.map(
        (error: ValidationError) => {
          return {
            param: error.property,
            value: error.value,
            msg: Object.values(error.constraints)[0],
          };
        },
      ),
    });
  }
}
