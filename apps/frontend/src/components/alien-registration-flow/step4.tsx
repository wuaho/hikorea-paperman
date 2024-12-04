'use client';

import { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SignatureInput from '@/components/ui/signature-input';
import { useNavigate } from 'react-router';
import { Progress } from '../ui/progress';
import { ChevronRight } from 'lucide-react';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';

const FormSchema = z.object({
  signature: z.string().min(1, 'Please sign the form'),
});

type SignatureFormData = z.infer<typeof FormSchema>;

export function Step4Form() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const form = useForm<SignatureFormData>({
    resolver: zodResolver(FormSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: SignatureFormData) => {
    // console.log('Signature Data URL:', data.signature)
    navigate('/result');

    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
    );
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
        <Progress value={95} className="mb-6" />

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
                  <FormDescription>
                    Please provide your signature above
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
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
          form="step4"
          type="submit"
          className="bg-[#013563] hover:bg-[#014583] transition-colors"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
}
