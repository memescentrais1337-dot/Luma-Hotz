import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Heart, MessageCircle } from 'lucide-react';
import { STORE_SETTINGS } from '../data/settings';
import { NAV_LINKS } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const { totalItems, setIsCartOpen } = useCart();
  const { totalFavorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDesktopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate(`/produtos?busca=${encodeURIComponent(searchInput.trim())}`);
    setSearchInput('');
  };

  return (
    <>
      <header id="site-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA]">
        {/* Desktop Header Container */}
        <div className="hidden lg:block max-w-7xl mx-auto px-8">
          {/* Main Row: Logo, Search, Actions */}
          <div className="flex items-center justify-between py-4 border-b border-[#FAF7F5]">
            {/* Left: Boutique Logo */}
            <Link to="/" id="desktop-logo" className="flex flex-col select-none group">
              <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-[0.18em] text-[#171717] group-hover:opacity-80 transition-opacity uppercase">
                {STORE_SETTINGS.brandName}
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#6F6F6F] uppercase">
                {STORE_SETTINGS.subName}
              </span>
            </Link>

            {/* Center: Search Bar */}
            <form
              onSubmit={handleDesktopSearchSubmit}
              className="relative w-full max-w-md mx-8"
              role="search"
            >
              <input
                type="text"
                placeholder="Busque por produtos, tecidos, cores..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-xs bg-[#FAF7F5] border border-[#EAEAEA] text-[#171717] placeholder:text-[#8E8E8E] focus:outline-none focus:border-[#171717] transition-colors"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F6F] hover:text-[#171717]"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Right: WhatsApp, Favorites, Bag */}
            <div className="flex items-center gap-6">
              {/* WhatsApp Link */}
              <a
                href={createGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fale conosco no WhatsApp"
                className="flex items-center gap-1.5 text-xs text-[#171717] hover:text-emerald-700 transition-colors tracking-wider uppercase font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>

              {/* Favorites */}
              <Link
                to="/favoritos"
                aria-label="Meus Favoritos"
                className="relative flex items-center gap-1.5 text-xs text-[#171717] hover:text-[#6F6F6F] transition-colors tracking-wider uppercase font-medium"
              >
                <Heart className="w-4 h-4" />
                {totalFavorites > 0 && (
                  <span className="text-[11px] font-semibold text-[#171717]">
                    [{totalFavorites}]
                  </span>
                )}
              </Link>

              {/* Cart Bag */}
              <button
                onClick={() => setIsCartOpen(true)}
                id="desktop-cart-button"
                aria-label="Abrir Sacola de compras"
                className="flex items-center gap-2 px-3 py-2 bg-[#171717] text-white hover:bg-neutral-800 transition-colors text-xs font-semibold uppercase tracking-widest"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sacola [{totalItems}]</span>
              </button>
            </div>
          </div>

          {/* Navigation Categories Row */}
          <nav className="py-2.5 flex items-center justify-center gap-8 overflow-x-auto text-[11px] uppercase tracking-[0.18em] font-medium">
            {NAV_LINKS.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path.includes('?') &&
                  location.search &&
                  `${location.pathname}${location.search}` === item.path);
              const isPromo = item.name.toLowerCase().includes('promo');

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#171717] font-bold border-b-2 border-[#171717]'
                      : isPromo
                      ? 'text-[#C36B4F] font-semibold hover:text-[#BA5A3A]'
                      : 'text-[#6F6F6F] hover:text-[#171717]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Header: [MENU] [LOGO] [BUSCA] [SACOLA] */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
          {/* Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            id="mobile-menu-trigger"
            aria-label="Abrir Menu"
            className="p-1.5 -ml-1.5 text-[#171717] hover:text-[#6F6F6F]"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo Center */}
          <Link to="/" id="mobile-logo" className="text-center select-none">
            <span className="font-serif text-lg sm:text-xl font-semibold tracking-[0.15em] text-[#171717] uppercase">
              {STORE_SETTINGS.brandName}
            </span>
            <span className="block text-[8px] tracking-[0.25em] text-[#6F6F6F] uppercase -mt-0.5">
              {STORE_SETTINGS.subName}
            </span>
          </Link>

          {/* Right Icons: Search & Bag */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              id="mobile-search-trigger"
              aria-label="Abrir Busca"
              className="p-1.5 text-[#171717] hover:text-[#6F6F6F]"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              id="mobile-cart-trigger"
              aria-label="Abrir Sacola de compras"
              className="relative p-1.5 text-[#171717] hover:text-[#6F6F6F]"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#171717] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Overlays */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
