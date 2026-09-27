import { NextRequest } from 'next/server';
import { verifyJwt, verifyJwtWithReason, JwtVerifyResult } from '@/lib/jwt';
import { JwtPayload } from '@/types/auth';

export function extractAuthToken(req: NextRequest | Request): string | null {
  // 1. Check Authorization Header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1].trim();
  }

  // 2. Check Cookie Header (for browser requests)
  if ('cookies' in req && typeof (req as NextRequest).cookies?.get === 'function') {
    const cookieToken = (req as NextRequest).cookies.get('token')?.value;
    if (cookieToken) return cookieToken;
  } else {
    const cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
      const match = cookieHeader.match(/(?:^|;\s*)token=([^;]*)/);
      if (match) return decodeURIComponent(match[1]);
    }
  }

  return null;
}

export function authenticateRequest(req: NextRequest | Request): JwtPayload | null {
  const token = extractAuthToken(req);
  if (!token) return null;
  return verifyJwt(token);
}

export function authenticateRequestWithDetail(req: NextRequest | Request): JwtVerifyResult {
  const token = extractAuthToken(req);
  return verifyJwtWithReason(token);
}
