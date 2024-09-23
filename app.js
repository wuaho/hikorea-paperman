document.getElementById('fillPdf').addEventListener('click', async () => {
    // Load the fillable PDF (make sure it's in the same directory)
    const existingPdfBytes = await fetch('application-form.pdf').then(res => res.arrayBuffer());


    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const dateOfBirth = new Date(document.getElementById('dateOfBirth').value)
    const yearOfBirth = dateOfBirth.getFullYear().toString()
    const monthOfBirth = dateOfBirth.getMonth().toString()
    const dayOfBirth = dateOfBirth.getDay().toString()


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

    // const emailField = form.getTextField('email');
    // emailField.setText('jane.doe@example.com');

    // const phoneField = form.getTextField('phone');
    // phoneField.setText('987-654-3210');

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