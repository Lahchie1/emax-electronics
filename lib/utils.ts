import { StockStatus } from './types';

/**
 * Format Nigerian Naira (NGN)
 * priceMinor is in Kobo (NGN * 100)
 */
export function formatCurrency(priceMinor: number, currency = 'NGN'): string {
  const amount = priceMinor / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate Contextual WhatsApp URL
 */
export function generateWhatsAppUrl(customMessage?: string, phoneNumber = '2349038359288'): string {
  const msg = customMessage || 'Hello Emax Electronics Enterprises, I want to inquire about verified lithium cells and e-bikes.';
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
}

/**
 * Stock Status Presentation Helpers
 */
export function getStockStatusDisplay(status: StockStatus): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (status) {
    case 'in_stock':
      return {
        label: 'In Stock',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500',
      };
    case 'low_stock':
      return {
        label: 'Low Stock',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
        dotClass: 'bg-amber-500',
      };
    case 'out_of_stock':
      return {
        label: 'Out of Stock',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
        dotClass: 'bg-rose-500',
      };
    case 'contact_to_confirm':
    default:
      return {
        label: 'Contact to Confirm',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        dotClass: 'bg-slate-400',
      };
  }
}

