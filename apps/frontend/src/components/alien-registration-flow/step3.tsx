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
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { FormInput } from '../ui/form-input';
import { DelayProgress } from '../ui/delay-progress';
import { KoreanPhoneInput } from '../ui/korean-phone-input';
import { motion } from 'framer-motion';

const formSchema = z.object({
  mobile: z.string().min(9).max(13),
  telephone: z.string().min(9).max(13),
  addressKorea: z.string().min(5).max(100),
  addressHomeCountry: z.string().min(5).max(100),
});

export function Step3Form() {
  const { state, actions } = useStateMachine({ updateAction });
  const data = state.data;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
      <CardHeader className="bg-[#013563] text-white">
        <CardTitle> Contact Information</CardTitle>
        <CardDescription className="text-gray-200">
          Enter your contact and address information
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <DelayProgress
          className="mb-6"
          initialValue={40}
          targetValue={60}
          delay={200}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Form {...form}>
            <form
              id="step3"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl className="w-full">
                          <KoreanPhoneInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel>Telephone Number</FormLabel>
                        <FormControl className="w-full">
                          <KoreanPhoneInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="addressKorea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address in Korea</FormLabel>
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
                    <FormLabel>Address in Home Country</FormLabel>
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
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/step2');
          }}
          className="border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white"
        >
          Back
        </Button>

        <Button
          form="step3"
          type="submit"
          className="bg-[#013563] hover:bg-[#014583] transition-colors"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
}
