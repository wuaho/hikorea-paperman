import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const isProd = process.env.NODE_ENV === 'production';
  console.log('prod:', isProd);

  const allowedOrigins: any[] = [
    process.env.PROD_FRONTEND_URL,
    process.env.MOBILE_FRONTEND_URL,
  ];

  app.enableCors({ origin: isProd ? allowedOrigins : true });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
