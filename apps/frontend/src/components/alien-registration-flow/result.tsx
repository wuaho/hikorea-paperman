import { useStateMachine } from 'little-state-machine';
import { Button } from '../ui/button';
import { ChevronRight, FileDown } from 'lucide-react';
import axios from 'axios';
import updateAction from './update-action';
import { ForeignerRegistrationFormDto } from '@shared/dtos/foreigner-registration-form.dto';
import { Progress } from '@radix-ui/react-progress';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { useNavigate } from 'react-router';

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
          Please fill in the required information
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Progress value={100} className="mb-6" />
        <div>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50">
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
