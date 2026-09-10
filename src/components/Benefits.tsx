import React from 'react';
import { Truck, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Envio Para Todo o Brasil',
    subtitle: 'Rápido, seguro e rastreado',
  },
  {
    icon: MessageCircle,
    title: 'Compre pelo WhatsApp',
    subtitle: 'Atendimento personalizado e ágil',
  },
  {
    icon: ShieldCheck,
    title: 'Compra 100% Segura',
    subtitle: 'Confiança e transparência total',
  },
  {
    icon: Sparkles,
    title: 'Novidades Toda Semana',
    subtitle: 'Coleções exclusivas e limitadas',
  },
];

export const Benefits: React.FC = () => {
  return (
    <section
      id="benefits-bar"
      className="border-b border-[#EAEAEA] bg-[#FAF7F5] py-4 sm:py-6 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {BENEFITS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-2 sm:p-3 bg-white/70 sm:bg-transparent border sm:border-0 border-[#EAEAEA]"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F3E5DF] text-[#171717] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#171717]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-xs font-semibold uppercase tracking-wider text-[#171717] truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#6F6F6F] truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
