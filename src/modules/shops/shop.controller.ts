import { shopService } from './shop.service';
import { createShopSchema, updateShopSchema } from './shop.schema';
import { successResponse, errorResponse } from '@/lib/response';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export class ShopController {
  async getAll(searchParams: URLSearchParams) {
    try {
      const page = Number(searchParams.get('page')) || 1;
      const limit = Number(searchParams.get('limit')) || 10;
      const search = searchParams.get('search') || undefined;
      const status = searchParams.get('status') || undefined;
      const result = await shopService.getShops(page, limit, search, status);
      return successResponse(result.shops, 'Shops retrieved successfully', 200, result.meta);
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async getById(idOrSlug: string) {
    try {
      const shop = await shopService.getShop(idOrSlug);
      return successResponse(shop, 'Shop retrieved successfully');
    } catch (error: any) {
      return errorResponse(error.message || 'Shop not found', 404);
    }
  }

  async create(body: any, requesterUserId: string, isPlatformAdmin: boolean = false) {
    try {
      const parsed = createShopSchema.parse({
        ...body,
        ownerId: body.ownerId || requesterUserId,
      });

      let targetOwnerId = requesterUserId;

      if (isPlatformAdmin) {
        const ownerEmail = (parsed.ownerEmail || parsed.email).toLowerCase().trim();
        const existingUser = await prisma.user.findUnique({
          where: { email: ownerEmail },
        });

        if (existingUser) {
          targetOwnerId = existingUser.id;
        } else {
          // Create new vendor account for this shop
          const passwordHash = await bcrypt.hash(parsed.ownerPassword || 'Vendor@2026!', 10);
          const newOwner = await prisma.user.create({
            data: {
              email: ownerEmail,
              name: parsed.ownerName || `${parsed.name} Manager`,
              passwordHash,
              role: 'SHOP_ADMIN',
              phone: parsed.phone,
            },
          });
          targetOwnerId = newOwner.id;
        }
      }

      const shop = await shopService.createShop({
        name: parsed.name,
        description: parsed.description,
        logo: parsed.logo,
        banner: parsed.banner,
        address: parsed.address,
        phone: parsed.phone,
        email: parsed.email,
        ownerId: targetOwnerId,
        status: isPlatformAdmin && parsed.status ? parsed.status : 'ACTIVE',
      });

      return successResponse(shop, 'Shop created successfully', 201);
    } catch (error: any) {
      if (error?.issues || error?.errors) {
        return errorResponse('Validation failed', 400, error.issues || error.errors);
      }
      return errorResponse(error.message, 400);
    }
  }

  async update(id: string, body: any, isPlatformAdmin: boolean) {
    try {
      const parsed = updateShopSchema.parse(body);

      // If non-platform admin tries to update status, disallow it
      if (!isPlatformAdmin && parsed.status) {
        delete parsed.status;
      }

      const shop = await shopService.updateShop(id, parsed);
      return successResponse(shop, 'Shop updated successfully');
    } catch (error: any) {
      if (error?.issues || error?.errors) {
        return errorResponse('Validation failed', 400, error.issues || error.errors);
      }
      return errorResponse(error.message, 400);
    }
  }

  async delete(id: string) {
    try {
      await shopService.deleteShop(id);
      return successResponse(null, 'Shop deleted successfully');
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }
}

export const shopController = new ShopController();
