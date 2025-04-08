import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DocumentsModule } from './documents/documents.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../.env' }),
    DocumentsModule,
  ],
  providers: [],
})
export class AppModule {}
