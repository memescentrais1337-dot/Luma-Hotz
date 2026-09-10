import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto bg-[#171717] text-white p-4 shadow-xl border border-neutral-800 flex items-start gap-3 transition-all duration-300 transform translate-y-0"
        >
          {toast.type === 'warning' ? (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#FAF7F5] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold tracking-wider uppercase">{toast.title}</p>
            {toast.description && (
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white p-1 -mr-1"
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
