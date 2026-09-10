import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Clock, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { STORE_SETTINGS } from '../data/settings';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

const INSTAGRAM_POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    link: STORE_SETTINGS.instagramUrl,
  },
  {
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
    link: STORE_SETTINGS.instagramUrl,
  },
  {
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    link: STORE_SETTINGS.instagramUrl,
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
    link: STORE_SETTINGS.instagramUrl,
  },
  {
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    link: STORE_SETTINGS.instagramUrl,
  },
  {
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80',
    link: STORE_SETTINGS.instagramUrl,
  },
];

export const Footer: React.FC = () => {
  return (
    <footer id="site-footer" className="bg-[#FAF7F5] border-t border-[#EAEAEA]">
      {/* Instagram Feed Showcase Section */}
      <section className="py-12 border-b border-[#EAEAEA] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1">
            Inspirações & Looks
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal">
            Siga a gente no Instagram
          </h3>
          <a
            href={STORE_SETTINGS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#6F6F6F] transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>{STORE_SETTINGS.instagram}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Grid items */}
        <div className="max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {INSTAGRAM_POSTS.map((post, i) => (
            <a
              key={i}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-neutral-200 block"
            >
              <img
                src={post.image}
                alt={`Instagram look ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-5 h-5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-semibold tracking-[0.18em] text-[#171717] uppercase">
                {STORE_SETTINGS.brandName}
              </span>
              <span className="block text-[9px] tracking-[0.25em] text-[#6F6F6F] uppercase">
                {STORE_SETTINGS.subName}
              </span>
            </Link>

            <p className="text-xs text-[#6F6F6F] leading-relaxed max-w-sm">
              {STORE_SETTINGS.tagline}
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#6F6F6F]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#171717] shrink-0" />
                <span>{STORE_SETTINGS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#171717] shrink-0" />
                <span>{STORE_SETTINGS.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Institucional */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171717]">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs text-[#6F6F6F]">
              <li>
                <Link to="/sobre" className="hover:text-[#171717] transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-[#171717] transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/sobre#privacidade" className="hover:text-[#171717] transition-colors">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link to="/contato#trocas" className="hover:text-[#171717] transition-colors">
                  Trocas e devoluções
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Atendimento */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171717]">
              Atendimento
            </h4>
            <ul className="space-y-2 text-xs text-[#6F6F6F]">
              <li>
                <a
                  href={createGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#171717] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp: {STORE_SETTINGS.whatsappFormatted}</span>
                </a>
              </li>
              <li>
                <a
                  href={STORE_SETTINGS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#171717] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram: {STORE_SETTINGS.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STORE_SETTINGS.email}`}
                  className="flex items-center gap-1.5 hover:text-[#171717] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{STORE_SETTINGS.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Ajuda */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171717]">
              Ajuda
            </h4>
            <ul className="space-y-2 text-xs text-[#6F6F6F]">
              <li>
                <Link to="/contato#como-comprar" className="hover:text-[#171717] transition-colors">
                  Como comprar
                </Link>
              </li>
              <li>
                <Link to="/contato#faq" className="hover:text-[#171717] transition-colors">
                  Dúvidas frequentes
                </Link>
              </li>
              <li>
                <Link to="/contato#tamanhos" className="hover:text-[#171717] transition-colors">
                  Guia de tamanhos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E8E]">
          <p>© 2026 {STORE_SETTINGS.name}. Todos os direitos reservados.</p>
          <p>Desenvolvido por LP Marketing Digital.</p>
        </div>
      </div>
    </footer>
  );
};
