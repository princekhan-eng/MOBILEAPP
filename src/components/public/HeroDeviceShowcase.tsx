'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  Cpu, 
  Camera, 
  Battery, 
  ShieldCheck, 
  Store, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface DevicePreview {
  id: string;
  name: string;
  brand: string;
  price: number;
  marketPrice: number;
  colors: { name: string; hex: string; bgClass: string }[];
  specs: {
    screen: string;
    chip: string;
    camera: string;
    battery: string;
  };
  shopName: string;
  inStock: number;
  highlight: string;
}

const PREVIEW_DEVICES: DevicePreview[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    marketPrice: 1299,
    colors: [
      { name: 'Natural Titanium', hex: '#9c968f', bgClass: 'bg-stone-400' },
      { name: 'Blue Titanium', hex: '#2f3b4c', bgClass: 'bg-slate-700' },
      { name: 'White Titanium', hex: '#e3e4e5', bgClass: 'bg-slate-200' },
      { name: 'Black Titanium', hex: '#373639', bgClass: 'bg-zinc-800' },
    ],
    specs: {
      screen: '6.7" Super Retina XDR OLED 120Hz',
      chip: 'A17 Pro (3nm Bionic)',
      camera: '48MP Quad-Pixel + 5x Telephoto',
      battery: '4,422 mAh • 29h Video Playback',
    },
    shopName: 'TechMobile Hub (Downtown)',
    inStock: 5,
    highlight: 'Grade-A Factory Sealed • 1-Yr Official Warranty',
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    price: 1049,
    marketPrice: 1199,
    colors: [
      { name: 'Titanium Gray', hex: '#717376', bgClass: 'bg-zinc-500' },
      { name: 'Titanium Black', hex: '#2b2b2d', bgClass: 'bg-zinc-900' },
      { name: 'Titanium Violet', hex: '#58536b', bgClass: 'bg-purple-900' },
      { name: 'Titanium Yellow', hex: '#e5dfc5', bgClass: 'bg-amber-200' },
    ],
    specs: {
      screen: '6.8" Dynamic AMOLED 2X 2600 nits',
      chip: 'Snapdragon 8 Gen 3 for Galaxy',
      camera: '200MP Ultra-Wide + 50MP 5x Periscope',
      battery: '5,000 mAh • 45W Super Fast Charge',
    },
    shopName: 'Galaxy Cellular Express',
    inStock: 8,
    highlight: 'Integrated S-Pen & Galaxy AI Engine',
  },
  {
    id: 'google-pixel-8-pro',
    name: 'Pixel 8 Pro AI Edition',
    brand: 'Google',
    price: 899,
    marketPrice: 999,
    colors: [
      { name: 'Bay Blue', hex: '#87aee8', bgClass: 'bg-sky-400' },
      { name: 'Obsidian', hex: '#26282b', bgClass: 'bg-zinc-900' },
      { name: 'Porcelain', hex: '#ede9df', bgClass: 'bg-stone-200' },
    ],
    specs: {
      screen: '6.7" Super Actua OLED 1-120Hz',
      chip: 'Google Tensor G3 + Titan M2 Security',
      camera: '50MP Octa PD + 48MP Quad PD Tele',
      battery: '5,050 mAh • Fast Wireless Qi',
    },
    shopName: 'Nexus Tech Store',
    inStock: 4,
    highlight: '7 Years OS & Security Updates Guaranteed',
  },
];

export function HeroDeviceShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const device = PREVIEW_DEVICES[activeIdx];
  const activeColor = device.colors[selectedColorIdx] || device.colors[0];

  const handleDeviceChange = (idx: number) => {
    setActiveIdx(idx);
    setSelectedColorIdx(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 text-left">
      <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Top ambient highlight */}
        <div className="absolute -top-24 left-1/3 w-96 h-36 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Tab navigation for devices */}
        <div className="flex border-b border-slate-800/80 bg-slate-950/40 p-2 sm:p-3 overflow-x-auto gap-2">
          {PREVIEW_DEVICES.map((d, idx) => (
            <button
              key={d.id}
              onClick={() => handleDeviceChange(idx)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeIdx === idx
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{d.name}</span>
            </button>
          ))}
        </div>

        {/* Device showcase content */}
        <div className="grid md:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
          {/* Left Column: Visual Phone Representation */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-[40px] border-4 border-slate-700/80 bg-slate-950 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
              {/* Dynamic camera island pill */}
              <div className="w-24 h-5 bg-black rounded-full mx-auto shadow-inner flex items-center justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
              </div>

              {/* Screen Mockup Content */}
              <div className="text-center my-auto space-y-3">
                <div className="inline-flex p-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {device.brand} Verified Hub
                  </p>
                  <h4 className="text-xl font-black text-white">{device.name}</h4>
                  <p className="text-xs text-indigo-400 font-medium mt-1">
                    {activeColor.name}
                  </p>
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ✓ {device.inStock} In Stock Nearby
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto" />
            </div>

            {/* Color Swatch Picker */}
            <div className="flex items-center space-x-3 mt-5">
              <span className="text-xs text-slate-400 font-medium">Finishes:</span>
              <div className="flex space-x-2">
                {device.colors.map((color, cIdx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIdx(cIdx)}
                    title={color.name}
                    className={`w-6 h-6 rounded-full border-2 transition transform hover:scale-110 ${color.bgClass} ${
                      selectedColorIdx === cIdx
                        ? 'border-indigo-400 scale-110 shadow-md ring-2 ring-indigo-500/30'
                        : 'border-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Local Availability */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {device.brand} Flagship
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>IMEI Verified</span>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{device.name}</h3>
              <p className="text-xs sm:text-sm text-slate-400">{device.highlight}</p>
            </div>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Display</span>
                </div>
                <p className="text-xs font-medium text-slate-200">{device.specs.screen}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Processor</span>
                </div>
                <p className="text-xs font-medium text-slate-200">{device.specs.chip}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Optics</span>
                </div>
                <p className="text-xs font-medium text-slate-200">{device.specs.camera}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold">
                  <Battery className="w-3.5 h-3.5" />
                  <span>Battery</span>
                </div>
                <p className="text-xs font-medium text-slate-200">{device.specs.battery}</p>
              </div>
            </div>

            {/* Store & Pricing Strip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-indigo-950/30 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">${device.price}</span>
                  <span className="text-xs text-slate-500 line-through">${device.marketPrice}</span>
                  <span className="text-xs font-bold text-emerald-400">Save ${device.marketPrice - device.price}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1">
                  <Store className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Available at <strong className="text-slate-200 font-semibold">{device.shopName}</strong></span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  href="/products"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center space-x-1.5 shrink-0"
                >
                  <span>Reserve In-Store</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
