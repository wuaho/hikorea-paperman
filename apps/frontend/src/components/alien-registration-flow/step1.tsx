'use client';
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
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStateMachine } from 'little-state-machine';
import updateAction from './update-action';
import { useNavigate } from 'react-router';

import { FormInput } from '../ui/form-input';
import { DelayProgress } from '../ui/delay-progress';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Enter your first name.' })
    .max(50, { message: 'Your first name must be less than 50 characters.' }),
  lastName: z
    .string()
    .min(1, { message: 'Enter your last name.' })
    .max(50, { message: 'Your last name must be less than 50 characters.' }),
  email: z.string().email({ message: 'Enter a valid email address.' }),
  birthdate: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === 'invalid_date' ? "That's not a date!" : defaultError,
      }),
    })
    .refine((date) => date < new Date(), {
      message: 'Are you sure this is your birthday?',
    }),
  sex: z.enum(['female', 'male'], {
    message: 'Select one of the options.',
  }),
});

export function Step1Form() {
  const { state, actions } = useStateMachine({ updateAction });
  const data = state.data;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      birthdate: data.birthdate ? parseISO(data.birthdate) : undefined,
      sex:
        data.sex === 'female'
          ? 'female'
          : data.sex === 'male'
            ? 'male'
            : undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const payloadAllStrings = {
        ...values,
        birthdate: formatDate(values.birthdate),
      };

      actions.updateAction(payloadAllStrings);
      navigate('/step2');
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to save the information. Please try again.');
    }
  }

  return (
    <>
      <DelayProgress
        className="mb-6 mt-4"
        initialValue={0}
        targetValue={20}
        delay={0}
      />
      {/* <h2> Provide your basic personal information to get started</h2> */}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full"
      >
        <h1 className="text-korea-blue mb-4 text-2xl font-bold">
          Personal Information
        </h1>
        <Form {...form}>
          <form
            id="step1"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <FormInput type="text" maxLength={50} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <FormInput type="text" maxLength={50} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <FormInput type="email" maxLength={320} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
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
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="hover:bg-zinc-100 hover:text-zinc-900">
                        <SelectTrigger>
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                      </SelectContent>
                    </Select>

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
            navigate('/selectFlow');
          }}
          className="hidden border-[#013563] text-[#013563] hover:bg-[#013563] hover:text-white sm:inline-flex"
        >
          Back
        </Button>

        <Button
          variant="next"
          form="step1"
          type="submit"
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </>
  );
}
