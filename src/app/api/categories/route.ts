import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';
import { slugify } from '@/utils/slug';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    });
    return successResponse(categories, 'Categories retrieved');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = slugify(body.name);
    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug,
        description: body.description,
        image: body.image,
      },
    });
    return successResponse(category, 'Category created', 201);
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
