import { Injectable, StreamableFile } from '@nestjs/common';
import { format } from 'date-fns';
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
  dateOfApplication: 'date-of-application',
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
    signature: Express.Multer.File,
  ): Promise<StreamableFile> {
    const applicationFormPdf = await this.loadApplicationFormPdf();
    const pdfForm = applicationFormPdf.getForm();

    this.fillFormFields(foreignerRegistrationForm, pdfForm);

    this.addSigns(signature, applicationFormPdf);

    const pdfBytes = await applicationFormPdf.save();

    return new StreamableFile(pdfBytes, {
      disposition: 'attachment; filename="filled-form.pdf"',
      type: 'application/pdf.',
    });
  }

  private async addSigns(signature: Express.Multer.File, pdf: PDFDocument) {
    const pngImage = await pdf.embedPng(signature.buffer);

    const scaledImage = pngImage.scaleToFit(184, 16);

    const firstPage = pdf.getPages()[0];

    firstPage.drawImage(pngImage, {
      height: scaledImage.height,
      width: scaledImage.width,
      x: 470,
      y: 250.5,
    });

    firstPage.drawImage(pngImage, {
      height: scaledImage.height * 2,
      width: scaledImage.width * 2,
      x: 160,
      y: 128,
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
    } = this.parseDate(foreignRegistrationForm.birthdate);
    const dateOfApplication = this.formatDate(new Date());

    const extendedForeignRegistrationForm = {
      ...foreignRegistrationForm,
      birthDay,
      birthMonth,
      birthYear,
      dateOfApplication,
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

    pdfForm.getCheckBox('foreign-resident-registration').check();

    // TODO this gives some problems
    // pdfForm.flatten();
  }

  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
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
