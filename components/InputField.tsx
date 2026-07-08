/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  validation?: RegisterOptions;
  disabled?: boolean;
  value?: string;
};

export function InputField({
  name,
  label,
  placeholder,
  type = 'text',
  register,
  error,
  validation,
  disabled,
  value,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className={cn('form-input', {
          'cursor-not-allowed! opacity-50': disabled,
        })}
        {...register(name, validation)}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
