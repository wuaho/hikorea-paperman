//TODO fix this import, not working due to project configuration
//import { ForeignerRegistrationFormDto as ForeignerRegistrationFormSharedDto } from '@shared/dtos/foreigner-registration-form.dto';
//export class ForeignerRegistrationFormDto extends ForeignerRegistrationFormSharedDto {}

export class ForeignerRegistrationFormDto {
  // TODO put similar properties into the same key
  // TODO add field validations

  addressHomeCountry: string;
  addressKorea: string;
  birthdate: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  nationality: string;
  passportExpiryDate: string;
  passportIssueDate: string;
  passportNumber: string;
  sex: string;
  telephone: string;
}
