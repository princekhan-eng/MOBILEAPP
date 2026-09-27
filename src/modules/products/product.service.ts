import { productRepository } from './product.repository';
import { CreateProductInput, UpdateProductInput } from './product.types';

export class ProductService {
  async getProducts(
    page = 1,
    limit = 10,
    filters?: {
      shopId?: string;
      categoryId?: string;
      brand?: string;
      search?: string;
      minPrice?: number;
      maxPrice?: number;
      status?: string;
    }
  ) {
    const skip = (page - 1) * limit;
    const { products, total } = await productRepository.findAll(skip, limit, filters);

    // Safely parse JSON specs & images
    const formatted = products.map((p) => {
      let images: string[] = [];
      let specs: Record<string, any> = {};
      try {
        images = JSON.parse(p.images || '[]');
      } catch {
        images = [];
      }
      try {
        specs = JSON.parse(p.specs || '{}');
      } catch {
        specs = {};
      }

      return {
        ...p,
        images,
        specs,
      };
    });

    return {
      products: formatted,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProduct(identifier: string, scopedShopId?: string | null) {
    const product = await productRepository.findByIdOrSlug(identifier, scopedShopId);
    if (!product) throw new Error('Product not found');

    let images: string[] = [];
    let specs: Record<string, any> = {};
    try {
      images = JSON.parse(product.images || '[]');
    } catch {
      images = [];
    }
    try {
      specs = JSON.parse(product.specs || '{}');
    } catch {
      specs = {};
    }

    return {
      ...product,
      images,
      specs,
    };
  }

  async createProduct(input: CreateProductInput) {
    return productRepository.create(input);
  }

  async updateProduct(id: string, input: UpdateProductInput, scopedShopId?: string | null) {
    return productRepository.update(id, input, scopedShopId);
  }

  async deleteProduct(id: string, scopedShopId?: string | null) {
    return productRepository.delete(id, scopedShopId);
  }
}

export const productService = new ProductService();
