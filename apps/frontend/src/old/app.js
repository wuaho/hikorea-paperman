const MALE = 'Male';
const FEMALE = 'Female';

document.getElementById('fillPdf').addEventListener('click', async () => {
  // Load the fillable PDF (make sure it's in the same directory)
  const existingPdfBytes = await fetch('application-form.pdf').then((res) =>
    res.arrayBuffer(),
  );

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const dateOfBirth = new Date(document.getElementById('dateOfBirth').value);
  const yearOfBirth = dateOfBirth.getFullYear().toString();
  const sex = document.getElementById('sex').value;
  const nationality = document
    .getElementById('nationality')
    .value.toString()
    .toUpperCase();
  const passportNumber = document.getElementById('passportNumber').value;
  const passportIssueDate = document.getElementById('passportIssueDate').value;
  const passportExpiryDate =
    document.getElementById('passportExpiryDate').value;
  const addressKorea = document.getElementById('addressKorea').value;
  const telephoneNumber = document.getElementById('telephoneNumber').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const addressHomeCountry =
    document.getElementById('addressHomeCountry').value;
  const email = document.getElementById('email').value;

  const monthOfBirth = (dateOfBirth.getMonth() + 1).toString();
  const dayOfBirth = dateOfBirth.getDate().toString();

  // Load the PDF into PDF-lib
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

  // Get the form from the PDF
  const form = pdfDoc.getForm();

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

  // Download the filled PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Filled_PDF.pdf';
  a.click();
});
