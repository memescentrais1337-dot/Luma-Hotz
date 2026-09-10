export interface ProductColor {
  name: string;
  hex?: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection?: string;

  price: number;
  oldPrice?: number;

  description: string;
  details?: string;
  composition?: string;
  care?: string;

  images: string[];

  colors?: ProductColor[];

  sizes?: string[];
  unavailableSizes?: string[];

  tags?: string[];

  badge?: string;

  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;

  stockStatus?: 'available' | 'low' | 'unavailable';
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image: string;
  featured?: boolean;
  itemCount?: number;
}

export interface CartItem {
  id: string; // unique item id composed of product.id-color-size
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageDesktop: string;
  imageMobile: string;
  textPosition: 'left' | 'center' | 'right';
  badge?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

export type SortOption =
  | 'recent'
  | 'best-sellers'
  | 'price-asc'
  | 'price-desc'
  | 'discount'
  | 'name-asc';

export interface FilterState {
  category?: string;
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  onlyPromotions: boolean;
}
