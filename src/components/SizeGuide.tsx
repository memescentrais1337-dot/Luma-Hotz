import React, { useEffect } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose }) => {
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
    <div id="size-guide-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-white shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#171717]" />
            <h3 className="font-serif text-xl font-medium text-[#171717]">Guia de Tamanhos</h3>
          </div>
          <button
            onClick={onClose}
            id="close-size-guide"
            aria-label="Fechar guia de tamanhos"
            className="p-1 text-[#6F6F6F] hover:text-[#171717]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#6F6F6F] my-4 leading-relaxed">
          Nossas peças seguem a tabela de medidas padrão brasileira em centímetros (cm). Se estiver em dúvida entre dois tamanhos, recomendamos escolher o maior para um caimento mais confortável.
        </p>

        {/* Table */}
        <div className="overflow-x-auto border border-[#EAEAEA] mb-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F5] border-b border-[#EAEAEA] text-[#171717] font-semibold uppercase tracking-wider">
                <th className="p-3">Tamanho</th>
                <th className="p-3">Busto</th>
                <th className="p-3">Cintura</th>
                <th className="p-3">Quadril</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA] text-[#6F6F6F]">
              <tr className="hover:bg-[#FAF7F5]/50">
                <td className="p-3 font-semibold text-[#171717]">P (36/38)</td>
                <td className="p-3">84 – 88 cm</td>
                <td className="p-3">66 – 70 cm</td>
                <td className="p-3">94 – 98 cm</td>
              </tr>
              <tr className="hover:bg-[#FAF7F5]/50">
                <td className="p-3 font-semibold text-[#171717]">M (40)</td>
                <td className="p-3">89 – 94 cm</td>
                <td className="p-3">71 – 76 cm</td>
                <td className="p-3">99 – 104 cm</td>
              </tr>
              <tr className="hover:bg-[#FAF7F5]/50">
                <td className="p-3 font-semibold text-[#171717]">G (42)</td>
                <td className="p-3">95 – 100 cm</td>
                <td className="p-3">77 – 82 cm</td>
                <td className="p-3">105 – 110 cm</td>
              </tr>
              <tr className="hover:bg-[#FAF7F5]/50">
                <td className="p-3 font-semibold text-[#171717]">GG (44)</td>
                <td className="p-3">101 – 106 cm</td>
                <td className="p-3">83 – 88 cm</td>
                <td className="p-3">111 – 116 cm</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* How to measure */}
        <div className="bg-[#FAF7F5] p-4 text-xs space-y-2 border border-[#EAEAEA]">
          <p className="font-semibold text-[#171717] uppercase tracking-wider text-[11px]">
            Como tirar suas medidas:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[#6F6F6F]">
            <li>
              <strong className="text-[#171717]">Busto:</strong> Meça ao redor da parte mais saliente do busto mantendo a fita reta.
            </li>
            <li>
              <strong className="text-[#171717]">Cintura:</strong> Meça a circunferência no ponto mais estreito da cintura, cerca de 2 dedos acima do umbigo.
            </li>
            <li>
              <strong className="text-[#171717]">Quadril:</strong> Meça ao redor da parte mais larga dos quadris e bumbum.
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#171717] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};
