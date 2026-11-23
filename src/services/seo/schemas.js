import { STORE_INFO } from './seoConfig.js';

/**
 * Generate Schema.org Structured Data (JSON-LD)
 */

export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['ComputerStore', 'ElectronicsStore', 'LocalBusiness'],
  '@id': `${STORE_INFO.url}/#store`,
  name: STORE_INFO.name,
  legalName: STORE_INFO.legalName,
  url: STORE_INFO.url,
  logo: `${STORE_INFO.url}/favicon.svg`,
  image: `${STORE_INFO.url}/images/storefront-banner.jpg`,
  description: STORE_INFO.description,
  telephone: STORE_INFO.telephone,
  priceRange: STORE_INFO.priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: STORE_INFO.address.streetAddress,
    addressLocality: STORE_INFO.address.addressLocality,
    addressRegion: STORE_INFO.address.addressRegion,
    postalCode: STORE_INFO.address.postalCode,
    addressCountry: STORE_INFO.address.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: STORE_INFO.geo.latitude,
    longitude: STORE_INFO.geo.longitude,
  },
  openingHoursSpecification: STORE_INFO.openingHoursSpecification.map((item) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: item.dayOfWeek,
    opens: item.opens,
    closes: item.closes,
  })),
  hasMap: 'https://maps.google.com/?q=SP+Verma+Road+Patna+Bihar',
  areaServed: [
    {
      '@type': 'City',
      name: 'Patna',
    },
    {
      '@type': 'State',
      name: 'Bihar',
    },
  ],
});

export const getProductSchema = (product, selectedVariant = null) => {
  const price = selectedVariant?.price || product.basePrice;
  const sku = selectedVariant?.sku || product.sku;
  const inStock = (selectedVariant?.stock ?? product.stock) > 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images && product.images.length > 0 ? product.images : [`${STORE_INFO.url}/favicon.svg`],
    description: product.shortDescription || product.description,
    sku: sku,
    brand: {
      '@type': 'Brand',
      name: product.brandName || 'Dream Computer',
    },
    offers: {
      '@type': 'Offer',
      url: `${STORE_INFO.url}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: STORE_INFO.name,
      },
    },
  };
};

export const getBreadcrumbsSchema = (breadcrumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: crumb.name,
    item: `${STORE_INFO.url}${crumb.path}`,
  })),
});
