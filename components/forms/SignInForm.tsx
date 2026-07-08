'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FooterLink } from '@/components/FooterLink';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/ui/button';
import { signInWithEmail } from '@/lib/actions/auth.actions';

export function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);

      if (result.success) {
        router.push('/');
        return;
      }

      toast.error('Sign-in failed', {
        description: result.error ?? 'Invalid email or password. Please try again.',
      });
    } catch (error) {
      console.error('Sign-in failed:', error);
      toast.error('Sign-in failed', {
        description:
          error instanceof Error
            ? error.message
            : 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <h1 className="form-title">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          placeholder="Enter your password"
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn mt-5 w-full"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign up"
          href="/sign-up"
        />
      </form>
    </div>
  );
}
