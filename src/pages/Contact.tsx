import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { STORE_SETTINGS } from '../data/settings';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { SizeGuide } from '../components/SizeGuide';
import {
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  ChevronDown,
  Ruler,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';

const FAQS = [
  {
    q: 'Como faço para realizar meu pedido?',
    a: 'Basta navegar pelo nosso catálogo, entrar na página do produto desejado, escolher a cor, tamanho e quantidade e clicar em "Adicionar à Sacola". Depois de escolher todas as peças, abra a sacola e clique em "Finalizar Pedido pelo WhatsApp". Uma mensagem completa com todos os itens será enviada diretamente para nossa equipe.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'Após o envio do pedido no WhatsApp, nossa consultora confirmará a disponibilidade imediata das peças e fornecerá as opções de pagamento (Pix com desconto à vista ou cartão de crédito parcelado via link seguro de pagamento).',
  },
  {
    q: 'Como é calculada a entrega / frete?',
    a: 'O frete é calculado e combinado de forma personalizada com base no seu CEP. Enviamos para todo o Brasil via Correios (PAC e Sedex) ou transportadoras parceiras, além de opção de motoboy para entregas locais.',
  },
  {
    q: 'Qual é a política de trocas e devoluções?',
    a: 'Você tem até 7 dias corridos após o recebimento da peça para solicitar a troca ou devolução, desde que a peça esteja intacta, com etiquetas afixadas e sem indícios de uso. Basta nos chamar no WhatsApp informando o número do pedido.',
  },
  {
    q: 'As peças têm garantia de qualidade?',
    a: 'Sim! Trabalhamos exclusivamente com tecidos e acabamentos premium inspecionados peça a peça antes do envio para garantir a melhor experiência para você.',
  },
];

export const Contact: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <div id="contact-page" className="min-h-screen bg-white pb-20">
      <Breadcrumb items={[{ label: 'Atendimento & Ajuda' }]} />

      {/* Header */}
      <div className="bg-[#FAF7F5] border-b border-[#EAEAEA] py-12 sm:py-16 px-4 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-2 block">
            Fale Conosco
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-normal">
            Atendimento & Ajuda
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6F6F] mt-3 leading-relaxed">
            Estamos prontos para atender você com atenção e consultoria exclusiva para seus looks.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-16 space-y-16">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <div className="p-6 bg-[#FAF7F5] border border-[#EAEAEA] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#171717] mb-1">WhatsApp Oficial</h3>
              <p className="text-xs text-[#6F6F6F] mb-4">
                Atendimento rápido para tirar dúvidas e fechar pedidos.
              </p>
              <p className="text-sm font-semibold text-[#171717] mb-4">
                {STORE_SETTINGS.whatsappFormatted}
              </p>
            </div>
            <a
              href={createGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
            >
              Chamar no WhatsApp
            </a>
          </div>

          {/* Instagram Card */}
          <div className="p-6 bg-[#FAF7F5] border border-[#EAEAEA] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#F3E5DF] text-[#171717] flex items-center justify-center mb-4">
                <Instagram className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#171717] mb-1">Instagram</h3>
              <p className="text-xs text-[#6F6F6F] mb-4">
                Veja provadores diários, vídeos das peças e lançamentos.
              </p>
              <p className="text-sm font-semibold text-[#171717] mb-4">
                {STORE_SETTINGS.instagram}
              </p>
            </div>
            <a
              href={STORE_SETTINGS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2.5 bg-white border border-[#EAEAEA] text-[#171717] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF7F5] transition-colors"
            >
              Seguir no Instagram
            </a>
          </div>

          {/* Horários & E-mail */}
          <div className="p-6 bg-[#FAF7F5] border border-[#EAEAEA] flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#F3E5DF] text-[#171717] flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#171717] mb-1">Horário & Local</h3>
                <div className="text-xs text-[#6F6F6F] space-y-2 mt-2">
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#171717] shrink-0 mt-0.5" />
                    <span>{STORE_SETTINGS.openingHours}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#171717] shrink-0 mt-0.5" />
                    <span>{STORE_SETTINGS.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#171717] shrink-0 mt-0.5" />
                    <span>{STORE_SETTINGS.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMO COMPRAR STEP BY STEP */}
        <section id="como-comprar" className="pt-8 border-t border-[#EAEAEA]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1 block">
              Passo a Passo
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">Como Comprar na {STORE_SETTINGS.brandName}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
            <div className="p-4 space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#171717] text-white text-xs font-bold flex items-center justify-center mx-auto">
                1
              </span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#171717]">
                Escolha suas peças
              </h4>
              <p className="text-xs text-[#6F6F6F] leading-relaxed">
                Navegue pelas categorias e escolha cor, tamanho e quantidade de cada peça.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#171717] text-white text-xs font-bold flex items-center justify-center mx-auto">
                2
              </span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#171717]">
                Adicione à Sacola
              </h4>
              <p className="text-xs text-[#6F6F6F] leading-relaxed">
                Reúna todos os seus itens desejados na sacola de compras com subtotal instantâneo.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#171717] text-white text-xs font-bold flex items-center justify-center mx-auto">
                3
              </span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#171717]">
                Envie pelo WhatsApp
              </h4>
              <p className="text-xs text-[#6F6F6F] leading-relaxed">
                Clique em "Finalizar Pedido pelo WhatsApp" e a mensagem já vai pronta para envio.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#171717] text-white text-xs font-bold flex items-center justify-center mx-auto">
                4
              </span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#171717]">
                Receba em Casa
              </h4>
              <p className="text-xs text-[#6F6F6F] leading-relaxed">
                Combine o frete e pagamento seguro e receba tudo com embalagem exclusiva.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section id="faq" className="pt-8 border-t border-[#EAEAEA]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6F] font-semibold mb-1 block">
              Dúvidas Frequentes
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">Perguntas & Respostas</h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[#EAEAEA] border-y border-[#EAEAEA]">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#6F6F6F] gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6F6F6F] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#171717]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-4 text-xs sm:text-sm text-[#6F6F6F] leading-relaxed">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center" id="tamanhos">
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#171717] text-xs uppercase tracking-wider font-semibold text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
            >
              <Ruler className="w-4 h-4" />
              <span>Consultar Tabela de Medidas Completa</span>
            </button>
          </div>
        </section>

        {/* TROCAS E DEVOLUÇÕES ANCHOR */}
        <section id="trocas" className="pt-8 border-t border-[#EAEAEA]">
          <div className="p-8 bg-[#FAF7F5] border border-[#EAEAEA] max-w-3xl mx-auto space-y-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#171717]" />
              <h3 className="font-serif text-xl text-[#171717]">Política de Trocas e Devoluções</h3>
            </div>
            <div className="text-xs text-[#6F6F6F] space-y-2 leading-relaxed">
              <p>
                De acordo com o Código de Defesa do Consumidor, você tem até <strong>7 dias corridos</strong> após a entrega para solicitar a troca ou devolução do seu pedido.
              </p>
              <p>
                <strong>Condições para troca:</strong> As peças devem estar acompanhadas da etiqueta fixada, sem sinais de lavagem, manchas, odores ou alterações.
              </p>
              <p>
                Para solicitar, basta enviar uma mensagem no nosso WhatsApp informando o produto e motivo.
              </p>
            </div>
          </div>
        </section>
      </div>

      <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
};
