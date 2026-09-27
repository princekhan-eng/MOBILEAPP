import { NextRequest } from 'next/server';
import { authController } from '@/modules/auth/auth.controller';
import { requireAuth } from '@/lib/auth-guard';
import { errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  return authController.me(auth.context.user.userId);
}
