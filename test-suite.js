/**
 * Verification Test Suite for Dream Computer E-Commerce & Admin
 */

import { buildBookingWhatsAppMessage, getWhatsAppUrl, buildProductEnquiryMessage } from './src/services/whatsapp/whatsappService.js';
import { formatPrice, calculateDiscount, generateBookingId, slugify } from './src/utils/formatters.js';
import { INITIAL_PRODUCTS } from './src/services/firebase/seedData.js';
import { getLocalBusinessSchema, getProductSchema } from './src/services/seo/schemas.js';

console.log('=== RUNNING DREAM COMPUTER SYSTEM VERIFICATION ===\n');

// 1. Formatters Test
console.log('1. Testing Currency & Calculation Formatters:');
const p1 = formatPrice(114990);
const d1 = calculateDiscount(142990, 114990);
const bId = generateBookingId();
const slug = slugify('Dream Titan RTX 4080 Super');

console.log(`   - formatPrice(114990): "${p1}" (Expected: ₹1,14,990)`);
console.log(`   - calculateDiscount(142990, 114990): ${d1}% (Expected: ~20%)`);
console.log(`   - generateBookingId(): "${bId}" (Matches DC-YYYY-XXXX: ${/^DC-\d{4}-\d{4}$/.test(bId)})`);
console.log(`   - slugify(): "${slug}"`);
if (!p1.includes('1,14,990') || d1 !== 20 || !slug.includes('dream-titan')) {
  throw new Error('Formatter tests failed!');
}
console.log('   ✓ Formatters PASSED\n');

// 2. WhatsApp Integration Test
console.log('2. Testing WhatsApp Booking Message Generator:');
const sampleBooking = {
  bookingId: 'DC-2026-9999',
  customer: {
    name: 'Vikramaditya Sharma',
    phone: '+91 98350 12345',
    email: 'vikram@example.com',
  },
  items: [
    {
      productName: 'ASUS ROG Strix G16 (2026 Gaming Edition)',
      brandName: 'ASUS ROG',
      sku: 'DC-ROG-G16-16G-1T-4060',
      selectedAttributes: { ram: '16GB DDR5', storage: '1TB Gen4 NVMe SSD', gpu: 'RTX 4060 8GB' },
      quantity: 1,
      price: 114990,
    },
  ],
  estimatedTotal: 114990,
  deliveryPreference: 'pickup',
  customerNotes: 'Please keep warranty invoice ready for store pickup.',
};

const waText = buildBookingWhatsAppMessage(sampleBooking);
const waUrl = getWhatsAppUrl(waText);

console.log('Generated WhatsApp Text:');
console.log('--------------------------------------------------');
console.log(waText);
console.log('--------------------------------------------------');
console.log('Generated WhatsApp Click URL:');
console.log(waUrl);

if (!waUrl.includes('wa.me/918448474795') || !waText.includes('DC-2026-9999') || !waText.includes('1,14,990')) {
  throw new Error('WhatsApp message generator failed validation!');
}
console.log('   ✓ WhatsApp Generator PASSED\n');

// 3. Product Variations & Schema Test
console.log('3. Testing Product Variations & Schema Generation:');
const rogProduct = INITIAL_PRODUCTS.find((p) => p.id === 'prod-rog-strix-g16');
console.log(`   - Found Product: "${rogProduct.name}"`);
console.log(`   - Total Configured Variants: ${rogProduct.variants.length}`);

// Test variant 2 selection
const selectedV2 = rogProduct.variants[1];
console.log(`   - Variant 2: ${JSON.stringify(selectedV2.attributes)} -> Price: ₹${selectedV2.price}, SKU: ${selectedV2.sku}`);

const schema = getProductSchema(rogProduct, selectedV2);
console.log(`   - Schema Product Name: "${schema.name}"`);
console.log(`   - Schema Offers Price: ${schema.offers.price} ${schema.offers.priceCurrency}`);
console.log(`   - Schema SKU: "${schema.sku}"`);

if (schema.offers.price !== 139990 || schema.sku !== 'DC-ROG-G16-32G-1T-4070') {
  throw new Error('Product variant schema binding failed!');
}
console.log('   ✓ Product Variations & Schema PASSED\n');

// 4. LocalBusiness Schema Test
console.log('4. Testing LocalBusiness Structured Data:');
const storeSchema = getLocalBusinessSchema();
console.log(`   - Business Name: ${storeSchema.name}`);
console.log(`   - Street Address: ${storeSchema.address.streetAddress}`);
console.log(`   - City: ${storeSchema.address.addressLocality}`);
console.log(`   - Geo: Lat ${storeSchema.geo.latitude}, Lon ${storeSchema.geo.longitude}`);
console.log(`   - Opening Hours: ${storeSchema.openingHoursSpecification.length} entries`);

if (!storeSchema.address.streetAddress.includes('SP Verma Road') || storeSchema.address.addressLocality !== 'Patna') {
  throw new Error('Store schema failed local business validation!');
}
console.log('   ✓ LocalBusiness Schema PASSED\n');

console.log('🎉 ALL SYSTEM INTEGRATION TESTS PASSED 100%!');
