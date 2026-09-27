import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';
import { requirePlatformAdmin } from '@/lib/auth-guard';
import { slugify } from '@/utils/slug';
import { z } from 'zod';

const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().optional(),
  image: z.string().optional(),
});

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
    return successResponse(categories, 'Categories retrieved');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}

export async function POST(req: NextRequest) {
  // Only platform admins can define global categories
  const auth = requirePlatformAdmin(req);
  if (!auth.success) {
    return errorResponse(auth.message, auth.status);
  }

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return errorResponse('Invalid JSON body', 400);
    }

    const parsed = createCategorySchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, parsed.error.issues);
    }

    const slug = slugify(parsed.data.name);
    const category = await prisma.category.create({
      data: {
        name: parsed.data.name,
        slug,
        description: parsed.data.description,
        image: parsed.data.image,
      },
    });
    return successResponse(category, 'Category created', 201);
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
