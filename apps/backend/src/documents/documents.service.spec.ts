import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
// import { PDFDocument } from 'pdf-lib';
import { PDFCheckBox, PDFDocument, PDFForm, PDFTextField } from 'pdf-lib';

import { DocumentsService, STRING_FIELDS_MAPPING } from './documents.service';

const foreignerRegistrationFields = {
  addressHomeCountry: '123 Home St',
  addressKorea: '456 Korea Rd',
  dateOfBirth: '1990-01-15',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  mobile: '010-1234-5678',
  nationality: 'American',
  passportExpiryDate: '2030-01-01',
  passportIssueDate: '2020-01-01',
  passportNumber: '123456789',
  sex: 'Male',
  telephone: '02-9876-5432',
};

describe('DocumentsService', () => {
  let documentsService: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentsService],
    }).compile();

    documentsService = module.get<DocumentsService>(DocumentsService);
  });

  describe('registerForeignResident', () => {
    it('returns a StreamableFile', async () => {
      const result = await documentsService.registerForeignResident(
        foreignerRegistrationFields,
      );

      expect(result).toBeInstanceOf(StreamableFile);
    });
    describe('fillFormFields', () => {
      let textField: jest.Mocked<PDFTextField>;
      let checkBoxField: jest.Mocked<PDFCheckBox>;
      let pdfForm: jest.Mocked<PDFForm>;

      beforeEach(async () => {
        textField = {
          setText: jest.fn(),
        } as any;

        checkBoxField = {
          check: jest.fn(),
        } as any;

        pdfForm = {
          getCheckBox: jest.fn(() => checkBoxField),
          getTextField: jest.fn(() => textField),
        } as any;

        jest.spyOn(PDFDocument, 'load').mockResolvedValue({
          getForm: jest.fn(() => pdfForm),
          save: jest.fn().mockResolvedValue(Buffer.from('')),
        } as any);
      });
      it('should populate text fields and checkboxes correctly', async () => {
        const fieldsToFill: { [key: string]: string } = {
          birthDay: '15',
          birthMonth: '1',
          birthYear: '1990',
          ...foreignerRegistrationFields,
        };
        await documentsService.registerForeignResident(
          foreignerRegistrationFields,
        );

        for (const [key, pdfFieldName] of Object.entries(
          STRING_FIELDS_MAPPING,
        )) {
          expect(pdfForm.getTextField).toHaveBeenCalledWith(pdfFieldName);
          expect(textField.setText).toHaveBeenCalledWith(fieldsToFill[key]);
        }

        expect(pdfForm.getCheckBox).toHaveBeenCalledWith('sex-male');
        expect(checkBoxField.check).toHaveBeenCalled();
      });
    });
  });
});
