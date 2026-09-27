import { NextRequest } from 'next/server';
import { authController } from '@/modules/auth/auth.controller';

export async function POST(req: NextRequest) {
  const body = await req.json();
  return authController.login(body);
}
