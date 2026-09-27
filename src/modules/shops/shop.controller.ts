import { shopService } from './shop.service';
import { createShopSchema, updateShopSchema } from './shop.schema';
import { successResponse, errorResponse } from '@/lib/response';

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
      return errorResponse(error.message, 404);
    }
  }

  async create(body: any) {
    try {
      const parsed = createShopSchema.parse(body);
      const shop = await shopService.createShop(parsed);
      return successResponse(shop, 'Shop created successfully', 201);
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async update(id: string, body: any) {
    try {
      const parsed = updateShopSchema.parse(body);
      const shop = await shopService.updateShop(id, parsed);
      return successResponse(shop, 'Shop updated successfully');
    } catch (error: any) {
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
