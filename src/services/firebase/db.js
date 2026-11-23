import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  serverTimestamp,
} from 'firebase/firestore';
import { db as firestoreDb, isFirebaseConfigured } from './config';
import {
  INITIAL_BRANDS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ATTRIBUTES,
  INITIAL_BANNERS,
  INITIAL_TESTIMONIALS,
  INITIAL_SETTINGS,
} from './seedData';

// Local storage keys for local simulation
const STORAGE_PREFIX = 'dc_store_';

const getLocalCollection = (colName) => {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${colName}`);
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading local collection ${colName}`, err);
  }
  return null;
};

const setLocalCollection = (colName, items) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${colName}`, JSON.stringify(items));
    // Dispatch storage event so all tabs/listeners update
    window.dispatchEvent(new CustomEvent(`dc_db_${colName}_updated`, { detail: items }));
  } catch (err) {
    console.error(`Error saving local collection ${colName}`, err);
  }
};

/**
 * Initialize / Seed Local Database if not populated
 */
export const initializeDatabase = (force = false) => {
  if (force || !getLocalCollection('products')) {
    setLocalCollection('products', INITIAL_PRODUCTS);
  }
  if (force || !getLocalCollection('categories')) {
    setLocalCollection('categories', INITIAL_CATEGORIES);
  }
  if (force || !getLocalCollection('brands')) {
    setLocalCollection('brands', INITIAL_BRANDS);
  }
  if (force || !getLocalCollection('attributes')) {
    setLocalCollection('attributes', INITIAL_ATTRIBUTES);
  }
  if (force || !getLocalCollection('banners')) {
    setLocalCollection('banners', INITIAL_BANNERS);
  }
  if (force || !getLocalCollection('testimonials')) {
    setLocalCollection('testimonials', INITIAL_TESTIMONIALS);
  }
  if (force || !getLocalCollection('settings')) {
    setLocalCollection('settings', [INITIAL_SETTINGS]);
  }
  if (force || !getLocalCollection('bookings')) {
    setLocalCollection('bookings', [
      {
        id: 'book-sample-1',
        bookingId: 'DC-2026-1042',
        customer: {
          name: 'Rajesh Ranjan',
          phone: '+91 98350 12345',
          email: 'rajesh.ranjan@example.com',
        },
        items: [
          {
            productId: 'prod-rog-strix-g16',
            productName: 'ASUS ROG Strix G16 (2026 Gaming Edition)',
            brandName: 'ASUS ROG',
            variantId: 'var-g16-v1',
            sku: 'DC-ROG-G16-16G-1T-4060',
            selectedAttributes: { ram: '16GB DDR5', storage: '1TB Gen4 NVMe SSD', gpu: 'RTX 4060 8GB' },
            quantity: 1,
            price: 114990,
          },
        ],
        estimatedTotal: 114990,
        bookingStatus: 'Confirmed',
        deliveryPreference: 'pickup',
        bookingSource: 'website_cart',
        whatsappHandoffAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        adminNotes: 'Customer will visit store on Saturday evening for unboxing and warranty registration.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: 'book-sample-2',
        bookingId: 'DC-2026-1043',
        customer: {
          name: 'Alok Kumar',
          phone: '+91 94312 98765',
          email: 'alok.patna@example.com',
        },
        items: [
          {
            productId: 'prod-dream-titan-4080',
            productName: 'Dream Titan RTX 4080 Super Custom Gaming Rig',
            brandName: 'Dream Computer Signature Build',
            variantId: 'var-titan-v1',
            sku: 'DC-PC-TITAN-32G-1T',
            selectedAttributes: { ram: '32GB DDR5', storage: '1TB Gen4 NVMe SSD' },
            quantity: 1,
            price: 224990,
          },
        ],
        estimatedTotal: 224990,
        bookingStatus: 'New',
        deliveryPreference: 'delivery',
        bookingSource: 'product_direct',
        whatsappHandoffAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        adminNotes: 'Requested quote for adding Lian Li Strimer Plus V2 cables.',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
    ]);
  }
  if (force || !getLocalCollection('inventoryLogs')) {
    setLocalCollection('inventoryLogs', [
      {
        id: 'log-1',
        productId: 'prod-rog-strix-g16',
        productName: 'ASUS ROG Strix G16 (2026 Gaming Edition)',
        sku: 'DC-ROG-G16-16G-1T-4060',
        changeType: 'INITIAL_STOCK',
        quantityChange: 5,
        newStock: 5,
        reason: 'Store Opening Inventory Addition',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
      },
    ]);
  }
  if (force || !getLocalCollection('analyticsEvents')) {
    // Generate realistic initial analytics
    const sampleEvents = [];
    const eventTypes = ['page_view', 'product_view', 'add_to_booking_cart', 'whatsapp_click'];
    for (let i = 0; i < 45; i++) {
      const pastHours = Math.floor(Math.random() * 72);
      sampleEvents.push({
        id: `ev-${i}`,
        eventName: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        page: i % 2 === 0 ? '/' : '/products',
        productId: i % 3 === 0 ? 'prod-rog-strix-g16' : 'prod-dream-titan-4080',
        timestamp: new Date(Date.now() - pastHours * 3600000).toISOString(),
        device: i % 3 === 0 ? 'mobile' : 'desktop',
        source: i % 4 === 0 ? 'google' : i % 4 === 1 ? 'direct' : 'instagram',
      });
    }
    setLocalCollection('analyticsEvents', sampleEvents);
  }
};

// Automatically ensure local storage has data
initializeDatabase(false);

/**
 * Universal Database Client
 */
export const dbService = {
  // GET ALL ITEMS
  async getAll(colName, filters = {}, sortBy = 'createdAt', sortOrder = 'desc') {
    if (isFirebaseConfigured && firestoreDb) {
      try {
        const colRef = collection(firestoreDb, colName);
        const q = query(colRef);
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          return docs;
        }
      } catch (err) {
        console.warn(`Firestore read fallback for ${colName}:`, err);
      }
    }

    // Local Storage Fallback
    const items = getLocalCollection(colName) || [];
    let filtered = [...items];

    // Apply basic filtering if specified
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        filtered = filtered.filter((item) => item[key] === val);
      }
    });

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        const valA = a[sortBy] ?? '';
        const valB = b[sortBy] ?? '';
        if (sortOrder === 'asc') return valA > valB ? 1 : -1;
        return valA < valB ? 1 : -1;
      });
    }

    return filtered;
  },

  // GET BY ID
  async getById(colName, id) {
    if (isFirebaseConfigured && firestoreDb) {
      try {
        const docRef = doc(firestoreDb, colName, id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() };
        }
      } catch (err) {
        console.warn(`Firestore getById fallback for ${colName}/${id}:`, err);
      }
    }

    const items = getLocalCollection(colName) || [];
    return items.find((item) => item.id === id) || null;
  },

  // GET BY SLUG
  async getBySlug(colName, slug) {
    if (isFirebaseConfigured && firestoreDb) {
      try {
        const colRef = collection(firestoreDb, colName);
        const q = query(colRef, where('slug', '==', slug), firestoreLimit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const d = snapshot.docs[0];
          return { id: d.id, ...d.data() };
        }
      } catch (err) {
        console.warn(`Firestore getBySlug fallback for ${colName}/${slug}:`, err);
      }
    }

    const items = getLocalCollection(colName) || [];
    return items.find((item) => item.slug === slug) || null;
  },

  // CREATE ITEM
  async create(colName, data) {
    const timestamp = new Date().toISOString();
    const itemData = {
      ...data,
      createdAt: data.createdAt || timestamp,
      updatedAt: timestamp,
    };

    if (isFirebaseConfigured && firestoreDb) {
      try {
        const colRef = collection(firestoreDb, colName);
        const docRef = await addDoc(colRef, {
          ...itemData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return { id: docRef.id, ...itemData };
      } catch (err) {
        console.warn(`Firestore create fallback for ${colName}:`, err);
      }
    }

    const items = getLocalCollection(colName) || [];
    const newId = data.id || `${colName.slice(0, 4)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newItem = { id: newId, ...itemData };
    items.unshift(newItem);
    setLocalCollection(colName, items);
    return newItem;
  },

  // UPDATE ITEM
  async update(colName, id, updates) {
    const timestamp = new Date().toISOString();
    const cleanUpdates = {
      ...updates,
      updatedAt: timestamp,
    };

    if (isFirebaseConfigured && firestoreDb) {
      try {
        const docRef = doc(firestoreDb, colName, id);
        await updateDoc(docRef, cleanUpdates);
        return { id, ...cleanUpdates };
      } catch (err) {
        console.warn(`Firestore update fallback for ${colName}/${id}:`, err);
      }
    }

    const items = getLocalCollection(colName) || [];
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...cleanUpdates };
      setLocalCollection(colName, items);
      return items[index];
    }
    return null;
  },

  // DELETE ITEM
  async deleteItem(colName, id) {
    if (isFirebaseConfigured && firestoreDb) {
      try {
        const docRef = doc(firestoreDb, colName, id);
        await deleteDoc(docRef);
        return true;
      } catch (err) {
        console.warn(`Firestore delete fallback for ${colName}/${id}:`, err);
      }
    }

    const items = getLocalCollection(colName) || [];
    const filtered = items.filter((item) => item.id !== id);
    setLocalCollection(colName, filtered);
    return true;
  },

  // RECORD INVENTORY ADJUSTMENT
  async adjustInventory(productId, variantId, sku, changeAmount, reason = 'Admin Adjustment') {
    const product = await this.getById('products', productId);
    if (!product) return false;

    let newStock = 0;
    if (variantId && product.variants && product.variants.length > 0) {
      const updatedVariants = product.variants.map((v) => {
        if (v.id === variantId) {
          const updated = Math.max(0, (v.stock || 0) + changeAmount);
          newStock = updated;
          return { ...v, stock: updated };
        }
        return v;
      });
      // Sum total product stock
      const totalStock = updatedVariants.reduce((sum, v) => sum + (v.stock || 0), 0);
      await this.update('products', productId, {
        variants: updatedVariants,
        stock: totalStock,
      });
    } else {
      newStock = Math.max(0, (product.stock || 0) + changeAmount);
      await this.update('products', productId, { stock: newStock });
    }

    // Add inventory log
    await this.create('inventoryLogs', {
      productId,
      productName: product.name,
      variantId: variantId || null,
      sku: sku || product.sku,
      quantityChange: changeAmount,
      newStock,
      reason,
      timestamp: new Date().toISOString(),
    });

    return newStock;
  },

  // RESET / RE-SEED
  resetToDefault() {
    initializeDatabase(true);
    return true;
  },
};
