import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  emptyMessage = 'Nenhum produto encontrado nesta seleção.',
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse space-y-3">
            <div className="aspect-[3/4] bg-[#FAF7F5] border border-[#EAEAEA] w-full" />
            <div className="h-3 bg-[#FAF7F5] w-3/4" />
            <div className="h-3 bg-[#FAF7F5] w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-[#EAEAEA] p-8">
        <p className="font-serif text-lg text-[#171717] mb-2">Sem produtos no momento</p>
        <p className="text-xs text-[#6F6F6F] max-w-md mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      id="products-grid"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
};
