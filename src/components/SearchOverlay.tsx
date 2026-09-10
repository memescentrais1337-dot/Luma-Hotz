import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/currency';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];

    return PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(clean);
      const matchCategory = product.category.toLowerCase().includes(clean);
      const matchDesc = product.description.toLowerCase().includes(clean);
      const matchCollection = product.collection?.toLowerCase().includes(clean);
      const matchTags = product.tags?.some((t) => t.toLowerCase().includes(clean));

      return matchName || matchCategory || matchDesc || matchCollection || matchTags;
    });
  }, [query]);

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/produto/${slug}`);
  };

  const handleViewAllResults = () => {
    if (!query.trim()) return;
    onClose();
    navigate(`/produtos?busca=${encodeURIComponent(query.trim())}`);
  };

  if (!isOpen) return null;

  return (
    <div
      id="search-overlay"
      className="fixed inset-0 z-50 flex flex-col bg-white/98 backdrop-blur-md transition-opacity duration-200"
    >
      {/* Top Bar with Input */}
      <div className="border-b border-[#EAEAEA] px-4 sm:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Search className="w-5 h-5 text-[#171717] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleViewAllResults();
            }}
            placeholder="Busque por produtos, categorias, tecidos..."
            className="w-full text-base sm:text-xl text-[#171717] placeholder:text-[#9A9A9A] bg-transparent border-none outline-none font-normal"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              id="clear-search-btn"
              className="text-xs uppercase tracking-wider text-[#6F6F6F] hover:text-[#171717] px-2 py-1"
            >
              Limpar busca
            </button>
          )}
          <button
            onClick={onClose}
            id="close-search-btn"
            aria-label="Fechar busca"
            className="p-2 text-[#171717] hover:text-[#6F6F6F] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 max-w-4xl mx-auto w-full">
        {!query.trim() ? (
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-4 font-semibold">
              Buscas Populares
            </p>
            <div className="flex flex-wrap gap-2">
              {['Vestido', 'Linho', 'Conjunto', 'Alfaiataria', 'Calça', 'Sale', 'Bolsa', 'Midi'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-[#FAF7F5] hover:bg-[#F3E5DF] text-[#171717] text-xs transition-colors rounded-none border border-[#EAEAEA]"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-12 text-center" id="search-no-results">
            <p className="text-lg font-serif text-[#171717] mb-2">Nenhum produto encontrado</p>
            <p className="text-sm text-[#6F6F6F] mb-6">
              Não encontramos resultados para "{query}". Tente buscar por outros termos como vestidos, conjuntos ou linho.
            </p>
            <button
              onClick={() => setQuery('')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAEAEA]">
              <p className="text-xs uppercase tracking-widest text-[#6F6F6F]">
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
              <button
                onClick={handleViewAllResults}
                className="text-xs uppercase tracking-wider font-semibold text-[#171717] hover:underline flex items-center gap-1"
              >
                Ver todos os resultados <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center gap-3 p-2.5 hover:bg-[#FAF7F5] cursor-pointer transition-colors border border-transparent hover:border-[#EAEAEA]"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-20 object-cover bg-[#FAF7F5] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-[#6F6F6F] mb-0.5">
                      {product.category}
                    </p>
                    <p className="text-sm font-medium text-[#171717] truncate">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-[#171717]">
                        {formatCurrency(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-[#6F6F6F] line-through">
                          {formatCurrency(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
