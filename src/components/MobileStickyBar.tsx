import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';

interface MobileStickyBarProps {
  product: Product;
  onAddToCart: () => void;
  onBuyWhatsApp: () => void;
  selectedSize?: string;
  selectedColor?: string;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  product,
  onAddToCart,
  onBuyWhatsApp,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar only when user scrolled down more than 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="mobile-sticky-product-bar"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAEAEA] p-3 shadow-lg flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300"
    >
      <div className="min-w-0">
        <p className="text-[10px] text-[#6F6F6F] truncate">{product.name}</p>
        <p className="text-sm font-semibold text-[#171717]">
          {formatCurrency(product.price)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onAddToCart}
          className="px-3.5 py-2.5 bg-[#171717] text-white text-[11px] uppercase tracking-wider font-semibold active:bg-neutral-800 flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Sacola</span>
        </button>

        <button
          onClick={onBuyWhatsApp}
          className="p-2.5 bg-emerald-600 text-white rounded-none active:bg-emerald-700"
          aria-label="Comprar pelo WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
