'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import LocationSelector from '@/components/ui/location-input';
import { Input } from '@/components/ui/input';
import { format, parseISO } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { useStateMachine } from 'little-state-machine';
import { useNavigate } from 'react-router';
import updateAction from './update-action';

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Progress } from '../ui/progress';

const formSchema = z.object({
  nationality: z.tuple([z.string(), z.string().optional()]),
  passportNumber: z.string().min(0).max(9),
  passportIssueDate: z.coerce.date(),
  passportExpiryDate: z.coerce.date(),
});

export function Step2Form() {
  const [countryName, setCountryName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const { state, actions } = useStateMachine({ updateAction });
  const data = state.data;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // TODO Fix nationality when coming back from step 3
      nationality: data.nationality ? [data.nationality, undefined] : undefined,
      passportNumber: data.passportNumber || '',
      passportIssueDate: data.birthdate
        ? parseISO(data.passportIssueDate)
        : undefined,
      passportExpiryDate: data.birthdate
        ? parseISO(data.passportExpiryDate)
        : undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      const payload = {
        ...values,
        nationality: values.nationality[0],
        passportIssueDate: formatDate(values.passportIssueDate),
        passportExpiryDate: formatDate(values.passportExpiryDate),
      };

      actions.updateAction(payload);
      navigate('/step3');

      // TODO testear este toast
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
        <Progress value={50} className="mb-6" />

        <Form {...form}>
          <form
            id="step2"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto"
          >
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <LocationSelector
                      onCountryChange={(country) => {
                        setCountryName(country?.name || '');
                        form.setValue(field.name, [
                          country?.name || '',
                          stateName || '',
                        ]);
                      }}
                      onStateChange={(state) => {
                        setStateName(state?.name || '');
                        form.setValue(field.name, [
                          countryName || '',
                          state?.name || '',
                        ]);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Number</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="passportIssueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Passport Issue Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="passportExpiryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Passport Expiration Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/step1');
          }}
          className="border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white"
        >
          Back
        </Button>

        <Button
          form="step2"
          type="submit"
          className="bg-[#013563] hover:bg-[#014583] transition-colors"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
}
