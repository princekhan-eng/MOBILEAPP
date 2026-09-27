import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-mobile-shop-network-2026';

export function signJwt(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}
