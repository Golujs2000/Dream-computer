/**
 * WhatsApp Integration Service for Dream Computer
 * Primary Business WhatsApp: +91 84484 74795
 */

export const WHATSAPP_NUMBER = '918448474795';

/**
 * Build prefilled WhatsApp message for booking request
 */
export const buildBookingWhatsAppMessage = (booking) => {
  const { bookingId, customer, items, estimatedTotal, deliveryPreference, customerNotes } = booking;

  let message = `*Hello Dream Computer!*\n`;
  message += `I would like to place a product booking request:\n\n`;
  message += `📋 *Booking ID:* ${bookingId}\n`;
  message += `👤 *Customer Name:* ${customer.name}\n`;
  message += `📱 *Phone:* ${customer.phone}\n`;
  if (customer.email) {
    message += `✉️ *Email:* ${customer.email}\n`;
  }
  message += `🚚 *Preference:* ${deliveryPreference === 'pickup' ? 'Store Pickup (Patna)' : 'Local Delivery (Patna)'}\n\n`;

  message += `🛒 *BOOKED ITEMS:*\n`;
  items.forEach((item, index) => {
    message += `\n*${index + 1}. ${item.productName}*\n`;
    if (item.brandName) {
      message += `   • Brand: ${item.brandName}\n`;
    }
    if (item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0) {
      const configStr = Object.entries(item.selectedAttributes)
        .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
        .join(', ');
      message += `   • Specs: ${configStr}\n`;
    }
    if (item.sku) {
      message += `   • SKU: ${item.sku}\n`;
    }
    message += `   • Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}\n`;
  });

  message += `\n💰 *Estimated Total:* ₹${estimatedTotal.toLocaleString('en-IN')}\n`;

  if (customerNotes) {
    message += `\n💬 *Customer Note:* ${customerNotes}\n`;
  }

  message += `\nPlease confirm product availability, warranty details, and final store pricing.\n\nThank you!`;

  return message;
};

/**
 * Generate click-to-chat WhatsApp URL
 */
export const getWhatsAppUrl = (message, phone = WHATSAPP_NUMBER) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};

/**
 * Quick single product direct enquiry message
 */
export const buildProductEnquiryMessage = (product, selectedVariant = null) => {
  let message = `*Hello Dream Computer!*\n`;
  message += `I am interested in this product:\n\n`;
  message += `🖥️ *Product:* ${product.name}\n`;
  if (product.brandName) message += `🏷️ *Brand:* ${product.brandName}\n`;
  
  if (selectedVariant && selectedVariant.attributes) {
    const config = Object.entries(selectedVariant.attributes)
      .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
      .join(', ');
    message += `⚙️ *Configuration:* ${config}\n`;
    message += `💵 *Price:* ₹${(selectedVariant.price || product.basePrice).toLocaleString('en-IN')}\n`;
    message += `🔖 *SKU:* ${selectedVariant.sku || product.sku}\n`;
  } else {
    message += `💵 *Price:* ₹${product.basePrice.toLocaleString('en-IN')}\n`;
    message += `🔖 *SKU:* ${product.sku}\n`;
  }

  message += `\nIs this available at your Patna store? Please share latest offers and availability.\nThank you!`;
  return message;
};

/**
 * Custom PC build enquiry message
 */
export const buildCustomPcEnquiryMessage = (pcConfig) => {
  let message = `*Hello Dream Computer!*\n`;
  message += `I want to build a Custom PC in Patna. Here is my configuration:\n\n`;
  
  Object.entries(pcConfig).forEach(([component, spec]) => {
    if (spec) {
      message += `• *${component}:* ${spec}\n`;
    }
  });

  message += `\nPlease provide an estimated quote, component compatibility check, and build timeline.\nThank you!`;
  return message;
};

/**
 * Repair service enquiry message
 */
export const buildRepairEnquiryMessage = (serviceType, deviceDetails) => {
  let message = `*Hello Dream Computer Repair Team!*\n`;
  message += `I need repair / service assistance in Patna:\n\n`;
  message += `🔧 *Service Required:* ${serviceType}\n`;
  message += `💻 *Device Details & Issue:* ${deviceDetails}\n\n`;
  message += `Please let me know if I can bring it to your SP Verma Road store for diagnosis.\nThank you!`;
  return message;
};
