'use client';

import React, { createContext, useContext, useState } from 'react';

interface ShopContextType {
  activeShopId: string | null;
  setActiveShopId: (id: string | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);

  return (
    <ShopContext.Provider value={{ activeShopId, setActiveShopId }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
