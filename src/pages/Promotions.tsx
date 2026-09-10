import React, { useState, useMemo } from 'react';
import { Percent, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductGrid } from '../components/ProductGrid';
import { SortOption } from '../types';

export const Promotions: React.FC = () => {
  const [sortOption, setSortOption] = useState<SortOption>('discount');

  const promoProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => !!p.oldPrice || p.badge?.includes('%') || p.badge?.includes('PROMO')
    ).sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'discount':
        default: {
          const dA = a.oldPrice ? a.oldPrice - a.price : 0;
          const dB = b.oldPrice ? b.oldPrice - b.price : 0;
          return dB - dA;
        }
      }
    });
  }, [sortOption]);

  return (
    <div id="promotions-page" className="min-h-screen bg-white pb-20">
      <Breadcrumb items={[{ label: 'Promoções' }]} />

      {/* Hero Banner for Sale */}
      <div className="relative bg-[#FAF7F5] border-b border-[#EAEAEA] py-12 sm:py-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C36B4F] text-white text-[10px] uppercase tracking-widest font-semibold mb-3">
              <Percent className="w-3 h-3" />
              <span>Ofertas Selecionadas</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-normal">
              Special Sale
            </h1>
            <p className="text-xs sm:text-sm text-[#6F6F6F] mt-2 max-w-lg leading-relaxed">
              Descontos de até 40% OFF em peças exclusivas. Condições especiais válidas enquanto durarem nossos estoques.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="promo-sort-select"
              className="text-xs uppercase tracking-wider text-[#6F6F6F] font-semibold"
            >
              Ordenar por:
            </label>
            <select
              id="promo-sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-white border border-[#EAEAEA] px-3 py-1.5 text-xs text-[#171717] font-medium outline-none cursor-pointer"
            >
              <option value="discount">Maior desconto</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <ProductGrid
          products={promoProducts}
          emptyMessage="No momento não há peças com preço promocional. Fique de olho em nossos lançamentos!"
        />
      </div>
    </div>
  );
};
