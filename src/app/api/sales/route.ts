import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';
import { requireShopAccess } from '@/lib/auth-guard';
import { z } from 'zod';

const createSaleSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z.string().optional(),
  paymentMethod: z.enum(['CASH', 'CARD', 'ONLINE']).default('CASH'),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product ID is required'),
        quantity: z.number().int().positive('Quantity must be at least 1'),
        price: z.number().positive('Price must be greater than 0'),
      })
    )
    .min(1, 'At least one sale item is required'),
  shopId: z.string().optional(), // only platform admin can override
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedShopId = searchParams.get('shopId') || undefined;

    // Enforce authentication & shop scoping
    const auth = requireShopAccess(req, requestedShopId);
    if (!auth.success) {
      return errorResponse(auth.message, auth.status);
    }

    const effectiveShopId = auth.context.isPlatformAdmin ? requestedShopId : auth.context.shopId;

    const sales = await prisma.sale.findMany({
      where: effectiveShopId ? { shopId: effectiveShopId } : {},
      include: {
        items: { include: { product: true } },
        shop: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(sales, 'Sales retrieved');
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = requireShopAccess(req);
    if (!auth.success) {
      return errorResponse(auth.message, auth.status);
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return errorResponse('Invalid JSON body', 400);
    }

    const parsed = createSaleSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, parsed.error.issues);
    }

    // Determine target shop: strictly user.shopId for shop admins
    const effectiveShopId =
      auth.context.isPlatformAdmin && parsed.data.shopId ? parsed.data.shopId : auth.context.shopId!;

    // Verify all items belong to this shop and have sufficient stock
    for (const item of parsed.data.items) {
      const product = await prisma.product.findFirst({
        where: { id: item.productId, shopId: effectiveShopId },
        include: { inventory: true },
      });

      if (!product) {
        return errorResponse(`Product ${item.productId} not found in this shop`, 403);
      }

      const availableStock = product.inventory?.quantity || 0;
      if (availableStock < item.quantity) {
        return errorResponse(
          `Insufficient stock for "${product.name}". Available: ${availableStock}, Requested: ${item.quantity}`,
          400
        );
      }
    }

    let totalAmount = 0;
    const saleItemsData = parsed.data.items.map((item) => {
      const subtotal = item.quantity * item.price;
      totalAmount += subtotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal,
      };
    });

    // Execute sale and inventory deduction in transaction
    const sale = await prisma.$transaction(async (tx) => {
      const newSale = await tx.sale.create({
        data: {
          shopId: effectiveShopId,
          customerName: parsed.data.customerName,
          customerPhone: parsed.data.customerPhone,
          paymentMethod: parsed.data.paymentMethod,
          totalAmount,
          items: {
            create: saleItemsData,
          },
        },
        include: { items: { include: { product: true } } },
      });

      for (const item of parsed.data.items) {
        await tx.inventory.update({
          where: { productId: item.productId },
          data: { quantity: { decrement: item.quantity } },
        });
      }

      return newSale;
    });

    return successResponse(sale, 'Sale recorded successfully', 201);
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
