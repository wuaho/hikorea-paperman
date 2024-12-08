import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
// import { PDFDocument } from 'pdf-lib';
import { PDFCheckBox, PDFDocument, PDFForm, PDFTextField } from 'pdf-lib';

import { DocumentsService, STRING_FIELDS_MAPPING } from './documents.service';

const todayDate = '2022-02-02';
jest.useFakeTimers().setSystemTime(new Date(todayDate));

const foreignerRegistrationFields = {
  addressHomeCountry: '123 Home St',
  addressKorea: '456 Korea Rd',
  birthdate: '1990-01-15',
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
const signature = {
  buffer: Buffer.from('test'),
  mimetype: 'image/png',
  originalname: 'test-signature',
  path: 'sample.url',
} as Express.Multer.File;

describe('DocumentsService', () => {
  let documentsService: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentsService],
    }).compile();

    documentsService = module.get<DocumentsService>(DocumentsService);
  });

  describe('registerForeignResident', () => {
    let textField: jest.Mocked<PDFTextField>;
    let checkBoxField: jest.Mocked<PDFCheckBox>;
    let pdfForm: jest.Mocked<PDFForm>;

    beforeEach(async () => {
      const pdfImage = {
        height: 200,
        scaleToFit: jest.fn().mockReturnValue({ height: 13, width: 184 }),
        width: 300,
      };
      const pdfPage = {
        drawImage: jest.fn(),
      };

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
        embedPng: jest.fn().mockResolvedValue(pdfImage),
        getForm: jest.fn(() => pdfForm),
        getPages: jest.fn().mockReturnValue([pdfPage]),
        save: jest.fn().mockResolvedValue(Buffer.from('')),
      } as any);
    });
    it('returns a StreamableFile', async () => {
      const result = await documentsService.registerForeignResident(
        foreignerRegistrationFields,
        signature,
      );

      expect(result).toBeInstanceOf(StreamableFile);
    });
    describe('fillFormFields', () => {
      it('should populate text fields and checkboxes correctly', async () => {
        const fieldsToFill: { [key: string]: string } = {
          birthDay: '15',
          birthMonth: '1',
          birthYear: '1990',
          dateOfApplication: '2022-02-02',
          ...foreignerRegistrationFields,
        };
        await documentsService.registerForeignResident(
          foreignerRegistrationFields,
          signature,
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
