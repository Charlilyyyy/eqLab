'use server';

import { headers } from 'next/headers';

import { getAuth } from '@/lib/better-auth/auth';
import { inngest } from '@/lib/inngest/client';

export async function signUpWithEmail(data: SignUpFormData) {
  try {
    const auth = await getAuth();
    const response = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.fullName,
      },
    });

    if (response) {
      await inngest.send({
        name: 'app/user.created',
        data: {
          email: data.email,
          name: data.fullName,
          country: data.country,
          investmentGoals: data.investmentGoals,
          riskTolerance: data.riskTolerance,
          preferredIndustry: data.preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (error) {
    console.error('Sign up failed:', error);
    return { success: false, error: 'Sign up failed. Please try again.' };
  }
}

export async function signInWithEmail(data: SignInFormData) {
  try {
    const auth = await getAuth();
    const response = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Sign in failed:', error);
    return {
      success: false,
      error: 'Invalid email or password. Please try again.',
    };
  }
}

export async function signOut() {
  try {
    const auth = await getAuth();
    await auth.api.signOut({
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    console.error('Sign out failed:', error);
    return { success: false, error: 'Sign out failed' };
  }
}
