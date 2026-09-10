import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  totalFavorites: number;
}

const FAVORITES_STORAGE_KEY = 'luma_hotz_favorites_v1';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const isFavorite = (productId: string) => favorites.includes(productId);

  const toggleFavorite = (productId: string): boolean => {
    let willBeFavorite = false;
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        willBeFavorite = false;
        return prev.filter((id) => id !== productId);
      } else {
        willBeFavorite = true;
        return [...prev, productId];
      }
    });
    return willBeFavorite;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        totalFavorites: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
