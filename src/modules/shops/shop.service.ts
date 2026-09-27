import { shopRepository } from './shop.repository';
import { CreateShopInput, UpdateShopInput } from './shop.types';

export class ShopService {
  async getShops(page = 1, limit = 10, search?: string, status?: string) {
    const skip = (page - 1) * limit;
    const { shops, total } = await shopRepository.findAll(skip, limit, search, status);
    return {
      shops,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getShop(identifier: string) {
    const shop = await shopRepository.findByIdOrSlug(identifier);
    if (!shop) throw new Error('Shop not found');
    return shop;
  }

  async createShop(input: CreateShopInput) {
    return shopRepository.create(input);
  }

  async updateShop(id: string, input: UpdateShopInput) {
    return shopRepository.update(id, input);
  }

  async deleteShop(id: string) {
    return shopRepository.delete(id);
  }
}

export const shopService = new ShopService();
