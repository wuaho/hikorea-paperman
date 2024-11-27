import { Injectable, StreamableFile } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { PDFDocument } from 'pdf-lib';

import { ForeignRegistrationFormDto } from './dtos/foreign-registration-form.dto';
const APPLICATION_FORM = './forms/application-form.pdf';
const MALE = 'Male';
const FEMALE = 'Female';

@Injectable()
export class DocumentsService {
  async submitForeignResidentRegistration(
    foreignRegistrationForm: ForeignRegistrationFormDto,
  ): Promise<StreamableFile> {
    const {
      addressHomeCountry,
      addressKorea,
      dateOfBirth,
      email,
      firstName,
      lastName,
      nationality,
      passportExpiryDate,
      passportIssueDate,
      passportNumber,
      phoneNumber,
      sex,
      telephoneNumber,
    } = foreignRegistrationForm;

    const pdfDoc = await this.loadPdf();

    const form = pdfDoc.getForm();

    // Dates
    //TODO check that is also working for december, i dont like the +1
    const dateOfBirthDate = new Date(dateOfBirth);
    const dayOfBirth = dateOfBirthDate.getDate().toString();
    const monthOfBirth = (dateOfBirthDate.getMonth() + 1).toString();
    const yearOfBirth = dateOfBirthDate.getFullYear().toString();

    // Fill in the fields you created
    const lastNameField = form.getTextField('last-name');
    lastNameField.setText(lastName);

    const firstNameField = form.getTextField('first-name');
    firstNameField.setText(firstName);

    const yearOfBirthField = form.getTextField('birth-year');
    yearOfBirthField.setText(yearOfBirth);

    const monthOfBirthField = form.getTextField('birth-month');
    monthOfBirthField.setText(monthOfBirth);

    const dayOfBirthField = form.getTextField('birth-day');
    dayOfBirthField.setText(dayOfBirth);

    const maleCheckbox = form.getCheckBox('sex-male');
    const femaleCheckbox = form.getCheckBox('sex-female');

    if (sex === MALE) maleCheckbox.check();
    if (sex === FEMALE) femaleCheckbox.check();

    const nationalityField = form.getTextField('nationality');
    nationalityField.setText(nationality);

    const passportNumberField = form.getTextField('passport-number');
    passportNumberField.setText(passportNumber);

    const passportIssueDateField = form.getTextField('passport-issue-date');
    passportIssueDateField.setText(passportIssueDate);

    const passportExpiryDateField = form.getTextField('passport-expiry-date');
    passportExpiryDateField.setText(passportExpiryDate);

    const addressKoreaField = form.getTextField('address-korea');
    addressKoreaField.setText(addressKorea);

    const telephoneNumberField = form.getTextField('telephone-number');
    telephoneNumberField.setText(telephoneNumber);

    const phoneNumberField = form.getTextField('phone-number');
    phoneNumberField.setText(phoneNumber);

    const addressHomeCountryField = form.getTextField('address-home-country');
    addressHomeCountryField.setText(addressHomeCountry);

    const emailField = form.getTextField('email');
    emailField.setText(email);

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();

    return new StreamableFile(pdfBytes, {
      disposition: 'attachment; filename="filled-form.pdf"', // TODO check if I need this
      type: 'application/pdf.',
    });
  }

  private async loadPdf() {
    const existingPdfBytes = await readFile(
      join(process.cwd(), APPLICATION_FORM),
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    return pdfDoc;
  }
}
