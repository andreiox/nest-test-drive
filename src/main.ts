import {
  BadRequestException,
  RequestMethod,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './system/filters/badrequest.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.useGlobalFilters(new BadRequestExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      validateCustomDecorators: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest Test Drive')
    .setDescription('Taking nestjs for a spin!')
    .setVersion('1.0')
    .addTag('User')
    .addServer(process.env.HOST || 'http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
