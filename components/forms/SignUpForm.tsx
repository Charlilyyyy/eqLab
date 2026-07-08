'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { CountrySelectField } from '@/components/CountrySelectField';
import { FooterLink } from '@/components/FooterLink';
import { InputField } from '@/components/InputField';
import { SelectField } from '@/components/SelectField';
import { Button } from '@/components/ui/button';
import { signUpWithEmail } from '@/lib/actions/auth.actions';
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from '@/lib/constants';

export function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'US',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);

      if (result.success) {
        router.push('/');
        return;
      }

      toast.error('Sign-up failed', {
        description:
          result.error ?? 'Failed to create account. Please try again.',
      });
    } catch (error) {
      console.error('Sign-up failed:', error);
      toast.error('Sign-up failed', {
        description:
          error instanceof Error
            ? error.message
            : 'Failed to create account. Please try again.',
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Sign up & personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full name"
          placeholder="Jane Doe"
          register={register}
          error={errors.fullName}
          validation={{
            required: 'Full name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          }}
        />

        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          }}
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter a strong password"
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <SelectField
          name="investmentGoals"
          label="Investment goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn mt-5 w-full"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>

        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </form>
    </>
  );
}
