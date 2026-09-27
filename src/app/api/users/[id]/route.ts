import { NextRequest } from 'next/server';
import { userController } from '@/modules/users/user.controller';
import { requireAuth, requirePlatformAdmin } from '@/lib/auth-guard';
import { errorResponse } from '@/lib/response';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  const { id } = await context.params;

  // Platform admin can view anyone; users can view only their own profile
  if (!auth.context.isPlatformAdmin && auth.context.user.userId !== id) {
    return errorResponse('Forbidden: You can only view your own user profile', 403);
  }

  return userController.getById(id);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  const { id } = await context.params;

  // Platform admin can update anyone; users can update only their own profile
  if (!auth.context.isPlatformAdmin && auth.context.user.userId !== id) {
    return errorResponse('Forbidden: You can only update your own user profile', 403);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return errorResponse('Invalid JSON body', 400);
  }

  // Prevent privilege escalation: non-platform admin cannot alter role or shopId
  if (!auth.context.isPlatformAdmin) {
    delete body.role;
    delete body.shopId;
  }

  return userController.update(id, body);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  // Only platform admins can delete accounts
  const auth = requirePlatformAdmin(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  const { id } = await context.params;
  return userController.delete(id);
}
