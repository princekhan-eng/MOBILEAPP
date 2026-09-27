'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Shoppers',
    q: 'How does reserving a phone online work?',
    a: 'When you find a device at a nearby verified shop, clicking "Reserve In-Store" puts a guaranteed 24-hour hold on that specific IMEI and colorway. You do not pay any online markups—you simply visit the store, physically inspect the phone, and complete payment via card, cash, or installments in person.',
  },
  {
    category: 'Trust & Safety',
    q: 'How do you guarantee authentic IMEIs and clean serial numbers?',
    a: 'All partner shops in the network must maintain verified business credentials and run hardware checks. Serial numbers and IMEIs are cross-referenced to ensure factory unlocked status, clean carrier records, and valid warranty status prior to listing.',
  },
  {
    category: 'Retailers',
    q: 'How fast can a new mobile shop onboard and start selling?',
    a: 'Registration takes less than 2 minutes. Once approved, you gain immediate access to your dedicated Shop Admin portal, where you can upload inventory individually or via CSV, issue POS receipts, and appear instantly in regional marketplace searches.',
  },
  {
    category: 'Technology & POS',
    q: 'What hardware works with the MobileNet Cloud POS terminal?',
    a: 'MobileNet works seamlessly on any browser across Windows, macOS, iPad/tablets, and Android phones. It natively supports standard USB and Bluetooth barcode scanners, ESC/POS thermal receipt printers, and cash drawers with sub-15ms sync times.',
  },
  {
    category: 'Security',
    q: 'Can other mobile shops see my wholesale costs or customer list?',
    a: 'Never. Our database architecture enforces strict multi-tenant isolation at both the query engine and JWT middleware layers. No shop owner or employee can ever access, modify, or view another store’s customer records, financial receipts, or private inventory costs.',
  },
  {
    category: 'Warranty & Returns',
    q: 'What is the return and warranty policy on purchased devices?',
    a: 'All brand-new devices include full manufacturer warranty (typically 12 months). Certified pre-owned and refurbished devices include our standard network 7-day hassle-free replacement guarantee alongside the individual shop warranty card.',
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
          Frequently Asked Questions
        </span>
        <h2 className="text-3xl font-extrabold text-white">
          Everything You Need to Know
        </h2>
        <p className="text-sm text-slate-400">
          Got questions about buying devices, reserving in-store, or running your shop POS? We have answers.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-slate-900 border-indigo-500/40 shadow-xl shadow-indigo-500/5'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-400">
                    {faq.category}
                  </span>
                  <span className="font-bold text-white text-sm sm:text-base">
                    {faq.q}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 mt-1 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
