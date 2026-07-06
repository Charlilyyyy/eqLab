/* eslint-disable @typescript-eslint/no-explicit-any */
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import { connectToDatabase } from '@/database/mongoose';

let authInstance: ReturnType<typeof betterAuth> | null = null;

export async function getAuth() {
  if (authInstance) return authInstance;

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error('Database connection failed: db instance is undefined');
  }

  authInstance = betterAuth({
    database: mongodbAdapter(db as any),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_BASE_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  }) as unknown as ReturnType<typeof betterAuth>;

  return authInstance;
}
