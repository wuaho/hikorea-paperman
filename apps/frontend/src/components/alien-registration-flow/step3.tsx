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

const formSchema = z.object({
  mobile: z.string().min(9).max(13),
  telephone: z.string().min(9).max(13),
  addressKorea: z.string().min(5).max(100),
  addressHomeCountry: z.string().min(5).max(100),
});

export function Step3Form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //TODO default values to remove after testing
    defaultValues: {
      mobile: '+821011112222',
      telephone: '+821022223333',
      addressKorea: '456 Gangnam-daero, Seoul, South Korea',
      addressHomeCountry: 'Calle Pureza Numero 1,Sevilla, Spain',
    },
  });
  const { actions } = useStateMachine({ updateAction });
  const navigate = useNavigate();

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="Placeholder"
                      {...field}
                      defaultCountry="TR"
                    />
                  </FormControl>
                  <FormDescription>Enter your cell number.</FormDescription>
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
                    <PhoneInput placeholder="" {...field} defaultCountry="TR" />
                  </FormControl>
                  <FormDescription>
                    Enter your telephone number.
                  </FormDescription>
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
              <FormDescription>
                Provide your current address in Korea
              </FormDescription>
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
              <FormDescription>
                Enter your permanent address in home country.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
