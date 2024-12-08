import {
  Body,
  Controller,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { DocumentsService } from './documents.service';
import { ForeignerRegistrationFormDto } from './dtos/foreigner-registration-form.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('/registerForeignResident')
  @UseInterceptors(FileInterceptor('signature'))
  async registerForeignResident(
    @Body() foreignerRegistrationForm: ForeignerRegistrationFormDto,
    @UploadedFile() signature: Express.Multer.File,
  ): Promise<StreamableFile> {
    return await this.documentsService.registerForeignResident(
      foreignerRegistrationForm,
      signature,
    );
  }
}
