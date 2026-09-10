import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'vestidos',
    slug: 'vestidos',
    name: 'Vestidos',
    description: 'Fluidez, elegância e cortes impecáveis para ocasiões especiais e o dia a dia.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'conjuntos',
    slug: 'conjuntos',
    name: 'Conjuntos',
    description: 'Harmonia e sofisticação em combinações coordenadas que facilitam sua produção.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'blusas',
    slug: 'blusas',
    name: 'Blusas',
    description: 'Camisaria nobre, sedas e modelagens atemporais que elevam qualquer visual.',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'calcas',
    slug: 'calcas',
    name: 'Calças',
    description: 'Alfaiataria precisa e modelagens amplas em tecidos com toque suave e caimento perfeito.',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'shorts',
    slug: 'shorts',
    name: 'Shorts & Saias',
    description: 'Frescor sofisticado com acabamento de alfaiataria e cintura estruturada.',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'jeans',
    slug: 'jeans',
    name: 'Jeans',
    description: 'Denim 100% algodão com lavagens clássicas e modelagens contemporâneas.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'acessorios',
    slug: 'acessorios',
    name: 'Acessórios',
    description: 'Bolsas em couro legítimo, cintos finos e detalhes que assinam sua personalidade.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
];

export const NAV_LINKS = [
  { name: 'Novidades', path: '/produtos?filtro=novidades' },
  { name: 'Todos os Produtos', path: '/produtos' },
  { name: 'Vestidos', path: '/categoria/vestidos' },
  { name: 'Blusas', path: '/categoria/blusas' },
  { name: 'Conjuntos', path: '/categoria/conjuntos' },
  { name: 'Calças', path: '/categoria/calcas' },
  { name: 'Shorts & Saias', path: '/categoria/shorts' },
  { name: 'Jeans', path: '/categoria/jeans' },
  { name: 'Acessórios', path: '/categoria/acessorios' },
  { name: 'Promoções', path: '/promocoes' },
];
