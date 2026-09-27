import { prisma } from '@/lib/prisma';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { shop: true, ownedShops: true },
    });
  }

  async createUser(data: {
    email: string;
    passwordHash: string;
    name: string;
    role: any;
    phone?: string;
    shopId?: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}

export const authRepository = new AuthRepository();
