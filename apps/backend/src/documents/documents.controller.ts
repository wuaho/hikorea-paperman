import { Body, Controller, Post, StreamableFile } from '@nestjs/common';

import { DocumentsService } from './documents.service';
import { ForeignerRegistrationFormDto } from './dtos/foreigner-registration-form.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('/registerForeignResident')
  async registerForeignResident(
    @Body() foreignerRegistrationForm: ForeignerRegistrationFormDto,
  ): Promise<StreamableFile> {
    return await this.documentsService.registerForeignResident(
      foreignerRegistrationForm,
    );
  }
}
