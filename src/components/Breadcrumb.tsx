import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      id="site-breadcrumb"
      className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-xs text-[#6F6F6F]"
    >
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            to="/"
            className="hover:text-[#171717] transition-colors uppercase tracking-wider text-[11px]"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-[#B3ABA5]" />
              {isLast || !item.path ? (
                <span className="text-[#171717] font-medium uppercase tracking-wider text-[11px] truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-[#171717] transition-colors uppercase tracking-wider text-[11px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
