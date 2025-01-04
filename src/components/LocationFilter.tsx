import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, cities } from '@/utils/locations';

interface LocationFilterProps {
  selectedCountry: string;
  selectedCity: string | null;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string | null) => void;
}

const LocationFilter = ({ selectedCountry, selectedCity, onCountryChange, onCityChange }: LocationFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCity || ''} onValueChange={(city) => onCityChange(city || null)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select city" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All cities</SelectItem>
          {cities[selectedCountry as keyof typeof cities]?.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationFilter;