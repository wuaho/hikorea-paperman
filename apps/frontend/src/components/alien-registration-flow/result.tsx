import { GlobalStateData, useStateMachine } from 'little-state-machine';
import { Button } from '../ui/button';
import { FileDown } from 'lucide-react';
import axios from 'axios';
import updateAction from './update-action';
import { ForeignerRegistrationFormDto } from '@shared/dtos/foreigner-registration-form.dto';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { useNavigate } from 'react-router';
import { DelayProgress } from '../ui/delay-progress';

const fieldLabelsOrdered: [string, string][] = [
  ['firstName', 'First Name'],
  ['lastName', 'Last Name'],
  ['email', 'Email'],
  ['birthdate', 'Date of Birth'],
  ['sex', 'Sex'],
  ['nationality', 'Nationality'],
  ['passportNumber', 'Passport Number'],
  ['passportIssueDate', 'Passport Issue Date'],
  ['passportExpiryDate', 'Passport Expiration Date'],
  ['mobile', 'Mobile Number'],
  ['telephone', 'Telephone Number'],
  ['addressKorea', 'Address in Korea'],
  ['addressHomeCountry', 'Address in Home Country'],
];

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
        <DelayProgress
          className="mb-6"
          initialValue={80}
          targetValue={100}
          delay={0}
        />
        <div className="space-y-4">
          {fieldLabelsOrdered.map((field) => (
            <p
              key={field[0]}
              className="flex justify-between border-b border-gray-200 py-2"
            >
              <strong className="text-[#013563]">{field[1]}:</strong>

              <span className="ml-32">
                {state.data[field[0] as keyof GlobalStateData] || 'N/A'}
              </span>
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/step4');
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
