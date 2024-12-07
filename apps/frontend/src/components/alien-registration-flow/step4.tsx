'use client';

import { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SignatureInput from '@/components/ui/signature-input';
import { useNavigate } from 'react-router';
import { FileDown } from 'lucide-react';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { DelayProgress } from '../ui/delay-progress';
import { useStateMachine } from 'little-state-machine';
import updateAction from './update-action';
import { ForeignerRegistrationFormDto } from '@shared/dtos/foreigner-registration-form.dto';
import axios from 'axios';
import { signatureURLtoBlob } from '@/lib/utils';

const FormSchema = z.object({
  signature: z.string().min(1, 'Please sign the form'),
});

type SignatureFormData = z.infer<typeof FormSchema>;

export function Step4Form() {
  const { state } = useStateMachine({ updateAction });
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const form = useForm<SignatureFormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: SignatureFormData) => {
    const signatureBlob = signatureURLtoBlob(data.signature);
    generatePDF(state.data, signatureBlob);

    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
    );
  };

  const generatePDF = async (
    form: ForeignerRegistrationFormDto,
    signature: Blob,
  ) => {
    try {
      const formData = new FormData();

      formData.append('signature', signature);
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

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
        <CardTitle> Personal Information</CardTitle>
        <CardDescription className="text-gray-200">
          Please fill in the required information
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <DelayProgress
          className="mb-6"
          initialValue={80}
          targetValue={100}
          delay={0}
        />
        <Form {...form}>
          <form
            id="step4"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="signature"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div>
                    <FormLabel>Sign here</FormLabel>
                  </div>
                  <SignatureInput
                    canvasRef={canvasRef}
                    onSignatureChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/result');
          }}
          className="border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white"
        >
          Back
        </Button>

        <Button
          form="step4"
          type="submit"
          className="bg-[#013563] hover:bg-[#014583] transition-colors"
        >
          Generate PDF <FileDown className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
}
