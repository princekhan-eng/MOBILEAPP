import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { prisma } from '../src/lib/prisma';
import { signJwt } from '../src/lib/jwt';
import { requireAuth, requireShopAccess, requirePlatformAdmin } from '../src/lib/auth-guard';
import { productRepository } from '../src/modules/products/product.repository';
import { productService } from '../src/modules/products/product.service';
import { createProductSchema } from '../src/modules/products/product.schema';
import { NextRequest } from 'next/server';

describe('Phase 1: Security, Tenant Isolation & Foundation Tests', () => {
  let shopA: any;
  let shopB: any;
  let userShopA: any;
  let userShopB: any;
  let superAdminUser: any;
  let productA: any;
  let productB: any;

  let tokenShopA: string;
  let tokenShopB: string;
  let tokenSuperAdmin: string;

  before(async () => {
    // Clean up test data if existing
    await prisma.product.deleteMany({ where: { slug: { in: ['test-device-a', 'test-device-b'] } } });
    await prisma.shop.deleteMany({ where: { slug: { in: ['test-shop-a', 'test-shop-b'] } } });
    await prisma.user.deleteMany({ where: { email: { in: ['admin-a@test.com', 'admin-b@test.com', 'super@test.com'] } } });

    // 1. Setup Super Admin
    superAdminUser = await prisma.user.create({
      data: {
        email: 'super@test.com',
        passwordHash: 'dummy',
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      },
    });

    // 2. Setup Shop A & User A
    userShopA = await prisma.user.create({
      data: {
        email: 'admin-a@test.com',
        passwordHash: 'dummy',
        name: 'Shop A Owner',
        role: 'SHOP_ADMIN',
      },
    });

    shopA = await prisma.shop.create({
      data: {
        name: 'Shop Alpha',
        slug: 'test-shop-a',
        address: '123 Alpha St',
        phone: '111-222-3333',
        email: 'alpha@test.com',
        status: 'ACTIVE',
        ownerId: userShopA.id,
      },
    });

    await prisma.user.update({
      where: { id: userShopA.id },
      data: { shopId: shopA.id },
    });

    // 3. Setup Shop B & User B
    userShopB = await prisma.user.create({
      data: {
        email: 'admin-b@test.com',
        passwordHash: 'dummy',
        name: 'Shop B Owner',
        role: 'SHOP_ADMIN',
      },
    });

    shopB = await prisma.shop.create({
      data: {
        name: 'Shop Beta',
        slug: 'test-shop-b',
        address: '456 Beta Ave',
        phone: '444-555-6666',
        email: 'beta@test.com',
        status: 'ACTIVE',
        ownerId: userShopB.id,
      },
    });

    await prisma.user.update({
      where: { id: userShopB.id },
      data: { shopId: shopB.id },
    });

    // 4. Create Category
    let category = await prisma.category.findFirst({ where: { slug: 'smartphones' } });
    if (!category) {
      category = await prisma.category.create({
        data: { name: 'Smartphones', slug: 'smartphones' },
      });
    }

    // 5. Setup Products
    productA = await prisma.product.create({
      data: {
        name: 'Device Alpha',
        slug: 'test-device-a',
        description: 'Shop A Private Device',
        price: 999,
        images: '[]',
        brand: 'Apple',
        model: 'Alpha 1',
        specs: '{}',
        categoryId: category.id,
        shopId: shopA.id,
        status: 'ACTIVE',
        inventory: {
          create: {
            shopId: shopA.id,
            quantity: 10,
          },
        },
      },
    });

    productB = await prisma.product.create({
      data: {
        name: 'Device Beta',
        slug: 'test-device-b',
        description: 'Shop B Private Device',
        price: 888,
        images: '[]',
        brand: 'Samsung',
        model: 'Beta 1',
        specs: '{}',
        categoryId: category.id,
        shopId: shopB.id,
        status: 'ACTIVE',
        inventory: {
          create: {
            shopId: shopB.id,
            quantity: 5,
          },
        },
      },
    });

    // 6. Generate Tokens
    tokenShopA = signJwt({
      userId: userShopA.id,
      email: userShopA.email,
      role: 'SHOP_ADMIN',
      shopId: shopA.id,
    });

    tokenShopB = signJwt({
      userId: userShopB.id,
      email: userShopB.email,
      role: 'SHOP_ADMIN',
      shopId: shopB.id,
    });

    tokenSuperAdmin = signJwt({
      userId: superAdminUser.id,
      email: superAdminUser.email,
      role: 'SUPER_ADMIN',
      shopId: null,
    });
  });

  after(async () => {
    // Cleanup
    await prisma.product.deleteMany({ where: { slug: { in: ['test-device-a', 'test-device-b'] } } });
    await prisma.shop.deleteMany({ where: { slug: { in: ['test-shop-a', 'test-shop-b'] } } });
    await prisma.user.deleteMany({ where: { email: { in: ['admin-a@test.com', 'admin-b@test.com', 'super@test.com'] } } });
    await prisma.$disconnect();
  });

  // TEST 1: Unauthenticated request is rejected
  it('1. Unauthenticated request without token is rejected with 401', () => {
    const req = new NextRequest('http://localhost:3000/api/auth/me');
    const auth = requireAuth(req);
    assert.strictEqual(auth.success, false);
    assert.strictEqual(auth.status, 401);
  });

  // TEST 2: Invalid/Expired token is rejected with 401
  it('2. Invalid token is rejected with 401', () => {
    const req = new NextRequest('http://localhost:3000/api/auth/me', {
      headers: { authorization: 'Bearer invalid.token.payload' },
    });
    const auth = requireAuth(req);
    assert.strictEqual(auth.success, false);
    assert.strictEqual(auth.status, 401);
  });

  // TEST 3: SHOP_ADMIN cannot target another shop via requireShopAccess
  it('3. SHOP_ADMIN A cannot request access to Shop B', () => {
    const req = new NextRequest('http://localhost:3000/api/inventory?shopId=' + shopB.id, {
      headers: { authorization: `Bearer ${tokenShopA}` },
    });
    const auth = requireShopAccess(req, shopB.id);
    assert.strictEqual(auth.success, false);
    assert.strictEqual(auth.status, 403);
    assert.match(auth.message, /Access denied/);
  });

  // TEST 4: SHOP_ADMIN cannot update another shop's product
  it('4. SHOP_ADMIN A cannot update Shop B product', async () => {
    await assert.rejects(
      async () => {
        // Attempting to update productB with shopA's scoped shopId
        await productService.updateProduct(productB.id, { name: 'Hacked Beta' }, shopA.id);
      },
      (err: any) => {
        assert.match(err.message, /access denied/i);
        return true;
      }
    );
  });

  // TEST 5: SHOP_ADMIN cannot delete another shop's product
  it('5. SHOP_ADMIN A cannot delete Shop B product', async () => {
    await assert.rejects(
      async () => {
        // Attempting to delete productB with shopA's scoped shopId
        await productService.deleteProduct(productB.id, shopA.id);
      },
      (err: any) => {
        assert.match(err.message, /access denied/i);
        return true;
      }
    );
  });

  // TEST 6: PLATFORM_ADMIN can access cross-shop resources
  it('6. PLATFORM_ADMIN has cross-shop access', () => {
    const req = new NextRequest('http://localhost:3000/api/inventory?shopId=' + shopB.id, {
      headers: { authorization: `Bearer ${tokenSuperAdmin}` },
    });
    const auth = requireShopAccess(req, shopB.id);
    assert.strictEqual(auth.success, true);
    assert.strictEqual(auth.context.isPlatformAdmin, true);
  });

  // TEST 7: Invalid Zod data is rejected (negative price, negative stock)
  it('7. Negative price and negative stock are rejected by Zod schema', () => {
    const invalidResult = createProductSchema.safeParse({
      name: 'Bad Product',
      description: 'Short',
      price: -50,
      initialStock: -5,
      brand: '',
      model: '',
      categoryId: '',
    });
    assert.strictEqual(invalidResult.success, false);
    const errors = invalidResult.error.issues;
    assert.ok(errors.some((e: any) => e.path.includes('price')));
    assert.ok(errors.some((e: any) => e.path.includes('initialStock')));
  });

  // TEST 8: SHOP_ADMIN can update their own product
  it('8. SHOP_ADMIN A can update their own product', async () => {
    const updated = await productService.updateProduct(productA.id, { price: 1049 }, shopA.id);
    assert.strictEqual(updated.price, 1049);
  });

  // TEST 9: Public product listing returns active product without requiring auth
  it('9. Public product search and retrieval works unauthenticated', async () => {
    const res = await productService.getProducts(1, 10, { search: 'Alpha' });
    assert.ok(res.products.length > 0);
    assert.strictEqual(res.products[0].id, productA.id);
  });

  // TEST 10: Non-admin user cannot access platform admin guarded endpoint
  it('10. Non-platform admin is rejected from requirePlatformAdmin with 403', () => {
    const req = new NextRequest('http://localhost:3000/api/users', {
      headers: { authorization: `Bearer ${tokenShopA}` },
    });
    const auth = requirePlatformAdmin(req);
    assert.strictEqual(auth.success, false);
    assert.strictEqual(auth.status, 403);
  });
});
