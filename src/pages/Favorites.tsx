import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductGrid } from '../components/ProductGrid';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div id="favorites-page" className="min-h-screen bg-white pb-20">
      <Breadcrumb items={[{ label: 'Favoritos' }]} />

      <div className="border-b border-[#EAEAEA] bg-[#FAF7F5] py-10 sm:py-14 px-4 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1 block">
            Lista de Desejos
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-normal">
            Meus Favoritos
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6F6F] mt-2">
            {favoriteProducts.length}{' '}
            {favoriteProducts.length === 1 ? 'peça selecionada' : 'peças selecionadas'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#EAEAEA] max-w-lg mx-auto p-8">
            <div className="w-14 h-14 rounded-full bg-[#FAF7F5] flex items-center justify-center mx-auto mb-4 text-[#8E8E8E]">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-[#171717] mb-2">
              Sua lista de desejos está vazia
            </h2>
            <p className="text-xs text-[#6F6F6F] leading-relaxed mb-6">
              Você ainda não favoritou nenhuma peça. Clique no ícone de coração em qualquer produto para salvar suas escolhas preferidas.
            </p>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
            >
              <span>Explorar Coleção</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <ProductGrid products={favoriteProducts} />
        )}
      </div>
    </div>
  );
};
