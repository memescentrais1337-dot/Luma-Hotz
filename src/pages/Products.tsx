import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { STORE_SETTINGS } from '../data/settings';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductGrid } from '../components/ProductGrid';
import { SortOption } from '../types';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Query states
  const searchParamQuery = searchParams.get('busca') || '';
  const filterParam = searchParams.get('filtro') || '';
  const initialSort = (searchParams.get('ordem') as SortOption) || 'recent';

  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('categoria') || ''
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [onlyPromotions, setOnlyPromotions] = useState<boolean>(
    filterParam === 'promocoes' || searchParams.get('promo') === 'true'
  );
  const [maxPrice, setMaxPrice] = useState<number>(400);

  // Sync with searchParams if changed externally
  useEffect(() => {
    if (searchParams.get('categoria')) {
      setSelectedCategory(searchParams.get('categoria') || '');
    }
    if (searchParams.get('filtro') === 'promocoes') {
      setOnlyPromotions(true);
    }
  }, [searchParams]);

  // Collect unique sizes and colors across all products
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.sizes?.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  const availableColors = useMemo(() => {
    const map = new Map<string, string | undefined>();
    PRODUCTS.forEach((p) => {
      p.colors?.forEach((c) => {
        if (!map.has(c.name)) {
          map.set(c.name, c.hex);
        }
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedSizes([]);
    setSelectedColors([]);
    setOnlyPromotions(false);
    setMaxPrice(400);
    setSearchParams({});
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (onlyPromotions ? 1 : 0) +
    (maxPrice < 400 ? 1 : 0);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search query
      if (searchParamQuery) {
        const q = searchParamQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchTag = product.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchCat && !matchDesc && !matchTag) return false;
      }

      // "Novidades" quick filter
      if (filterParam === 'novidades' && !product.newArrival && !product.badge?.includes('NOVIDADE')) {
        return false;
      }

      // Category
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Promotions
      if (onlyPromotions && !product.oldPrice && !product.badge?.includes('%')) {
        return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasAnySelectedSize = selectedSizes.some((s) => product.sizes?.includes(s));
        if (!hasAnySelectedSize) return false;
      }

      // Colors
      if (selectedColors.length > 0) {
        const hasAnySelectedColor = selectedColors.some((c) =>
          product.colors?.some((pc) => pc.name === c)
        );
        if (!hasAnySelectedColor) return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'discount': {
          const discountA = a.oldPrice ? a.oldPrice - a.price : 0;
          const discountB = b.oldPrice ? b.oldPrice - b.price : 0;
          return discountB - discountA;
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
  }, [
    searchParamQuery,
    filterParam,
    selectedCategory,
    onlyPromotions,
    selectedSizes,
    selectedColors,
    maxPrice,
    sortOption,
  ]);

  return (
    <div id="products-catalog-page" className="min-h-screen bg-white pb-16">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Todos os Produtos' },
          ...(searchParamQuery ? [{ label: `Busca: "${searchParamQuery}"` }] : []),
        ]}
      />

      {/* Header Banner */}
      <div className="border-b border-[#EAEAEA] bg-[#FAF7F5] py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1 block">
            Catálogo {STORE_SETTINGS.brandName}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-normal">
            {searchParamQuery
              ? `Resultados para "${searchParamQuery}"`
              : filterParam === 'novidades'
              ? 'Novidades da Temporada'
              : 'Todos os Produtos'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6F6F] mt-2">
            Mostrando {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'peça exclusiva' : 'peças exclusivas'}
          </p>
        </div>
      </div>

      {/* Controls Bar: Filters trigger & Sorting */}
      <div className="sticky top-[58px] sm:top-[98px] z-30 bg-white border-b border-[#EAEAEA] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Mobile filter button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            id="mobile-filter-btn"
            className="flex items-center gap-2 px-3.5 py-2 border border-[#EAEAEA] text-xs uppercase tracking-wider font-semibold text-[#171717] bg-[#FAF7F5] hover:bg-[#EAEAEA] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 bg-[#171717] text-white text-[10px] rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Active filter tags */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto flex-1">
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] uppercase tracking-wider text-[#C36B4F] font-semibold hover:underline mr-2"
              >
                Limpar todos ({activeFiltersCount})
              </button>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F5] border border-[#EAEAEA] text-xs text-[#171717]">
                Categoria: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
              </span>
            )}
            {onlyPromotions && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F5] border border-[#EAEAEA] text-xs text-[#171717]">
                Promoções
                <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyPromotions(false)} />
              </span>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <label
              htmlFor="sort-select"
              className="text-xs uppercase tracking-wider text-[#6F6F6F] hidden sm:inline"
            >
              Ordenar por:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-[#FAF7F5] border border-[#EAEAEA] px-3 py-2 text-xs text-[#171717] font-medium outline-none focus:border-[#171717] cursor-pointer"
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

      {/* Main Layout: Sidebar filters (Desktop) + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6 sticky top-[160px] self-start">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#171717]">
                Filtros
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#C36B4F] hover:underline"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Categorias */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                Categorias
              </h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left py-1 transition-colors ${
                      !selectedCategory ? 'font-bold text-[#171717]' : 'text-[#6F6F6F] hover:text-[#171717]'
                    }`}
                  >
                    Todas as categorias
                  </button>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() =>
                        setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)
                      }
                      className={`w-full text-left py-1 transition-colors ${
                        selectedCategory === cat.slug
                          ? 'font-bold text-[#171717]'
                          : 'text-[#6F6F6F] hover:text-[#171717]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tamanhos */}
            <div className="space-y-2 pt-4 border-t border-[#EAEAEA]">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                Tamanho
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-2.5 py-1 text-xs border transition-colors ${
                        isSelected
                          ? 'bg-[#171717] text-white border-[#171717]'
                          : 'bg-[#FAF7F5] text-[#171717] border-[#EAEAEA] hover:border-[#171717]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cores */}
            <div className="space-y-2 pt-4 border-t border-[#EAEAEA]">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                Cores
              </h4>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      title={color.name}
                      className={`w-6 h-6 rounded-full border relative flex items-center justify-center transition-all ${
                        isSelected ? 'ring-2 ring-[#171717] ring-offset-2' : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: color.hex || '#EAEAEA' }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3 h-3 ${
                            color.hex && ['#FFFFFF', '#FAF7F2', '#FAF7F5', '#E6D7CD'].includes(color.hex)
                              ? 'text-[#171717]'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Promoções checkbox */}
            <div className="pt-4 border-t border-[#EAEAEA]">
              <label className="flex items-center gap-2.5 text-xs text-[#171717] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyPromotions}
                  onChange={(e) => setOnlyPromotions(e.target.checked)}
                  className="rounded-none border-[#EAEAEA] accent-[#171717] w-4 h-4"
                />
                <span className="font-medium">Apenas produtos em promoção</span>
              </label>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1 min-w-0">
            <ProductGrid
              products={filteredProducts}
              emptyMessage="Tente alterar os filtros de tamanho, cor ou categoria para encontrar produtos disponíveis."
            />
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div id="mobile-filter-modal" className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          <div className="relative z-10 w-full sm:w-[380px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between p-4 border-b border-[#EAEAEA]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#171717]" />
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-[#171717]">
                    Filtrar Produtos
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#6F6F6F] hover:text-[#171717]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Categorias */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                    Categoria
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`py-2 px-3 text-xs text-left border ${
                        !selectedCategory
                          ? 'bg-[#171717] text-white border-[#171717]'
                          : 'bg-[#FAF7F5] border-[#EAEAEA] text-[#171717]'
                      }`}
                    >
                      Todas
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)
                        }
                        className={`py-2 px-3 text-xs text-left border truncate ${
                          selectedCategory === cat.slug
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-[#FAF7F5] border-[#EAEAEA] text-[#171717]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tamanhos */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                    Tamanho
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-1.5 text-xs border ${
                            isSelected
                              ? 'bg-[#171717] text-white border-[#171717]'
                              : 'bg-[#FAF7F5] border-[#EAEAEA] text-[#171717]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Cores */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                    Cores
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map((color) => {
                      const isSelected = selectedColors.includes(color.name);
                      return (
                        <button
                          key={color.name}
                          onClick={() => toggleColor(color.name)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center ${
                            isSelected ? 'ring-2 ring-[#171717] ring-offset-2' : 'border-neutral-300'
                          }`}
                          style={{ backgroundColor: color.hex || '#EAEAEA' }}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Promoções */}
                <div>
                  <label className="flex items-center gap-2.5 text-xs text-[#171717] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyPromotions}
                      onChange={(e) => setOnlyPromotions(e.target.checked)}
                      className="rounded-none accent-[#171717] w-4 h-4"
                    />
                    <span className="font-semibold">Apenas produtos em promoção</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-[#EAEAEA] bg-[#FAF7F5] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold"
              >
                Aplicar Filtros ({filteredProducts.length} itens)
              </button>
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 text-center text-xs uppercase tracking-wider text-[#6F6F6F]"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
