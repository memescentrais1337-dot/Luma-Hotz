import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3 select-none"
    >
      {/* Desktop Tooltip */}
      {showTooltip && (
        <div
          id="whatsapp-tooltip"
          className="hidden sm:block px-3.5 py-1.5 bg-[#171717] text-white text-xs tracking-wider uppercase font-medium shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200"
        >
          Fale Conosco
        </div>
      )}

      {/* Floating Button */}
      <a
        href={createGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        aria-label="Fale conosco pelo WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border-2 border-white"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
      </a>
    </aside>
  );
};
