import { Injectable, StreamableFile } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { PDFDocument, PDFForm, rgb } from 'pdf-lib';

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
    signature: Express.Multer.File,
  ): Promise<StreamableFile> {
    const applicationFormPdf = await this.loadApplicationFormPdf();
    const pdfForm = applicationFormPdf.getForm();

    this.fillFormFields(foreignerRegistrationForm, pdfForm);

    this.addSign(signature, applicationFormPdf);

    const pdfBytes = await applicationFormPdf.save();

    return new StreamableFile(pdfBytes, {
      disposition: 'attachment; filename="filled-form.pdf"',
      type: 'application/pdf.',
    });
  }

  private async addSign(signature: Express.Multer.File, pdf: PDFDocument) {
    const pngImage = await pdf.embedPng(signature.buffer);

    const scaledImage = pngImage.scaleToFit(184, 13);
    // const scaledImage = pngImage.scale(0.03);

    console.log('Tamaño de la imagen');
    console.log(scaledImage.width);
    console.log(scaledImage.height);

    const firstPage = pdf.getPages()[0];
    console.log(firstPage.getWidth()); // 595
    console.log(firstPage.getHeight()); // 841

    //TODO: ponerlas bien para que salga la firma de manera escala que tenga sentido
    //coordenadas: x:
    // height: 10,
    // width: 130,
    // x: 437,
    // y: 255,

    firstPage.drawImage(pngImage, {
      height: scaledImage.height,
      width: scaledImage.width,
      x: 470,
      y: 252.5,
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

    pdfForm.getCheckBox('foreign-resident-registration').check();

    // TODO this gives some problems
    // pdfForm.flatten();
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
