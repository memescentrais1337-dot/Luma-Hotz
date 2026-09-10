import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Percent } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryCard } from '../components/CategoryCard';

export const Home: React.FC = () => {
  const newArrivals = PRODUCTS.filter((p) => p.newArrival || p.badge?.includes('NOVIDADE')).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller || p.featured).slice(0, 8);
  const featuredCategories = CATEGORIES.filter((c) => c.featured).slice(0, 4);

  return (
    <div id="home-page" className="flex flex-col min-h-screen">
      {/* 1. HERO BANNER */}
      <Hero />

      {/* 2. BENEFÍCIOS */}
      <Benefits />

      {/* 3. LANÇAMENTOS */}
      <section id="new-arrivals-section" className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-3 border-b border-[#EAEAEA] gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C36B4F]" />
              <span>Coleção Atual</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171717] font-normal">
              Confira Nossos Lançamentos
            </h2>
          </div>
          <Link
            to="/produtos?filtro=novidades"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F] transition-colors"
          >
            <span>Ver Todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} />
      </section>

      {/* 4. CATEGORIAS EM DESTAQUE */}
      <section id="featured-categories-section" className="py-12 bg-[#FAF7F5] border-y border-[#EAEAEA] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1">
              Curadoria Exclusiva
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171717] font-normal">
              Categorias em Destaque
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. MAIS VENDIDOS */}
      <section id="best-sellers-section" className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-3 border-b border-[#EAEAEA] gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1">
              <Flame className="w-3.5 h-3.5 text-[#C36B4F]" />
              <span>Favoritos das Clientes</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171717] font-normal">
              Os Mais Desejados
            </h2>
          </div>
          <Link
            to="/produtos?ordem=best-sellers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F] transition-colors"
          >
            <span>Ver Seleção Completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={bestSellers} />
      </section>

      {/* 6. BANNER PROMOCIONAL */}
      <section id="promo-banner-section" className="px-4 sm:px-8 max-w-7xl mx-auto w-full mb-12 sm:mb-16">
        <div className="relative overflow-hidden bg-[#FAF7F5] border border-[#EAEAEA] aspect-[16/9] sm:aspect-[21/9] min-h-[300px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80"
            alt="Sale promocional boutique"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />

          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-lg text-white">
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#C36B4F] text-white text-[10px] uppercase tracking-widest font-semibold mb-3">
              <Percent className="w-3 h-3" />
              <span>Oportunidade</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-white mb-2">
              SALE ESPECIAL
            </h2>
            <p className="font-serif text-lg sm:text-2xl italic text-[#F3E5DF] mb-3">
              Até 40% OFF
            </p>
            <p className="text-xs sm:text-sm text-neutral-200 mb-6 font-light leading-relaxed">
              Peças selecionadas com descontos especiais por tempo limitado. Aproveite enquanto durarem os estoques.
            </p>
            <Link
              to="/promocoes"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-[#171717] text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF7F5] transition-colors"
            >
              Ver Promoções
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TODOS / SELEÇÃO ESPECIAL */}
      <section id="special-selection-section" className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="p-8 sm:p-12 border border-[#EAEAEA] bg-[#FAF7F5]/60 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-2 block">
            Catálogo Completo
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] mb-3">
            Encontre a peça perfeita para o seu estilo
          </h3>
          <p className="text-xs sm:text-sm text-[#6F6F6F] max-w-md mx-auto mb-6 leading-relaxed">
            Navegue por nossa coleção completa com filtros por tamanho, cor e categoria. Escolha seus favoritos e faça seu pedido direto pelo WhatsApp.
          </p>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
          >
            <span>Explorar Todos os Produtos ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
