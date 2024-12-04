import { useStateMachine } from 'little-state-machine';
import { Button } from '../ui/button';
import { FileDown } from 'lucide-react';
import axios from 'axios';
import updateAction from './update-action';
import { ForeignerRegistrationFormDto } from '@shared/dtos/foreigner-registration-form.dto';
import { Progress } from '../ui/progress';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { useNavigate } from 'react-router';

const fieldLabels: { [key: string]: string } = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  birthdate: 'Date of Birth',
  nationality: 'Nationality',
  sex: 'Sex',
  telephone: 'Telephone Number',
  mobile: 'Mobile Number',
  addressKorea: 'Address in Korea',
  addressHomeCountry: 'Address in Home Country',
  passportExpiryDate: 'Passport Expiration Date',
  passportIssueDate: 'Passport Issue Date',
  passportNumber: 'Passport Number',
};

export const FormResult = () => {
  const { state } = useStateMachine({ updateAction });
  const navigate = useNavigate();

  const generatePDF = async (formData: ForeignerRegistrationFormDto) => {
    try {
      console.log(formData);
      const response = await axios.post(
        '/api/documents/registerForeignResident',
        formData,
        {
          responseType: 'blob',
        },
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'generated_document.pdf';
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <CardHeader className="bg-[#013563] text-white">
        <CardTitle> Review Your Information</CardTitle>
        <CardDescription className="text-gray-200">
          Please check every field
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Progress value={100} className="mb-6" />

        <div className="space-y-4">
          {Object.entries(state.data).map(([key, value]) => (
            <p
              key={key}
              className="flex justify-between border-b border-gray-200 py-2"
            >
              <strong className="text-[#013563]">{fieldLabels[key]}:</strong>
              <span className="ml-32">{value || 'N/A'}</span>
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/step3');
          }}
          className="border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white"
        >
          Back
        </Button>

        <Button
          onClick={() => generatePDF(state.data)}
          className="bg-[#013563] hover:bg-[#014583] transition-colors"
        >
          Generate PDF <FileDown className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
};
