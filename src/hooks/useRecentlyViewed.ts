import { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

const RECENTLY_VIEWED_KEY = 'luma_hotz_recently_viewed_v1';
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewedIds));
    } catch (e) {
      console.error('Failed to save recently viewed to localStorage', e);
    }
  }, [viewedIds]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  const recentlyViewedProducts: Product[] = viewedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  return {
    recentlyViewed: recentlyViewedProducts,
    addRecentlyViewed,
  };
}
