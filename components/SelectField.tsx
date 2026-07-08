'use client';

import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  options: readonly Option[];
  control: Control<T>;
  error?: FieldError;
  required?: boolean;
};

export function SelectField<T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
}: SelectFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="border-gray-600 bg-gray-800 text-white">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="focus:bg-gray-600 focus:text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
