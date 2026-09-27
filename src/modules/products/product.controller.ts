import { productService } from './product.service';
import { createProductSchema, updateProductSchema } from './product.schema';
import { successResponse, errorResponse } from '@/lib/response';

export class ProductController {
  async getAll(searchParams: URLSearchParams) {
    try {
      const page = Number(searchParams.get('page')) || 1;
      const limit = Number(searchParams.get('limit')) || 10;
      const shopId = searchParams.get('shopId') || undefined;
      const categoryId = searchParams.get('categoryId') || undefined;
      const brand = searchParams.get('brand') || undefined;
      const search = searchParams.get('search') || undefined;
      const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
      const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

      const result = await productService.getProducts(page, limit, {
        shopId,
        categoryId,
        brand,
        search,
        minPrice,
        maxPrice,
      });

      return successResponse(result.products, 'Products retrieved successfully', 200, result.meta);
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async getById(idOrSlug: string) {
    try {
      const product = await productService.getProduct(idOrSlug);
      return successResponse(product, 'Product retrieved successfully');
    } catch (error: any) {
      return errorResponse(error.message, 404);
    }
  }

  async create(body: any) {
    try {
      const parsed = createProductSchema.parse(body);
      const product = await productService.createProduct(parsed);
      return successResponse(product, 'Product created successfully', 201);
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async update(id: string, body: any) {
    try {
      const parsed = updateProductSchema.parse(body);
      const product = await productService.updateProduct(id, parsed);
      return successResponse(product, 'Product updated successfully');
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async delete(id: string) {
    try {
      await productService.deleteProduct(id);
      return successResponse(null, 'Product deleted successfully');
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }
}

export const productController = new ProductController();
