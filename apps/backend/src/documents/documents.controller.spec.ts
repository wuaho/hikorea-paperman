import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { ForeignerRegistrationFormDto } from './dtos/foreigner-registration-form.dto';

describe('DocumentsController', () => {
  let documentsController: DocumentsController;
  let documentsService: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [DocumentsService],
    }).compile();

    documentsController = module.get<DocumentsController>(DocumentsController);
    documentsService = module.get<DocumentsService>(DocumentsService);
  });

  describe('submitForeignResidentRegistration', () => {
    it('calls DocumentsService and returns a StreamableFile', async () => {
      const dto: ForeignerRegistrationFormDto = {
        addressHomeCountry: '123 Main Street, Springfield, USA',
        addressKorea: '456 Gangnam-daero, Seoul, South Korea',
        dateOfBirth: '1995-05-15',
        email: 'example@example.com',
        firstName: 'John',
        lastName: 'Doe',
        mobile: '+1-555-123-4567',
        nationality: 'American',
        passportExpiryDate: '2030-12-31',
        passportIssueDate: '2020-01-01',
        passportNumber: 'A12345678',
        sex: 'Male',
        telephone: '+82-2-9876-5432',
      };

      const streamableFile = new StreamableFile(Buffer.from('Filled PDF'));

      jest
        .spyOn(documentsService, 'registerForeignResident')
        .mockResolvedValue(streamableFile);

      const result = await documentsController.registerForeignResident(dto);

      expect(documentsService.registerForeignResident).toHaveBeenCalledWith(
        dto,
      );
      expect(result).toBe(streamableFile);
    });
  });
});
