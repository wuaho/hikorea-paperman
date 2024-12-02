import { Module } from '@nestjs/common';

import { DocumentsModule } from './documents/documents.module';

@Module({
  controllers: [],
  imports: [DocumentsModule],
  providers: [],
})
export class AppModule {}
