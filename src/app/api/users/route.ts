import { NextRequest } from 'next/server';
import { userController } from '@/modules/users/user.controller';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return userController.getAll(searchParams);
}
