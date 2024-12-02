import { useStateMachine } from 'little-state-machine';
import { Button } from '../ui/button';
import { FileDown } from 'lucide-react';
import axios from 'axios';
import updateAction from './update-action';
import { ForeignerRegistrationFormDto } from '@shared/dtos/foreigner-registration-form.dto';

export const FormResult = () => {
  const { state } = useStateMachine({ updateAction });

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
    <div>
      <h2>Review Your Information</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>

      <Button
        onClick={() => generatePDF(state.data)}
        className="bg-[#013563] hover:bg-[#014583] transition-colors"
      >
        Generate PDF <FileDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
