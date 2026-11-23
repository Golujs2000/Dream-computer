/**
 * Formatting utilities for Dream Computer E-Commerce
 */

// Format price in Indian Rupee format (e.g. ₹85,000)
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscount = (mrp, price) => {
  if (!mrp || !price || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

// Format date and time
export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Generate URL slug from title
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Generate Booking Reference ID e.g. DC-2026-0182
export const generateBookingId = () => {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `DC-${year}-${randomSuffix}`;
};

// Generate SKU
export const generateSKU = (prefix = 'DC', category = 'GEN') => {
  const code = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${category.substring(0, 3).toUpperCase()}-${code}`;
};
