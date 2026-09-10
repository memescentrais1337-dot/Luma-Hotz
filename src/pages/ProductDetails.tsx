import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  Ruler,
  ChevronDown,
  Check,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { STORE_SETTINGS } from '../data/settings';
import { Product } from '../types';
import { formatCurrency, calculateDiscountPercentage } from '../utils/currency';
import { createProductWhatsAppUrl } from '../utils/whatsapp';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductGrid } from '../components/ProductGrid';
import { SizeGuide } from '../components/SizeGuide';
import { MobileStickyBar } from '../components/MobileStickyBar';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.slug === slug);
  }, [slug]);

  const { addItem, setIsCartOpen } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();

  // Active selections
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  // Swipe support for mobile gallery
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // When product changes, reset selections and record viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImageIndex(0);
      setQuantity(1);
      // Default to first color if available
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      } else {
        setSelectedColor('');
      }
      setSelectedSize('');

      // Update document title for basic SEO
      document.title = `${product.name} | ${STORE_SETTINGS.name}`;
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#171717] mb-2">Produto não encontrado</h2>
        <p className="text-sm text-[#6F6F6F] mb-6">
          O produto que você procura não está mais disponível ou o link está incorreto.
        </p>
        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold"
        >
          Voltar para o catálogo
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const discountPercent = calculateDiscountPercentage(product.price, product.oldPrice);

  const images = product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
  ];

  // Gallery navigation
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      nextImage();
    } else if (distance < -40) {
      prevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Add to cart validation and execution
  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      showToast('Selecione um tamanho', 'Escolha o tamanho desejado antes de adicionar à sacola.', 'warning');
      return;
    }

    addItem(product, selectedSize, selectedColor, quantity);
    showToast('Produto adicionado!', `${product.name} foi adicionado à sua sacola de compras.`);
    setIsCartOpen(true);
  };

  // Direct WhatsApp purchase
  const handleBuyWhatsApp = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      showToast('Selecione um tamanho', 'Por favor, selecione o tamanho antes de continuar.', 'warning');
      return;
    }

    const url = createProductWhatsAppUrl(product, {
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | ${STORE_SETTINGS.name}`,
      text: product.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Ignored if cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copiado!', 'O link deste produto foi copiado para a área de transferência.');
      } catch {
        showToast('Não foi possível copiar', 'Tente copiar o link da barra de endereço.', 'info');
      }
    }
  };

  // Related products (same category, excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Filter recently viewed (excluding current product)
  const filteredRecentlyViewed = recentlyViewed.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div id={`product-page-${product.slug}`} className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: product.category, path: `/categoria/${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Photo Gallery (Desktop: 7 cols, Mobile: full width) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            {/* Desktop Thumbnails column */}
            <div className="hidden sm:flex flex-col gap-2.5 w-20 shrink-0">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-[3/4] w-full overflow-hidden border transition-all ${
                    index === activeImageIndex
                      ? 'border-[#171717] opacity-100 ring-1 ring-[#171717]'
                      : 'border-[#EAEAEA] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} miniatura ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Main Active Image Frame */}
            <div
              className="relative flex-1 aspect-[3/4] overflow-hidden bg-[#FAF7F5] border border-[#EAEAEA] select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[activeImageIndex]}
                alt={`${product.name} visualização ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-top transition-opacity duration-300"
              />

              {/* Badges on main photo */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="px-2.5 py-1 bg-[#171717] text-white text-[11px] font-semibold tracking-wider uppercase">
                    {product.badge}
                  </span>
                )}
                {discountPercent && (
                  <span className="px-2.5 py-1 bg-[#C36B4F] text-white text-[11px] font-semibold tracking-wider uppercase">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Image Arrows (Desktop & Tablet) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Imagem anterior"
                    className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-[#171717] items-center justify-center shadow-md backdrop-blur-xs transition-transform hover:scale-105"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Próxima imagem"
                    className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-[#171717] items-center justify-center shadow-md backdrop-blur-xs transition-transform hover:scale-105"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Mobile Swipe Indicators & Counter */}
              <div className="sm:hidden absolute bottom-3 inset-x-0 flex items-center justify-between px-4 z-10">
                {/* Dots */}
                <div className="flex gap-1.5">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeImageIndex ? 'w-5 bg-[#171717]' : 'w-1.5 bg-black/30'
                      }`}
                    />
                  ))}
                </div>
                {/* Counter */}
                <span className="px-2 py-0.5 bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium tracking-wider">
                  {activeImageIndex + 1} / {images.length}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6F6F6F] font-semibold">
                  {product.collection || product.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    aria-label="Compartilhar produto"
                    className="p-1.5 text-[#6F6F6F] hover:text-[#171717] transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const willBe = toggleFavorite(product.id);
                      if (willBe) {
                        showToast('Adicionado aos favoritos', `${product.name} salvo.`);
                      } else {
                        showToast('Removido dos favoritos', `${product.name} removido.`, 'info');
                      }
                    }}
                    aria-label="Favoritar"
                    className={`p-1.5 transition-colors ${
                      favorite ? 'text-rose-600' : 'text-[#6F6F6F] hover:text-[#171717]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl text-[#171717] font-medium mt-1 leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-semibold text-[#171717]">
                  {formatCurrency(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-[#8E8E8E] line-through font-normal">
                    {formatCurrency(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6F6F6F] mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* SELETOR DE COR */}
            {product.colors && product.colors.length > 0 && (
              <div className="pt-2 border-t border-[#EAEAEA]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Cor:{' '}
                    <span className="font-normal text-[#6F6F6F]">
                      {selectedColor || 'Selecione uma cor'}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                        className={`group flex items-center gap-2 p-1 border transition-all ${
                          isSelected
                            ? 'border-[#171717] bg-[#FAF7F5]'
                            : 'border-transparent hover:border-[#EAEAEA]'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-neutral-300 inline-block shrink-0 shadow-xs"
                          style={{ backgroundColor: color.hex || '#EAEAEA' }}
                        />
                        <span className="text-xs text-[#171717] pr-1 hidden sm:inline">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SELETOR DE TAMANHOS */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-2 border-t border-[#EAEAEA]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Tamanho:{' '}
                    <span className="font-normal text-[#6F6F6F]">
                      {selectedSize || 'Selecione'}
                    </span>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-xs text-[#171717] hover:underline uppercase tracking-wider"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#6F6F6F]" />
                    <span>Guia de Tamanhos</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => {
                    const isUnavailable = product.unavailableSizes?.includes(sz);
                    const isSelected = selectedSize === sz;

                    if (isUnavailable) {
                      return (
                        <div
                          key={sz}
                          title="Tamanho indisponível"
                          className="px-4 py-2.5 text-xs font-medium border border-dashed border-[#DCDCDC] text-[#B0B0B0] bg-[#FAF7F5] relative cursor-not-allowed line-through select-none"
                        >
                          {sz}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[48px] px-4 py-2.5 text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#171717] border-[#EAEAEA] hover:border-[#171717]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SELETOR DE QUANTIDADE */}
            <div className="pt-2 border-t border-[#EAEAEA] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                Quantidade
              </span>
              <div className="flex items-center border border-[#EAEAEA] bg-[#FAF7F5]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="p-2 text-[#171717] hover:bg-[#EAEAEA] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold text-[#171717]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar quantidade"
                  className="p-2 text-[#171717] hover:bg-[#EAEAEA] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2.5 pt-2">
              {/* Main Button: Adicionar à sacola */}
              <button
                onClick={handleAddToCart}
                id="add-to-cart-main-btn"
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#171717] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 active:scale-[0.99] transition-all shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar à Sacola</span>
              </button>

              {/* Secondary Button: WhatsApp Direct */}
              <button
                onClick={handleBuyWhatsApp}
                id="buy-whatsapp-direct-btn"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FAF7F5] border border-emerald-600 text-emerald-800 text-xs uppercase tracking-wider font-semibold hover:bg-emerald-50 active:scale-[0.99] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Comprar Agora pelo WhatsApp</span>
              </button>
            </div>

            {/* Benefits micro badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#6F6F6F] border-t border-[#EAEAEA]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#171717]" />
                <span>Envio rápido e seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#171717]" />
                <span>Atendimento humanizado</span>
              </div>
            </div>

            {/* ACCORDION BLOCKS */}
            <div className="border-t border-[#EAEAEA] divide-y divide-[#EAEAEA]">
              {/* Descrição */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                  className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F]"
                >
                  <span>Descrição</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'desc' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'desc' && (
                  <div className="pb-4 text-xs text-[#6F6F6F] leading-relaxed">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              {/* Detalhes */}
              {product.details && (
                <div>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'details' ? null : 'details')
                    }
                    className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F]"
                  >
                    <span>Detalhes da Peça</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordion === 'details' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'details' && (
                    <div className="pb-4 text-xs text-[#6F6F6F] leading-relaxed">
                      <p>{product.details}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Composição */}
              {product.composition && (
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'comp' ? null : 'comp')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F]"
                  >
                    <span>Composição</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordion === 'comp' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'comp' && (
                    <div className="pb-4 text-xs text-[#6F6F6F] leading-relaxed">
                      <p>{product.composition}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Cuidados */}
              {product.care && (
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F]"
                  >
                    <span>Cuidados com a Peça</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordion === 'care' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'care' && (
                    <div className="pb-4 text-xs text-[#6F6F6F] leading-relaxed">
                      <p>{product.care}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Trocas e Dúvidas */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'exchange' ? null : 'exchange')
                  }
                  className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F]"
                >
                  <span>Trocas e Dúvidas</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'exchange' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'exchange' && (
                  <div className="pb-4 text-xs text-[#6F6F6F] leading-relaxed space-y-2">
                    <p>
                      Sua satisfação é essencial para nós. Você tem até 7 dias corridos após o recebimento para solicitar a troca ou devolução sem complicações.
                    </p>
                    <p>
                      Para iniciar o processo, basta entrar em contato direto pelo WhatsApp com o número do seu pedido.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS: VOCÊ TAMBÉM PODE GOSTAR */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-12 border-t border-[#EAEAEA]">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1 block">
                Sugestões da Curadoria
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal">
                Você Também Pode Gostar
              </h3>
            </div>
            <ProductGrid products={relatedProducts} />
          </section>
        )}

        {/* RECENTLY VIEWED: VISTOS RECENTEMENTE */}
        {filteredRecentlyViewed.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-12 border-t border-[#EAEAEA]">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1 block">
                Histórico
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal">
                Vistos Recentemente
              </h3>
            </div>
            <ProductGrid products={filteredRecentlyViewed} />
          </section>
        )}
      </main>

      {/* Guia de Tamanhos Modal */}
      <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* Mobile Sticky Bottom Bar on scroll */}
      <MobileStickyBar
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onAddToCart={handleAddToCart}
        onBuyWhatsApp={handleBuyWhatsApp}
      />
    </div>
  );
};
