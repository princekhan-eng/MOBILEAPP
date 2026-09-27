import { create } from 'zustand';

interface FiltersState {
  searchQuery: string;
  selectedCategory: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  brand: string | null;
  sortBy: string;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setBrand: (brand: string | null) => void;
  setSortBy: (sortBy: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  searchQuery: '',
  selectedCategory: null,
  minPrice: null,
  maxPrice: null,
  brand: null,
  sortBy: 'createdAt',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCategory: (selectedCategory) => set({ selectedCategory }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  setBrand: (brand) => set({ brand }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedCategory: null,
      minPrice: null,
      maxPrice: null,
      brand: null,
      sortBy: 'createdAt',
    }),
}));
