'use client';
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

import { FormInput } from '../ui/form-input';
import { DelayProgress } from '../ui/delay-progress';
import CountrySelector from '../ui/country-selector';
import { motion } from 'framer-motion';

const formSchema = z.object({
  nationality: z.string().min(1, { message: 'Enter your nationality.' }),
  passportNumber: z
    .string()
    .min(1, { message: 'Enter your passport number.' })
    .max(9, {
      message: 'Are you sure this is your passport number?',
    }),
  passportIssueDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === 'invalid_date' ? "That's not a date!" : defaultError,
    }),
  }),
  passportExpiryDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === 'invalid_date' ? "That's not a date!" : defaultError,
    }),
  }),
});

export function Step2Form() {
  const { state, actions } = useStateMachine({ updateAction });
  const data = state.data;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      nationality: data.nationality || '',
      passportNumber: data.passportNumber || '',
      passportIssueDate: data.passportIssueDate
        ? parseISO(data.passportIssueDate)
        : undefined,
      passportExpiryDate: data.passportExpiryDate
        ? parseISO(data.passportExpiryDate)
        : undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      const payload = {
        ...values,
        nationality: values.nationality,
        passportIssueDate: formatDate(values.passportIssueDate),
        passportExpiryDate: formatDate(values.passportExpiryDate),
      };

      actions.updateAction(payload);
      navigate('/step3');
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to save the information. Please try again.');
    }
  }

  return (
    <>
      <h1 className="text-korea-blue text-2xl font-bold">
        2/5 Passport information
      </h1>
      {/* <h2> Please fill in the required information</h2> */}

      <DelayProgress
        className="mb-6"
        initialValue={20}
        targetValue={40}
        delay={0}
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Form {...form}>
          <form
            id="step2"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-8"
          >
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <CountrySelector
                      initialCountryName={field.value}
                      onCountryChange={(country) => {
                        form.setValue(field.name, country?.name || '');
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
                  <FormLabel>Passport number</FormLabel>
                  <FormControl>
                    <FormInput type="text" maxLength={9} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="passportIssueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Passport issue date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
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

              <FormField
                control={form.control}
                name="passportExpiryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Passport expiration date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
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
          </form>
        </Form>
      </motion.div>
      <div className="flex w-full justify-center pt-6 sm:justify-between">
        <Button
          variant="outline"
          onClick={() => {
            navigate('/step1');
          }}
          className="hidden border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white sm:inline-flex"
        >
          Back
        </Button>

        <Button
          form="step2"
          type="submit"
          className="bg-[#013563] transition-colors hover:bg-[#014583]"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
