'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './update-action';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { FormInput } from '../ui/form-input';
import { DelayProgress } from '../ui/delay-progress';
import { KoreanPhoneInput } from '../ui/korean-phone-input';
import { motion } from 'framer-motion';

const formSchema = z.object({
  mobile: z.string().min(9, { message: 'Enter a valid phone number.' }),
  telephone: z.string().min(9).optional().or(z.literal('')),
  addressKorea: z
    .string()
    .min(5, {
      message: 'Enter your address.',
    })
    .max(100, { message: 'Your address must be less than 100 characters.' }),
  addressHomeCountry: z
    .string()
    .min(5, { message: 'Enter your address.' })
    .max(100, { message: 'Your address must be less than 100 characters.' }),
});

export function Step3Form() {
  const { state, actions } = useStateMachine({ updateAction });
  const data = state.data;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      mobile: data.mobile || '',
      telephone: data.telephone || '',
      addressKorea: data.addressKorea || '',
      addressHomeCountry: data.addressHomeCountry || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      actions.updateAction(values);
      navigate('/result');
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to save the information. Please try again.');
    }
  }

  return (
    <>
      <h1 className="text-korea-blue text-2xl font-bold">
        3/5 Contact information
      </h1>
      {/* <h2> Enter your contact and address information</h2> */}
      <DelayProgress
        className="mb-6"
        initialValue={40}
        targetValue={60}
        delay={0}
      />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Form {...form}>
          <form
            id="step3"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-8"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl className="w-full">
                      <KoreanPhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Telephone number</FormLabel>
                    <FormControl className="w-full">
                      <KoreanPhoneInput placeholder="(optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="addressKorea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address in South Korea</FormLabel>
                  <FormControl>
                    <FormInput type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressHomeCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address in your home country</FormLabel>
                  <FormControl>
                    <FormInput type="text" {...field} />
                  </FormControl>
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
            navigate('/step2');
          }}
          className="hidden border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white sm:inline-flex"
        >
          Back
        </Button>

        <Button
          form="step3"
          type="submit"
          className="bg-[#013563] transition-colors hover:bg-[#014583]"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
