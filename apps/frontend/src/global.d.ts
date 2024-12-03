import 'little-state-machine';

//TODO it might be a good idea to use de DTO here, it depends if I want the FE to only
// care about the API calls to the bakend when saving states or not

declare module 'little-state-machine' {
  interface GlobalState {
    data: {
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
    };
  }
}
