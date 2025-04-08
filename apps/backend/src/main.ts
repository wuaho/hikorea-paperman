import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const isProd = process.env.NODE_ENV === 'production';
  console.log('prod:', isProd);

  app.enableCors({ origin: isProd ? process.env.PROD_FRONTEND_URL : true });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
