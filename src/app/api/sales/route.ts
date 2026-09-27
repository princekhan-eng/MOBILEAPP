import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get('shopId') || undefined;

    const sales = await prisma.sale.findMany({
      where: shopId ? { shopId } : {},
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
    const body = await req.json(); // { shopId, customerName, customerPhone, items: [{ productId, quantity, price }] }
    
    let totalAmount = 0;
    const saleItemsData = body.items.map((item: any) => {
      const subtotal = item.quantity * item.price;
      totalAmount += subtotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal,
      };
    });

    const sale = await prisma.sale.create({
      data: {
        shopId: body.shopId,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        paymentMethod: body.paymentMethod || 'CASH',
        totalAmount,
        items: {
          create: saleItemsData,
        },
      },
      include: { items: true },
    });

    // Deduct stock quantity in inventory
    for (const item of body.items) {
      await prisma.inventory.update({
        where: { productId: item.productId },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    return successResponse(sale, 'Sale recorded successfully', 201);
  } catch (error: any) {
    return errorResponse(error.message, 400);
  }
}
