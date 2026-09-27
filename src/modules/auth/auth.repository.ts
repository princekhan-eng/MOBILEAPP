import { prisma } from '@/lib/prisma';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { shop: true, ownedShops: true },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            slug: true,
            status: true,
          },
        },
        ownedShops: {
          select: {
            id: true,
            name: true,
            slug: true,
            status: true,
          },
        },
      },
    });
  }

  async createUser(data: {
    email: string;
    passwordHash: string;
    name: string;
    role: string;
    phone?: string;
    shopId?: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}

export const authRepository = new AuthRepository();
