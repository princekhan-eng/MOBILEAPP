import { NextRequest } from 'next/server';
import { userController } from '@/modules/users/user.controller';
import { requirePlatformAdmin } from '@/lib/auth-guard';
import { errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  // Only platform admins can list all platform users
  const auth = requirePlatformAdmin(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  const { searchParams } = new URL(req.url);
  return userController.getAll(searchParams);
}
