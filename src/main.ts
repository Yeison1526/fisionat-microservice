import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('FisioNat Microservice API')
    .setDescription(
      'API del microservicio de FisioNat. Incluye endpoints de gestión de solicitudes de contacto por correo.',
    )
    .setVersion('1.0')
    .addTag('Mail', 'Endpoints relacionados con correos y solicitudes de contacto')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`Microservicio HTTP corriendo en: http://localhost:${port}`);
  logger.log(`Swagger disponible en: http://localhost:${port}/api`);
}
void bootstrap();