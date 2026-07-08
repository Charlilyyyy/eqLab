import { toNextJsHandler } from 'better-auth/next-js';

import { getAuth } from '@/lib/better-auth/auth';

async function handler(request: Request) {
  const auth = await getAuth();
  return auth.handler(request);
}

export const { GET, POST } = toNextJsHandler(handler);
