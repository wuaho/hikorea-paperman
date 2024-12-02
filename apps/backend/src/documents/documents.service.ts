import { Injectable, StreamableFile } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { PDFDocument, PDFForm } from 'pdf-lib';

import { ForeignerRegistrationFormDto } from './dtos/foreigner-registration-form.dto';

const APPLICATION_FORM = './forms/application-form.pdf';
const FEMALE = 'female';
const MALE = 'male';

export const STRING_FIELDS_MAPPING = {
  addressHomeCountry: 'address-home-country',
  addressKorea: 'address-korea',
  birthDay: 'birth-day',
  birthMonth: 'birth-month',
  birthYear: 'birth-year',
  email: 'email',
  firstName: 'first-name',
  lastName: 'last-name',
  mobile: 'phone-number',
  nationality: 'nationality',
  passportExpiryDate: 'passport-expiry-date',
  passportIssueDate: 'passport-issue-date',
  passportNumber: 'passport-number',
  telephone: 'telephone-number',
};

@Injectable()
export class DocumentsService {
  async registerForeignResident(
    foreignerRegistrationForm: ForeignerRegistrationFormDto,
  ): Promise<StreamableFile> {
    const applicationFormPdf = await this.loadApplicationFormPdf();
    const pdfForm = applicationFormPdf.getForm();

    this.fillFormFields(foreignerRegistrationForm, pdfForm);

    const pdfBytes = await applicationFormPdf.save();

    return new StreamableFile(pdfBytes, {
      disposition: 'attachment; filename="filled-form.pdf"',
      type: 'application/pdf.',
    });
  }

  private fillFormFields(
    foreignRegistrationForm: ForeignerRegistrationFormDto,
    pdfForm: PDFForm,
  ): void {
    const {
      day: birthDay,
      month: birthMonth,
      year: birthYear,
    } = this.parseDate(foreignRegistrationForm.dateOfBirth);

    const extendedForeignRegistrationForm = {
      ...foreignRegistrationForm,
      birthDay,
      birthMonth,
      birthYear,
    };

    for (const [key, pdfFieldName] of Object.entries(STRING_FIELDS_MAPPING)) {
      const pdfField = pdfForm.getTextField(pdfFieldName);
      const fieldValue = (extendedForeignRegistrationForm as any)[key];
      pdfField.setText(fieldValue);
    }

    if (foreignRegistrationForm.sex.toLowerCase() === MALE)
      pdfForm.getCheckBox('sex-male').check();
    if (foreignRegistrationForm.sex.toLowerCase() === FEMALE)
      pdfForm.getCheckBox('sex-female').check();
  }

  private async loadApplicationFormPdf(): Promise<PDFDocument> {
    const existingPdfBytes = await readFile(
      join(process.cwd(), APPLICATION_FORM),
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    return pdfDoc;
  }

  private parseDate(date: string): {
    day: string;
    month: string;
    year: string;
  } {
    const parsedDate = new Date(date);

    return {
      day: parsedDate.getDate().toString(),
      month: (parsedDate.getMonth() + 1).toString(),
      year: parsedDate.getFullYear().toString(),
    };
  }
}
