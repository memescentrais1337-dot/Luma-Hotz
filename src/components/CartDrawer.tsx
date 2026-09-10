import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { createCartWhatsAppUrl } from '../utils/whatsapp';
import { STORE_SETTINGS } from '../data/settings';

export const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, isCartOpen, setIsCartOpen, totalItems, totalAmount } =
    useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    const url = createCartWhatsAppUrl(items, totalAmount);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
  };

  return (
    <div id="cart-drawer-portal" className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        id="cart-backdrop"
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
      />

      {/* Drawer */}
      <div
        id="cart-drawer"
        className="relative z-10 w-full sm:w-[440px] max-w-full bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#171717]" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#171717]">
              Sua Sacola
            </h2>
            <span className="text-xs text-[#6F6F6F] font-medium">({totalItems})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            id="close-cart-btn"
            aria-label="Fechar sacola"
            className="p-1.5 text-[#171717] hover:text-[#6F6F6F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12" id="cart-empty-state">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F5] flex items-center justify-center mb-4 text-[#8E8E8E]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl text-[#171717] mb-1">Sua sacola está vazia</h3>
              <p className="text-xs text-[#6F6F6F] max-w-xs mb-6">
                Explore nossa coleção e escolha peças pensadas para elevar o seu dia a dia.
              </p>
              <button
                onClick={handleContinueShopping}
                id="continue-shopping-btn"
                className="px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#EAEAEA] space-y-4" id="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 sm:w-22 sm:h-28 object-cover bg-[#FAF7F5] shrink-0 border border-[#EAEAEA]"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <p
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate(`/produto/${item.product.slug}`);
                          }}
                          className="text-sm font-medium text-[#171717] hover:underline cursor-pointer truncate"
                        >
                          {item.product.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remover ${item.product.name}`}
                          className="text-[#8E8E8E] hover:text-[#171717] p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-1 space-y-0.5 text-xs text-[#6F6F6F]">
                        {item.selectedColor && (
                          <p>
                            Cor: <span className="text-[#171717]">{item.selectedColor}</span>
                          </p>
                        )}
                        {item.selectedSize && (
                          <p>
                            Tamanho: <span className="text-[#171717]">{item.selectedSize}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#FAF7F5]">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#EAEAEA] bg-[#FAF7F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Diminuir quantidade"
                          className="p-1.5 text-[#171717] hover:bg-[#EAEAEA] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#171717]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Aumentar quantidade"
                          className="p-1.5 text-[#171717] hover:bg-[#EAEAEA] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <p className="text-sm font-semibold text-[#171717]">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-[#EAEAEA] bg-[#FAF7F5] p-5 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#6F6F6F]">
                <span>Total de itens</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#171717] pt-1 border-t border-[#EAEAEA]">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#6F6F6F] leading-relaxed italic bg-white/70 p-2.5 border border-[#EAEAEA]">
              {STORE_SETTINGS.shippingNotice}
            </p>

            <div className="space-y-2">
              <button
                onClick={handleCheckoutWhatsApp}
                id="checkout-whatsapp-btn"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Finalizar Pedido pelo WhatsApp</span>
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full py-2.5 text-center text-xs uppercase tracking-wider text-[#6F6F6F] hover:text-[#171717] font-medium"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
