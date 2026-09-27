import { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { JwtPayload } from '@/types/auth';

export function authenticateRequest(req: NextRequest): JwtPayload | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return verifyJwt(token);
}
