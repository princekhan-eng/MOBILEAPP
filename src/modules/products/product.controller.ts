import { productService } from './product.service';
import { createProductSchema, updateProductSchema } from './product.schema';
import { successResponse, errorResponse } from '@/lib/response';

export class ProductController {
  async getAll(searchParams: URLSearchParams, scopedShopId?: string | null) {
    try {
      const page = Number(searchParams.get('page')) || 1;
      const limit = Number(searchParams.get('limit')) || 10;
      // If scopedShopId is given (e.g. from shop admin session), enforce it; otherwise respect searchParams for public/platform admin
      const shopId = scopedShopId || searchParams.get('shopId') || undefined;
      const categoryId = searchParams.get('categoryId') || undefined;
      const brand = searchParams.get('brand') || undefined;
      const search = searchParams.get('search') || undefined;
      const status = searchParams.get('status') || undefined;
      const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
      const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

      const result = await productService.getProducts(page, limit, {
        shopId,
        categoryId,
        brand,
        search,
        status,
        minPrice,
        maxPrice,
      });

      return successResponse(result.products, 'Products retrieved successfully', 200, result.meta);
    } catch (error: any) {
      return errorResponse(error.message, 400);
    }
  }

  async getById(idOrSlug: string, scopedShopId?: string | null) {
    try {
      const product = await productService.getProduct(idOrSlug, scopedShopId);
      return successResponse(product, 'Product retrieved successfully');
    } catch (error: any) {
      return errorResponse(error.message || 'Product not found', 404);
    }
  }

  async create(body: any, targetShopId: string) {
    try {
      const parsed = createProductSchema.parse({
        ...body,
        shopId: targetShopId,
      });

      const product = await productService.createProduct({
        ...parsed,
        shopId: targetShopId,
      });

      return successResponse(product, 'Product created successfully', 201);
    } catch (error: any) {
      if (error?.issues || error?.errors) {
        return errorResponse('Validation failed', 400, error.issues || error.errors);
      }
      return errorResponse(error.message, 400);
    }
  }

  async update(id: string, body: any, scopedShopId?: string | null) {
    try {
      const parsed = updateProductSchema.parse(body);
      const product = await productService.updateProduct(id, parsed, scopedShopId);
      return successResponse(product, 'Product updated successfully');
    } catch (error: any) {
      if (error?.issues || error?.errors) {
        return errorResponse('Validation failed', 400, error.issues || error.errors);
      }
      const isAccessDenied = error.message?.includes('access denied');
      return errorResponse(error.message, isAccessDenied ? 403 : 400);
    }
  }

  async delete(id: string, scopedShopId?: string | null) {
    try {
      await productService.deleteProduct(id, scopedShopId);
      return successResponse(null, 'Product deleted successfully');
    } catch (error: any) {
      const isAccessDenied = error.message?.includes('access denied');
      return errorResponse(error.message, isAccessDenied ? 403 : 400);
    }
  }
}

export const productController = new ProductController();
