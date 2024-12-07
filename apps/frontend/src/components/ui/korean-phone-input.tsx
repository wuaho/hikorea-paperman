import React from 'react';
import { Input, InputProps } from './input';
import { cn } from '@/lib/utils';
import flags from 'react-phone-number-input/flags';
import { Button } from './button';

export interface KoreanPhoneInputProps extends InputProps {}

const KoreanPhoneInput = React.forwardRef<
  HTMLInputElement,
  KoreanPhoneInputProps
>(({ className, ...props }, ref) => {
  return (
    <div className="flex items-center">
      <KoreaCountrySelect />
      <div className="flex items-center">
        <Input
          ref={ref}
          className={cn(
            'rounded-e-lg rounded-s-none hover:bg-zinc-100 hover:text-zinc-900',
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
      className="disabled:opacity-100 flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-1 focus:z-10 pointer-events-none"
      disabled
    >
      <FlagComponent />
    </Button>
  );
};

const FlagComponent = () => {
  const Flag = flags['KR'];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && (
        <Flag
          title="South Korea"
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      )}{' '}
    </span>
  );
};

KoreanPhoneInput.displayName = 'KoreanPhoneInput';

export { KoreanPhoneInput };
