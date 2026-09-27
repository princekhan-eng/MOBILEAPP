import { NextRequest, NextResponse } from 'next/server';
import { authController } from '@/modules/auth/auth.controller';

export async function POST(req: NextRequest) {
  const response = await authController.logout();
  // Clear auth cookie if present
  response.cookies.delete('token');
  return response;
}
