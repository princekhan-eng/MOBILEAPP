import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { trendService } from '@/modules/demand-supply/trend.service';
import { HeroQuickSearch } from '@/components/public/HeroQuickSearch';
import { HeroDeviceShowcase } from '@/components/public/HeroDeviceShowcase';
import { CategoryGrid } from '@/components/public/CategoryGrid';
import { HowItWorksTabs } from '@/components/public/HowItWorksTabs';
import { TrustAndSecuritySection } from '@/components/public/TrustAndSecuritySection';
import { CustomerReviews } from '@/components/public/CustomerReviews';
import { FaqAccordion } from '@/components/public/FaqAccordion';
import { RoleTabs } from '@/components/public/RoleTabs';
import { 
  Store, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle, 
  Package, 
  MapPin, 
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';

export default async function HomePage() {
  // Fetch real-time data from database
  let featuredProducts: any[] = [];
  let partnerShops: any[] = [];
  let marketOpportunities: any[] = [];

  try {
    const [products, shops, opportunities] = await Promise.all([
      prisma.product.findMany({
        where: { status: 'ACTIVE' },
        include: {
          shop: { select: { id: true, name: true, slug: true, status: true } },
          category: { select: { name: true } },
          inventory: true,
        },
        take: 12,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.shop.findMany({
        where: { status: 'ACTIVE' },
        include: { _count: { select: { products: true } } },
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      trendService.getMarketOpportunities(),
    ]);

    featuredProducts = products;
    partnerShops = shops;
    marketOpportunities = opportunities.slice(0, 3);
  } catch (e) {
    // Graceful fallback if database is bootstrapping
  }

  return (
    <div className="space-y-28 pb-24 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & INTERACTIVE DEVICE SHOWCASE */}
      {/* ========================================================================= */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Next-Generation Multi-Tenant Mobile Marketplace • 0% Fraud Guarantee</span>
          </div>

          {/* Master Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            The Smart Ecosystem for{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              Verified Mobile Shops
            </span>{' '}
            &amp; Buyers
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Find authentic in-stock flagships at local verified retail shops, reserve online with zero markup, or run your mobile store with lightning-fast cloud POS.
          </p>

          {/* Interactive Search Bar */}
          <HeroQuickSearch />

          {/* Key CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 font-bold text-white text-sm transition shadow-xl shadow-indigo-600/30 flex items-center space-x-2"
            >
              <span>Explore Marketplace</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop-admin/dashboard"
              className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 font-bold text-slate-200 text-sm border border-slate-700/80 hover:border-slate-600 transition flex items-center space-x-2"
            >
              <Store className="w-4 h-4 text-indigo-400" />
              <span>Shop Owner Portal</span>
            </Link>

            <Link
              href="/admin/dashboard"
              className="px-7 py-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 font-bold text-purple-300 text-sm border border-purple-500/30 hover:border-purple-500/50 transition flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Super Admin</span>
            </Link>
          </div>

          {/* Interactive Device Preview Showcase Widget */}
          <HeroDeviceShowcase />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LIVE PLATFORM METRICS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl">
          <div className="space-y-1 text-center border-r border-slate-800/80 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-white">100%</p>
            <p className="text-xs text-slate-400 font-medium">Tenant Data Isolation</p>
          </div>
          <div className="space-y-1 text-center border-r border-slate-800/80 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-emerald-400">&lt; 15ms</p>
            <p className="text-xs text-slate-400 font-medium">Inventory POS Sync</p>
          </div>
          <div className="space-y-1 text-center border-r border-slate-800/80 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-indigo-400">Real-Time</p>
            <p className="text-xs text-slate-400 font-medium">Demand-Supply Engine</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-3xl sm:text-4xl font-black text-purple-400">42+</p>
            <p className="text-xs text-slate-400 font-medium">Authorized Retail Stores</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE CATEGORY EXPLORER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Browse by Category</span>
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Curated Mobile Hardware Collections
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore authentic smartphones, tablets, wearables, and fast-charging accessories across local shops.
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 transition"
          >
            <span>View all categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <CategoryGrid />
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED FLAGSHIP DEVICES (LIVE DATABASE) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live In-Stock Showcase</span>
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Featured Flagships &amp; Premium Devices
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Browse authentic flagship models available directly from verified network shops with local pickup.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 transition"
          >
            <span>View all products ({featuredProducts.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No devices currently listed. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group relative bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {p.brand}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{p.inventory?.quantity ?? 0} in stock</span>
                    </span>
                  </div>

                  <div className="h-36 bg-slate-950/60 rounded-2xl flex items-center justify-center p-4 border border-slate-800/80 group-hover:scale-[1.02] transition">
                    <span className="text-5xl font-black text-slate-700 select-none">
                      {p.brand[0]}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition truncate">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Model: {p.model}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-800/60 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Retail Price</span>
                    <span className="text-xl font-extrabold text-white">${p.price}</span>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                    {p.shop?.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS: INTERACTIVE STEP-BY-STEP (SHOPPERS VS SHOPS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Streamlined Commerce Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How MobileNet Works
          </h2>
          <p className="text-sm text-slate-400">
            A frictionless bridge connecting local high-street mobile retail with modern digital discovery and reservation.
          </p>
        </div>

        <HowItWorksTabs />
      </section>

      {/* ========================================================================= */}
      {/* 6. DEMAND & SUPPLY INTELLIGENCE SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Predictive Algorithmic Telemetry</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Real-Time Market Opportunity Gaps
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Our engine automatically scores models where customer search interest exceeds existing physical inventory.
              </p>
            </div>
            <Link
              href="/trending"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center space-x-2 shrink-0 self-start md:self-auto"
            >
              <span>View Full Trending Radar</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-6">
            {marketOpportunities.map((op, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-base">{op.brand}</h3>
                    <p className="text-xs text-slate-400">{op.model}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Gap +{op.opportunityGap}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
                  <div className="flex justify-between">
                    <span>Demand Index:</span>
                    <span className="text-indigo-400 font-semibold">{op.demandIndex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Stock:</span>
                    <span className="text-amber-400 font-semibold">{op.supplyIndex}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. THREE-PILLAR ECOSYSTEM (RoleTabs) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Engineered for Every Stakeholder
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tailored Experiences Across the Network
          </h2>
          <p className="text-sm text-slate-400">
            Whether you are picking up a smartphone, running a retail mobile shop, or orchestrating the marketplace platform.
          </p>
        </div>

        <RoleTabs />
      </section>

      {/* ========================================================================= */}
      {/* 8. TRUST, SECURITY & HARDWARE GUARANTEE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustAndSecuritySection />
      </section>

      {/* ========================================================================= */}
      {/* 9. VERIFIED PARTNER SHOPS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Authorized Network
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Verified Partner Shops</h2>
            <p className="text-sm text-slate-400 mt-1">
              Shop in-store or reserve online with guaranteed genuine mobile hardware and manufacturer warranties.
            </p>
          </div>
          <Link
            href="/shops"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 transition"
          >
            <span>Explore all shops</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {partnerShops.map((shop) => (
            <Link
              key={shop.id}
              href={`/shops/${shop.id}`}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition space-y-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-xl">
                  {shop.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{shop.name}</h3>
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Vendor</span>
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800/80">
                <p className="flex items-center space-x-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{shop.address}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Package className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{shop._count?.products || 0} Listed Devices</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. SOCIAL PROOF & TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomerReviews />
      </section>

      {/* ========================================================================= */}
      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion />
      </section>

      {/* ========================================================================= */}
      {/* 12. HIGH-CONVERTING VENDOR & BUYER ONBOARDING CTA BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 text-center space-y-6 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Grow Your Mobile Business Today</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Take Your Mobile Shop to the Next Level?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Get instant access to POS receipting, automated stock control, and platform-wide customer reach in less than 2 minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shop-admin/auth/login"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-white text-sm transition shadow-xl shadow-indigo-600/30 flex items-center space-x-2"
            >
              <span>Onboard Your Shop Now</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-700 transition flex items-center space-x-2"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
