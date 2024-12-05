'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';
import { Input } from '@/components/ui/input';
import { useStateMachine } from 'little-state-machine';
import updateAction from './update-action';
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
      navigate('/step4');
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <>
      <CardHeader className="bg-[#013563] text-white">
        <CardTitle> Additional Details</CardTitle>
        <CardDescription className="text-gray-200">
          Please fill in the required information
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Progress value={75} className="mb-6" />

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
                        <PhoneInput
                          placeholder="Placeholder"
                          {...field}
                          defaultCountry="TR"
                        />
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
                        <PhoneInput
                          placeholder=""
                          {...field}
                          defaultCountry="TR"
                        />
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
                    <Input placeholder="" type="text" {...field} />
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
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
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
