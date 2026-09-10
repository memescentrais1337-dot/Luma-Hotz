import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div id="not-found-page" className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-white text-center">
      <div className="max-w-md mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8E8E8E] font-semibold">
          Erro 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#171717] font-normal">
          Página não encontrada
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed">
          A página ou peça que você procurava não existe ou mudou de endereço.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
