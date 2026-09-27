import { prisma } from '@/lib/prisma';
import { CreateShopInput, UpdateShopInput } from './shop.types';
import { slugify } from '@/utils/slug';

export class ShopRepository {
  async findAll(skip = 0, limit = 10, search?: string, status?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { address: { contains: search } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const [shops, total] = await Promise.all([
      prisma.shop.findMany({
        where,
        skip,
        take: limit,
        include: { owner: { select: { id: true, name: true, email: true } }, _count: { select: { products: true, employees: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.shop.count({ where }),
    ]);

    return { shops, total };
  }

  async findByIdOrSlug(identifier: string) {
    return prisma.shop.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        products: { take: 10, where: { status: 'ACTIVE' } },
        subscriptions: { where: { status: 'ACTIVE' }, take: 1 },
      },
    });
  }

  async create(data: CreateShopInput) {
    const slug = slugify(data.name);
    return prisma.shop.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  async update(id: string, data: UpdateShopInput) {
    const updateData: any = { ...data };
    if (data.name) {
      updateData.slug = slugify(data.name);
    }
    return prisma.shop.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    return prisma.shop.delete({ where: { id } });
  }
}

export const shopRepository = new ShopRepository();
