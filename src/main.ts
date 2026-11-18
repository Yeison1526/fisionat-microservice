import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NestBootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Prefijo global limpio (sin barras dobles al inicio o final)
  app.setGlobalPrefix('api/v1');

  // 2. Configuración de CORS segura para tus dominios de Vercel y desarrollo local
  const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:4200,https://fisionat-fe.vercel.app')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // 3. Pipes de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  // 4. Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('FisioNat Microservice API')
    .setDescription('API del microservicio de FisioNat. Incluye endpoints de gestión de solicitudes de contacto.')
    .setVersion('1.0')
    .addTag('Mail', 'Endpoints relacionados con correos y solicitudes de contacto')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // 5. Puerto seguro con respaldo por defecto
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  
  logger.log(`Microservicio HTTP corriendo en el puerto: ${port}`);
  logger.log(`Swagger disponible en la ruta: /api/docs`);
}

void bootstrap();