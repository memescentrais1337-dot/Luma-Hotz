import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, calculateDiscountPercentage } from '../utils/currency';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80';

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.images[0] || FALLBACK_IMAGE);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const favorite = isFavorite(product.id);
  const discountPercent = calculateDiscountPercentage(product.price, product.oldPrice);
  const hasSecondaryImage = product.images.length > 1;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const willBe = toggleFavorite(product.id);
    if (willBe) {
      showToast('Adicionado aos favoritos', `${product.name} foi salvo na sua lista de desejos.`);
    } else {
      showToast('Removido dos favoritos', `${product.name} foi removido dos seus favoritos.`, 'info');
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col h-full bg-white relative transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Box */}
      <Link
        to={`/produto/${product.slug}`}
        className="relative block w-full aspect-[3/4] overflow-hidden bg-[#FAF7F5]"
      >
        {/* Main Photo */}
        <img
          src={isHovered && hasSecondaryImage ? product.images[1] : imgSrc}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges Container */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="px-2 py-0.5 bg-[#171717] text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
              {product.badge}
            </span>
          )}
          {discountPercent && !product.badge?.includes('%') && (
            <span className="px-2 py-0.5 bg-[#C36B4F] text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className={`absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full transition-colors ${
            favorite
              ? 'bg-white text-rose-600 shadow-md'
              : 'bg-white/80 backdrop-blur-xs text-[#171717] hover:bg-white hover:text-rose-600'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${favorite ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button overlay on desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <span className="w-full py-2 bg-white/95 backdrop-blur-xs text-[#171717] text-xs uppercase tracking-widest font-semibold text-center border border-[#EAEAEA] shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#171717] hover:text-white transition-colors">
            <Eye className="w-3.5 h-3.5" />
            Ver Produto
          </span>
        </div>
      </Link>

      {/* Info Content */}
      <div className="pt-2.5 pb-1 flex flex-col flex-1">
        {/* Colors Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block shrink-0"
                style={{ backgroundColor: c.hex || '#EAEAEA' }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[#6F6F6F]">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Title */}
        <Link
          to={`/produto/${product.slug}`}
          className="text-xs sm:text-sm font-medium text-[#171717] hover:text-[#6F6F6F] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price row */}
        <div className="mt-1 flex items-baseline gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-semibold text-[#171717]">
            {formatCurrency(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] sm:text-xs text-[#8E8E8E] line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Mobile View CTA Button */}
        <Link
          to={`/produto/${product.slug}`}
          className="sm:hidden mt-2.5 w-full py-1.5 text-center bg-[#FAF7F5] border border-[#EAEAEA] text-[10px] uppercase tracking-wider font-semibold text-[#171717] active:bg-[#EAEAEA]"
        >
          Ver Produto
        </Link>
      </div>
    </div>
  );
};
