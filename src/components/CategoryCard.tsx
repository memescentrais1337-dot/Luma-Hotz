import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/categoria/${category.slug}`}
      id={`category-card-${category.slug}`}
      className="group relative block aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#FAF7F5] border border-[#EAEAEA]"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Elegant dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
        <h3 className="font-serif text-lg sm:text-2xl tracking-wide uppercase font-semibold text-white drop-shadow-xs">
          {category.name}
        </h3>
        <p className="text-[11px] text-neutral-200 mt-1 line-clamp-1 hidden sm:block">
          {category.description}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-white group-hover:translate-x-1 transition-transform">
          <span>Ver Coleção</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};
