import { NextRequest } from 'next/server';
import { shopController } from '@/modules/shops/shop.controller';
import { requireAuth } from '@/lib/auth-guard';
import { errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return shopController.getAll(searchParams);
}

export async function POST(req: NextRequest) {
  // Creating a shop requires authentication
  const auth = requireAuth(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return errorResponse('Invalid JSON body', 400);
  }

  // Derive ownerId strictly from authenticated user session, with platform admin delegation support
  return shopController.create(body, auth.context.user.userId, auth.context.isPlatformAdmin);
}
