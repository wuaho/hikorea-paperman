import React from 'react';
import { Input, InputProps } from './input';
import { cn } from '@/lib/utils';

export interface FormInputProps extends InputProps {}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn('hover:bg-zinc-100 hover:text-zinc-900', className)}
        {...props}
      />
    );
  },
);

FormInput.displayName = 'FormInput';

export { FormInput };
