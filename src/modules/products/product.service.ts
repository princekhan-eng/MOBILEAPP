import { productRepository } from './product.repository';
import { CreateProductInput, UpdateProductInput } from './product.types';

export class ProductService {
  async getProducts(
    page = 1,
    limit = 10,
    filters?: { shopId?: string; categoryId?: string; brand?: string; search?: string; minPrice?: number; maxPrice?: number }
  ) {
    const skip = (page - 1) * limit;
    const { products, total } = await productRepository.findAll(skip, limit, filters);
    
    // Parse JSON specs & images safely
    const formatted = products.map((p) => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      specs: JSON.parse(p.specs || '{}'),
    }));

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

  async getProduct(identifier: string) {
    const product = await productRepository.findByIdOrSlug(identifier);
    if (!product) throw new Error('Product not found');
    return {
      ...product,
      images: JSON.parse(product.images || '[]'),
      specs: JSON.parse(product.specs || '{}'),
    };
  }

  async createProduct(input: CreateProductInput) {
    return productRepository.create(input);
  }

  async updateProduct(id: string, input: UpdateProductInput) {
    return productRepository.update(id, input);
  }

  async deleteProduct(id: string) {
    return productRepository.delete(id);
  }
}

export const productService = new ProductService();
