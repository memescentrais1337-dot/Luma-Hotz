import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Instagram, MessageCircle, Heart, Info, HelpCircle } from 'lucide-react';
import { NAV_LINKS } from '../data/categories';
import { STORE_SETTINGS } from '../data/settings';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { useFavorites } from '../context/FavoritesContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { totalFavorites } = useFavorites();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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

  if (!isOpen) return null;

  return (
    <div id="mobile-menu-portal" className="fixed inset-0 z-50 flex">
      {/* Dimmed backdrop */}
      <div
        id="mobile-menu-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
      />

      {/* Slide-out Drawer */}
      <div
        id="mobile-menu-drawer"
        className="relative z-10 w-[82vw] max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAEAEA]">
            <div>
              <span className="font-serif text-lg tracking-[0.18em] font-semibold text-[#171717] uppercase">
                {STORE_SETTINGS.brandName}
              </span>
              <span className="block text-[9px] tracking-[0.25em] text-[#6F6F6F] uppercase">
                {STORE_SETTINGS.subName}
              </span>
            </div>
            <button
              onClick={onClose}
              id="close-mobile-menu"
              aria-label="Fechar menu"
              className="p-1.5 text-[#171717] hover:text-[#6F6F6F]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Categories */}
          <nav className="px-5 py-4 divide-y divide-[#FAF7F5]">
            <p className="text-[10px] uppercase tracking-widest text-[#8E8E8E] font-medium mb-3">
              Categorias
            </p>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isPromo = link.name.toLowerCase().includes('promo');
                const isNew = link.name.toLowerCase().includes('novi');
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className={`flex items-center justify-between py-2.5 text-sm uppercase tracking-wider font-medium transition-colors ${
                        isPromo
                          ? 'text-[#C36B4F] font-semibold'
                          : isNew
                          ? 'text-[#171717] font-semibold'
                          : 'text-[#171717] hover:text-[#6F6F6F]'
                      }`}
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Institutional & Contact Links */}
        <div className="border-t border-[#EAEAEA] bg-[#FAF7F5] p-5 space-y-4">
          <div className="space-y-2">
            <Link
              to="/favoritos"
              onClick={onClose}
              className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F]"
            >
              <Heart className="w-4 h-4 text-[#171717]" />
              <span>Meus Favoritos {totalFavorites > 0 && `(${totalFavorites})`}</span>
            </Link>

            <Link
              to="/sobre"
              onClick={onClose}
              className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-[#6F6F6F] hover:text-[#171717]"
            >
              <Info className="w-4 h-4" />
              <span>Sobre a {STORE_SETTINGS.brandName}</span>
            </Link>

            <Link
              to="/contato"
              onClick={onClose}
              className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-[#6F6F6F] hover:text-[#171717]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Trocas e Dúvidas</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-[#EAEAEA] flex items-center justify-between">
            <a
              href={STORE_SETTINGS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-[#171717] hover:text-[#6F6F6F]"
            >
              <Instagram className="w-4 h-4" />
              <span>{STORE_SETTINGS.instagram}</span>
            </a>

            <a
              href={createGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-[#171717] hover:text-emerald-700"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
