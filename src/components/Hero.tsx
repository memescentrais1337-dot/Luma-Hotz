import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_BANNERS } from '../data/banners';
import { HeroBanner } from '../types';

const BANNERS_STORAGE_KEY = 'luma_hotz_carousel_banners_v1';

const getInitialBanners = (): HeroBanner[] => {
  try {
    const saved = localStorage.getItem(BANNERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored banners:', e);
  }
  return HERO_BANNERS;
};

export const Hero: React.FC = () => {
  const [banners] = useState<HeroBanner[]>(getInitialBanners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextBanner = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevBanner = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextBanner, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextBanner]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextBanner();
    } else if (distance < -50) {
      prevBanner();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = banners[currentIndex] || banners[0];

  return (
    <div
      id="hero-carousel"
      className="relative w-full h-[60vh] sm:h-[75vh] max-h-[760px] min-h-[440px] bg-[#FAF7F5] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with smooth fade — each banner is a complete clickable image */}
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Link
              to={banner.ctaLink}
              id={`hero-slide-link-${index}`}
              className="block w-full h-full relative group cursor-pointer"
              title={`${banner.title} - Clique para ver coleção`}
            >
              {/* Desktop Picture: Full crisp image */}
              <img
                src={banner.imageDesktop}
                alt={banner.title}
                className="w-full h-full object-cover object-center hidden sm:block transition-transform duration-1000 group-hover:scale-[1.02]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Mobile Picture: Full crisp image */}
              <img
                src={banner.imageMobile || banner.imageDesktop}
                alt={banner.title}
                className="w-full h-full object-cover object-center sm:hidden"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Gentle bottom gradient to ensure text readability without darkening the photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />
            </Link>
          </div>
        );
      })}

      {/* Floating Content: Minimalist, elegant caption card that leaves the image fully visible */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-12 flex flex-col justify-end pb-14 sm:pb-16 pointer-events-none">
        <div className="max-w-xl text-white pointer-events-auto">
          {current.badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2 sm:mb-3 border border-white/20">
              <Sparkles className="w-3 h-3 text-[#C36B4F]" />
              <span>{current.badge}</span>
            </span>
          )}

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight mb-2 sm:mb-3 drop-shadow-md">
            {current.title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-200 font-light mb-4 sm:mb-6 max-w-md line-clamp-2 leading-relaxed drop-shadow-sm">
            {current.subtitle}
          </p>

          <Link
            to={current.ctaLink}
            id="hero-cta-btn"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-white text-[#171717] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#FAF7F5] hover:gap-3 transition-all shadow-lg"
          >
            <span>{current.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Arrow Controls (Desktop) */}
      <div className="hidden sm:flex items-center justify-between absolute inset-y-0 inset-x-4 z-30 pointer-events-none">
        <button
          onClick={prevBanner}
          aria-label="Banner anterior"
          className="pointer-events-auto w-11 h-11 bg-black/30 hover:bg-white text-white hover:text-[#171717] backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextBanner}
          aria-label="Próximo banner"
          className="pointer-events-auto w-11 h-11 bg-black/30 hover:bg-white text-white hover:text-[#171717] backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-30 flex justify-center items-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para banner ${index + 1}`}
            className={`h-1.5 transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
