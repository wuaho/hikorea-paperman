import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import countries from '@/data/countries.json';

interface CountryProps {
  id: number;
  name: string;
  nationality: string;
  emoji: string;
}

interface CountrySelectorProps {
  disabled?: boolean;
  onCountryChange?: (country: CountryProps | null) => void;
  initialCountryName?: string;
}

const CountrySelector = ({
  disabled,
  onCountryChange,
  initialCountryName,
}: CountrySelectorProps) => {
  // Cast imported JSON data to their respective types
  const countriesData = countries as CountryProps[];

  const initialCountry = initialCountryName
    ? countriesData.find((country) => country.name === initialCountryName) ||
      null
    : null;

  const [selectedCountry, setSelectedCountry] = useState<CountryProps | null>(
    initialCountry,
  );
  const [openCountryDropdown, setOpenCountryDropdown] = useState(false);

  const handleCountrySelect = (country: CountryProps | null) => {
    setSelectedCountry(country);
    onCountryChange?.(country);
  };

  return (
    <div className="flex gap-4">
      {/* Country Selector */}
      <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCountryDropdown}
            disabled={disabled}
            className={cn(
              'w-full justify-between',
              !selectedCountry && 'text-muted-foreground',
            )}
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <span>{selectedCountry.emoji}</span>
                <span>{selectedCountry.name}</span>
              </div>
            ) : (
              <span>Select country</span>
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countriesData.map((country) => (
                  <CommandItem
                    key={country.id}
                    value={country.name}
                    onSelect={() => {
                      handleCountrySelect(country);
                      setOpenCountryDropdown(false);
                    }}
                    className="flex cursor-pointer items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span>{country.emoji}</span>
                      <span>{country.name}</span>
                    </div>
                    <Check
                      className={cn(
                        'ml-auto',
                        selectedCountry?.id === country.id
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CountrySelector;
