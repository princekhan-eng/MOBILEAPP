import { authRepository } from './auth.repository';
import { hashPassword, comparePassword } from '@/lib/password';
import { signJwt } from '@/lib/jwt';
import { RegisterInput, LoginInput } from './auth.types';
import { AUTH_ERRORS } from './auth.constants';
import { UserRole } from '@/types/global';

export class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await authRepository.findUserByEmail(input.email);
    if (existingUser) {
      throw new Error(AUTH_ERRORS.USER_EXISTS);
    }

    const passwordHash = await hashPassword(input.password);
    const role = input.role || 'CUSTOMER';

    const user = await authRepository.createUser({
      email: input.email,
      passwordHash,
      name: input.name,
      role,
      phone: input.phone,
    });

    const token = signJwt({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
      shopId: user.shopId,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as UserRole,
        shopId: user.shopId,
      },
    };
  }

  async login(input: LoginInput) {
    const user = await authRepository.findUserByEmail(input.email);
    if (!user) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const isValid = await comparePassword(input.password, user.passwordHash);
    if (!isValid) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const token = signJwt({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
      shopId: user.shopId,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as UserRole,
        shopId: user.shopId,
      },
    };
  }
}

export const authService = new AuthService();
