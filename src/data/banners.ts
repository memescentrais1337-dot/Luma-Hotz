import { HeroBanner } from '../types';

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'banner-1',
    title: 'NOVA COLEÇÃO PRIMAVERA/VERÃO',
    subtitle: 'Linhas puras, tecidos nobres e elegância atemporal para cada momento.',
    ctaText: 'CONHECER COLEÇÃO',
    ctaLink: '/produtos',
    imageDesktop: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85',
    imageMobile: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85',
    textPosition: 'left',
    badge: 'LANÇAMENTO EXCLUSIVO',
  },
  {
    id: 'banner-2',
    title: 'ALFAIATARIA CONTEMPORÂNEA',
    subtitle: 'Conjuntos e cortes precisos feitos para a mulher moderna e confiante.',
    ctaText: 'VER CONJUNTOS',
    ctaLink: '/categoria/conjuntos',
    imageDesktop: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85',
    imageMobile: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85',
    textPosition: 'center',
    badge: 'ESSENCIAIS DO CLOSET',
  },
  {
    id: 'banner-3',
    title: 'VESTIDOS QUE INSPIRAM',
    subtitle: 'Do casual chic aos eventos marcantes com sofisticação despretensiosa.',
    ctaText: 'EXPLORAR VESTIDOS',
    ctaLink: '/categoria/vestidos',
    imageDesktop: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2000&q=85',
    imageMobile: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85',
    textPosition: 'right',
    badge: 'DESTAQUES DA SEMANA',
  },
];
