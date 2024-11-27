import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';

@Module({
  controllers: [AppController],
  imports: [DocumentsModule],
  providers: [AppService],
})
export class AppModule {}
