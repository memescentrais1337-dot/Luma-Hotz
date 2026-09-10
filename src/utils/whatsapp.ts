import { STORE_SETTINGS } from '../data/settings';
import { CartItem, Product } from '../types';
import { formatCurrency } from './currency';

export function getWhatsAppNumberClean(): string {
  return STORE_SETTINGS.whatsapp.replace(/\D/g, '');
}

export function createProductWhatsAppUrl(
  product: Product,
  options?: {
    size?: string;
    color?: string;
    quantity?: number;
    url?: string;
  }
): string {
  const number = getWhatsAppNumberClean();
  const quantity = options?.quantity ?? 1;
  const currentUrl =
    options?.url ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}/produto/${product.slug}`
      : `/produto/${product.slug}`);

  const lines: string[] = [
    'Olá! 😊',
    'Tenho interesse neste produto:',
    '',
    `*${product.name}*`,
  ];

  if (options?.size) {
    lines.push(`Tamanho: ${options.size}`);
  }
  if (options?.color) {
    lines.push(`Cor: ${options.color}`);
  }

  lines.push(`Quantidade: ${quantity}`);
  lines.push(`Valor: ${formatCurrency(product.price)}`);
  lines.push('');
  lines.push('Link:');
  lines.push(currentUrl);
  lines.push('');
  lines.push('Gostaria de confirmar a disponibilidade.');

  const text = lines.join('\n');
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function createCartWhatsAppUrl(items: CartItem[], totalAmount: number): string {
  const number = getWhatsAppNumberClean();
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const lines: string[] = [
    'Olá! Tudo bem? 😊',
    '',
    'Gostaria de fazer este pedido:',
    '',
  ];

  items.forEach((item, index) => {
    const itemSubtotal = item.product.price * item.quantity;
    lines.push(`*${index + 1}. ${item.product.name}*`);
    if (item.selectedSize) {
      lines.push(`Tamanho: ${item.selectedSize}`);
    }
    if (item.selectedColor) {
      lines.push(`Cor: ${item.selectedColor}`);
    }
    lines.push(`Quantidade: ${item.quantity}`);
    lines.push(`Valor unitário: ${formatCurrency(item.product.price)}`);
    lines.push(`Subtotal: ${formatCurrency(itemSubtotal)}`);
    lines.push('');
  });

  lines.push('--------------------');
  lines.push('*Resumo do pedido*');
  lines.push('');
  lines.push(`Itens: ${totalItemsCount}`);
  lines.push(`Total: ${formatCurrency(totalAmount)}`);
  lines.push('');
  lines.push('Gostaria de confirmar a disponibilidade e combinar entrega/pagamento. 😊');

  const text = lines.join('\n');
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function createGeneralWhatsAppUrl(customMessage?: string): string {
  const number = getWhatsAppNumberClean();
  const message = customMessage || STORE_SETTINGS.whatsappDefaultMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
