import React from 'react';
import { AlienRegistrationFlow } from './components/alien-registration-flow';
import { BrowserRouter, Routes, Route } from 'react-router';
import { StateMachineProvider, createStore } from 'little-state-machine';
import {
  Step1Form,
  Step2Form,
  Step3Form,
  Step4Form,
  FormResult,
} from './components/alien-registration-flow/index';
import MainLayout from './components/main-layout';
import { FlowSelector } from './components/flow-selector';

createStore({
  data: {
    addressHomeCountry: '',
    addressKorea: '',
    birthdate: '',
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    nationality: '',
    passportExpiryDate: '',
    passportIssueDate: '',
    passportNumber: '',
    sex: '',
    telephone: '',
  },
});

function App() {
  return (
    <StateMachineProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<FlowSelector />} />
            <Route path="/step1" element={<Step1Form />} />
            <Route path="/step2" element={<Step2Form />} />
            <Route path="/step3" element={<Step3Form />} />
            <Route path="/step4" element={<Step4Form />} />
            <Route path="/result" element={<FormResult />} />
          </Route>
          <Route path="/old" element={<AlienRegistrationFlow />} />
        </Routes>
      </BrowserRouter>
    </StateMachineProvider>
  );
}

export default App;
