import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  controllers: [],
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60000,
        },
      ],
    }),
    ConfigModule.forRoot({ envFilePath: '../../.env' }),
    AuthModule,
    DocumentsModule,
  ],
  providers: [],
})
export class AppModule {}
