import React from 'react';
import { AlienRegistrationFlow } from './components/alien-registration-flow';
import { BrowserRouter, Routes, Route } from 'react-router';
import { StateMachineProvider, createStore } from 'little-state-machine';
import PersonalInfoForm from './components/alien-registration-flow/personal-info';
import PassportInfoForm from './components/alien-registration-flow/passport-info';
import AddressInfoForm from './components/alien-registration-flow/address-info';
import { SignatureForm } from './components/alien-registration-flow/sign';

createStore({
  data: {
    addressHomeCountry: '',
    addressKorea: '',
    dateOfBirth: '',
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    nationality: '',
    passportExpiryDate: '',
    passportIssueDate: '',
    passportNumber: '',
    phoneNumber: '',
    sex: '',
    telephoneNumber: '',
  },
});

function App() {
  return (
    <StateMachineProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<AlienRegistrationFlow />} />
            <Route path="/step1" element={<PersonalInfoForm />} />
            <Route path="/step2" element={<PassportInfoForm />} />
            <Route path="/step3" element={<AddressInfoForm />} />
            <Route path="/step4" element={<SignatureForm />} />
            <Route path="/result" element={<SignatureForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StateMachineProvider>
  );
}

export default App;
