import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductGrid } from '../components/ProductGrid';
import { SortOption } from '../types';
import { SlidersHorizontal, ArrowLeft } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const category = CATEGORIES.find((c) => c.slug === slug);

  // Available sizes within this category
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === slug);
  }, [slug]);

  const sizes = useMemo(() => {
    const s = new Set<string>();
    categoryProducts.forEach((p) => p.sizes?.forEach((sz) => s.add(sz)));
    return Array.from(s);
  }, [categoryProducts]);

  const sortedAndFiltered = useMemo(() => {
    return categoryProducts
      .filter((p) => {
        if (selectedSize && !p.sizes?.includes(selectedSize)) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'discount': {
            const dA = a.oldPrice ? a.oldPrice - a.price : 0;
            const dB = b.oldPrice ? b.oldPrice - b.price : 0;
            return dB - dA;
          }
          case 'best-sellers':
            return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'recent':
          default:
            return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        }
      });
  }, [categoryProducts, selectedSize, sortOption]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#171717] mb-2">Categoria não encontrada</h2>
        <p className="text-sm text-[#6F6F6F] mb-6">
          A categoria que você procura não está disponível ou foi atualizada.
        </p>
        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ver todos os produtos</span>
        </Link>
      </div>
    );
  }

  return (
    <div id={`category-page-${category.slug}`} className="min-h-screen bg-white pb-16">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Categorias', path: '/produtos' },
          { label: category.name },
        ]}
      />

      {/* Hero / Header of Category */}
      <div className="relative bg-[#FAF7F5] border-b border-[#EAEAEA] py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1 block">
              Coleção Feminina
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-normal">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xs sm:text-sm text-[#6F6F6F] mt-2 max-w-xl leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
          <span className="text-xs text-[#6F6F6F] font-medium shrink-0">
            {sortedAndFiltered.length}{' '}
            {sortedAndFiltered.length === 1 ? 'modelo disponível' : 'modelos disponíveis'}
          </span>
        </div>
      </div>

      {/* Filter / Sort bar */}
      <div className="sticky top-[58px] sm:top-[98px] z-30 bg-white border-b border-[#EAEAEA] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Quick size filter chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs uppercase tracking-wider text-[#6F6F6F] font-semibold shrink-0 hidden sm:inline">
              Tamanho:
            </span>
            <button
              onClick={() => setSelectedSize('')}
              className={`px-3 py-1 text-xs border transition-colors shrink-0 ${
                !selectedSize
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-[#FAF7F5] text-[#171717] border-[#EAEAEA]'
              }`}
            >
              Todos
            </button>
            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(selectedSize === sz ? '' : sz)}
                className={`px-3 py-1 text-xs border transition-colors shrink-0 ${
                  selectedSize === sz
                    ? 'bg-[#171717] text-white border-[#171717]'
                    : 'bg-[#FAF7F5] text-[#171717] border-[#EAEAEA]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-[#FAF7F5] border border-[#EAEAEA] px-3 py-1.5 text-xs text-[#171717] font-medium outline-none cursor-pointer"
            >
              <option value="recent">Mais recentes</option>
              <option value="best-sellers">Mais vendidos</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="discount">Maior desconto</option>
              <option value="name-asc">A – Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <ProductGrid
          products={sortedAndFiltered}
          emptyMessage={`Não há produtos em ${category.name} com os filtros selecionados.`}
        />
      </div>
    </div>
  );
};
