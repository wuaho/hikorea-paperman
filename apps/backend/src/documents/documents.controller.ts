import { Body, Controller, Post, StreamableFile } from '@nestjs/common';

import { DocumentsService } from './documents.service';
import { ForeignRegistrationFormDto } from './dtos/foreign-registration-form.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('/submitForeignResidentRegistration')
  async submitForeignResidentRegistration(
    @Body() foreignRegistrationForm: ForeignRegistrationFormDto,
  ): Promise<StreamableFile> {
    return await this.documentsService.submitForeignResidentRegistration(
      foreignRegistrationForm,
    );
  }
}
