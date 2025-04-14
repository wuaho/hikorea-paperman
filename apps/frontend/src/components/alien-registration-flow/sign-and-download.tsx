'use client';

import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { DelayProgress } from '../ui/delay-progress';
import { useStateMachine } from 'little-state-machine';
import updateAction from './update-action';
import { ForeignerRegistrationFormDto } from '@shared/dtos/foreigner-registration-form.dto';
import axios from 'axios';
import { signatureURLtoBlob } from '@/lib/utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const baseUrl =
  import.meta.env.MODE === 'development'
    ? '/api'
    : import.meta.env.VITE_PROD_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const formSchema = z.object({
  signature: z
    .string({ message: 'Please sign in the form.' })
    .min(1, { message: 'Please sign in the form.' }),
});

export function SignAndDownloadForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { state } = useStateMachine({ updateAction });
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      const signatureBlob = signatureURLtoBlob(data.signature);
      generatePDF(state.data, signatureBlob);
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to save the information. Please try again.');
    }
  };

  const generatePDF = async (
    form: ForeignerRegistrationFormDto,
    signature: Blob,
  ) => {
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      const formData = new FormData();

      formData.append('signature', signature);
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const response = axios.post(
        `${baseUrl}/documents/registerForeignResident`,
        formData,
        {
          responseType: 'blob',
          headers: { 'x-api-key': API_KEY },
        },
      );

      console.log((await response).request);

      toast.promise(response, {
        loading: 'Loading...',
        success: () => {
          return `Document has been generated`;
        },
        error: 'Something went wrong',
      });

      const blob = new Blob([(await response).data], {
        type: 'application/pdf',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Filled-Application-Form.pdf';
      link.click();

      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <h1 className="text-korea-blue text-2xl font-bold">
        5/5 Sign and download
      </h1>
      {/* <h2> Sign the form and download your document</h2> */}
      <DelayProgress
        className="mb-6"
        initialValue={80}
        targetValue={100}
        delay={0}
      />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
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
      </motion.div>
      <div className="flex w-full justify-center pt-6 sm:justify-between">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/result');
          }}
          className="hidden border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white sm:inline-flex"
        >
          Back
        </Button>

        <Button
          form="step4"
          type="submit"
          className="bg-[#013563] transition-colors hover:bg-[#014583]"
          disabled={isGenerating}
        >
          {isGenerating ? (
            'Please wait...'
          ) : (
            <>
              Generate PDF
              <FileDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </>
  );
}
