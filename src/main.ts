import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('NestBootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1'); 
  
  const config = new DocumentBuilder()
    .setTitle('FisioNat Microservice API')
    .setDescription('The FisioNat Microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // CORS abierto para que acepte peticiones de cualquier origen (incluyendo Vercel)
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  
  logger.log(`Listen on port ${port}`);
}
bootstrap();