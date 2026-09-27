import { prisma } from '@/lib/prisma';
import { CreateProductInput, UpdateProductInput } from './product.types';
import { slugify } from '@/utils/slug';

export class ProductRepository {
  async findAll(skip = 0, limit = 10, filters: { shopId?: string; categoryId?: string; brand?: string; search?: string; minPrice?: number; maxPrice?: number } = {}) {
    const where: any = {};

    if (filters.shopId) where.shopId = filters.shopId;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.brand) where.brand = { contains: filters.brand };
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search } },
        { brand: { contains: filters.search } },
        { model: { contains: filters.search } },
      ];
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          shop: { select: { id: true, name: true, slug: true } },
          inventory: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return { products, total };
  }

  async findByIdOrSlug(identifier: string) {
    return prisma.product.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
      include: {
        category: true,
        shop: true,
        inventory: true,
      },
    });
  }

  async create(data: CreateProductInput) {
    const slug = slugify(`${data.brand}-${data.model}-${data.name}-${Date.now().toString().slice(-4)}`);
    const { initialStock, images, specs, ...productData } = data;

    return prisma.product.create({
      data: {
        ...productData,
        slug,
        images: JSON.stringify(images),
        specs: JSON.stringify(specs),
        inventory: {
          create: {
            shopId: data.shopId,
            quantity: initialStock || 0,
          },
        },
      },
      include: { inventory: true },
    });
  }

  async update(id: string, data: UpdateProductInput) {
    const updateData: any = { ...data };
    if (data.images) updateData.images = JSON.stringify(data.images);
    if (data.specs) updateData.specs = JSON.stringify(data.specs);
    if (data.name) updateData.slug = slugify(`${data.brand || ''}-${data.name}-${Date.now().toString().slice(-4)}`);

    return prisma.product.update({
      where: { id },
      data: updateData,
      include: { inventory: true },
    });
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}

export const productRepository = new ProductRepository();
