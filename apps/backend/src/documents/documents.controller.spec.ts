import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { ForeignRegistrationFormDto } from './dtos/foreign-registration-form.dto';

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
      const dto: ForeignRegistrationFormDto = {
        addressHomeCountry: '123 Main Street, Springfield, USA',
        addressKorea: '456 Gangnam-daero, Seoul, South Korea',
        dateOfBirth: '1995-05-15',
        email: 'example@example.com',
        firstName: 'John',
        lastName: 'Doe',
        mobile: '+82-10-1234-5678',
        nationality: 'American',
        passportExpiryDate: '2030-12-31',
        passportIssueDate: '2020-01-01',
        passportNumber: 'A12345678',
        phoneNumber: '+1-555-123-4567',
        sex: 'Male',
        telephone: '+82-2-1234-5678',
        telephoneNumber: '+82-2-9876-5432',
      };

      const streamableFile = new StreamableFile(Buffer.from('Filled PDF'));

      jest
        .spyOn(documentsService, 'submitForeignResidentRegistration')
        .mockResolvedValue(streamableFile);

      const result =
        await documentsController.submitForeignResidentRegistration(dto);

      expect(
        documentsService.submitForeignResidentRegistration,
      ).toHaveBeenCalledWith(dto);
      expect(result).toBe(streamableFile);
    });
  });
});
