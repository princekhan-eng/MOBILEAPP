import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-mobile-shop-network-2026';

export function signJwt(payload: Omit<JwtPayload, 'iat' | 'exp'>, expiresIn = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export type JwtVerifyResult = 
  | { valid: true; payload: JwtPayload }
  | { valid: false; reason: 'expired' | 'invalid' | 'missing' };

export function verifyJwtWithReason(token?: string | null): JwtVerifyResult {
  if (!token) return { valid: false, reason: 'missing' };
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return { valid: true, payload };
  } catch (err: any) {
    if (err?.name === 'TokenExpiredError') {
      return { valid: false, reason: 'expired' };
    }
    return { valid: false, reason: 'invalid' };
  }
}

export function verifyJwt(token: string): JwtPayload | null {
  const result = verifyJwtWithReason(token);
  return result.valid ? result.payload : null;
}
