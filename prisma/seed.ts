import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data for Mobile Shop Network...');

  // Hash password
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Super Admin User
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@mobilenet.com' },
    update: {},
    create: {
      email: 'admin@mobilenet.com',
      passwordHash,
      name: 'Super Administrator',
      role: 'SUPER_ADMIN',
    },
  });

  // 2. Create Sample Vendor User & Shop
  const shopOwner = await prisma.user.upsert({
    where: { email: 'vendor@techmobile.com' },
    update: {},
    create: {
      email: 'vendor@techmobile.com',
      passwordHash,
      name: 'John TechOwner',
      role: 'SHOP_ADMIN',
      phone: '+1-800-555-0199',
    },
  });

  const shop = await prisma.shop.upsert({
    where: { slug: 'techmobile-hub' },
    update: {},
    create: {
      name: 'TechMobile Hub',
      slug: 'techmobile-hub',
      description: 'Official verified flagship store for premium mobile devices and accessories.',
      address: '742 Mobile Ave, Silicon Valley, CA',
      phone: '+1-800-555-0199',
      email: 'contact@techmobile.com',
      status: 'ACTIVE',
      ownerId: shopOwner.id,
    },
  });

  // Link shop owner to shop
  await prisma.user.update({
    where: { id: shopOwner.id },
    data: { shopId: shop.id },
  });

  // 3. Create Categories
  const categorySmartphones = await prisma.category.upsert({
    where: { slug: 'smartphones' },
    update: {},
    create: {
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Latest flagship and budget smartphones',
    },
  });

  const categoryAccessories = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Cases, chargers, wireless earbuds, and screen protectors',
    },
  });

  // 4. Create Sample Products & Inventory
  const product1 = await prisma.product.upsert({
    where: { slug: 'apple-iphone-15-pro-max-256gb' },
    update: {},
    create: {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'apple-iphone-15-pro-max-256gb',
      description: 'Titanium design, A17 Pro chip, customizable Action button, and 5x Telephoto camera.',
      price: 1199,
      compareAtPrice: 1299,
      images: JSON.stringify(['/images/iphone15pro.jpg']),
      brand: 'Apple',
      model: '15 Pro Max',
      specs: JSON.stringify({ Storage: '256GB', RAM: '8GB', Color: 'Natural Titanium', Screen: '6.7-inch OLED' }),
      categoryId: categorySmartphones.id,
      shopId: shop.id,
      status: 'ACTIVE',
      inventory: {
        create: {
          shopId: shop.id,
          quantity: 24,
          lowStockThreshold: 5,
        },
      },
    },
  });

  const product2 = await prisma.product.upsert({
    where: { slug: 'samsung-galaxy-s24-ultra-512gb' },
    update: {},
    create: {
      name: 'Galaxy S24 Ultra 512GB',
      slug: 'samsung-galaxy-s24-ultra-512gb',
      description: 'Galaxy AI is here. Epic camera with 200MP, built-in S Pen, and Snapdragon 8 Gen 3.',
      price: 1299,
      images: JSON.stringify(['/images/s24ultra.jpg']),
      brand: 'Samsung',
      model: 'S24 Ultra',
      specs: JSON.stringify({ Storage: '512GB', RAM: '12GB', Color: 'Titanium Gray', Screen: '6.8-inch Dynamic AMOLED 2X' }),
      categoryId: categorySmartphones.id,
      shopId: shop.id,
      status: 'ACTIVE',
      inventory: {
        create: {
          shopId: shop.id,
          quantity: 18,
          lowStockThreshold: 5,
        },
      },
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
