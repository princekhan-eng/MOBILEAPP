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
    // Enforce safe roles only from registration
    const role: UserRole = input.role === 'SHOP_ADMIN' ? 'SHOP_ADMIN' : 'CUSTOMER';

    const user = await authRepository.createUser({
      email: input.email.toLowerCase().trim(),
      passwordHash,
      name: input.name.trim(),
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
    const user = await authRepository.findUserByEmail(input.email.toLowerCase().trim());
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

  async getCurrentUser(userId: string) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}

export const authService = new AuthService();
