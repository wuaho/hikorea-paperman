import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import flags from 'react-phone-number-input/flags';
import { Button } from './button';

export interface KoreanPhoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const KoreanPhoneInput = React.forwardRef<
  HTMLInputElement,
  KoreanPhoneInputProps
>(({ className, value, onChange, ...props }, ref) => {
  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D+/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 7)
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);

    const event = {
      ...e,
      target: {
        ...e.target,
        value: formattedPhoneNumber,
      },
    };

    onChange?.(event);
  };

  return (
    <div className="flex w-full items-center">
      <KoreaCountrySelect />
      <div className="flex w-full items-center">
        <Input
          ref={ref}
          value={value}
          onChange={handleInputChange}
          className={cn(
            '" w-full rounded-e-lg rounded-s-none hover:bg-zinc-100 hover:text-zinc-900',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
});

const KoreaCountrySelect = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="pointer-events-none flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-1 focus:z-10 disabled:opacity-100"
      disabled
    >
      <FlagComponent />
    </Button>
  );
};

const FlagComponent = () => {
  const Flag = flags['KR'];

  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm [&_svg]:size-full">
      {Flag && <Flag title="South Korea" />}{' '}
    </span>
  );
};

KoreanPhoneInput.displayName = 'KoreanPhoneInput';

export { KoreanPhoneInput };
