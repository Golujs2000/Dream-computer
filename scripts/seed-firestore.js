/**
 * Live Cloud Firestore Seeder for Dream Computer (dream-computer-a5256)
 * Seeds all 18+ quotation categories, products, brands, settings, banners & testimonials.
 */

import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../src/services/firebase/config.js';
import {
  INITIAL_BRANDS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ATTRIBUTES,
  INITIAL_BANNERS,
  INITIAL_TESTIMONIALS,
  INITIAL_SETTINGS,
} from '../src/services/firebase/seedData.js';

async function seedLiveFirestore() {
  console.log('====================================================');
  console.log('🚀 SEEDING LIVE CLOUD FIRESTORE: dream-computer-a5256');
  console.log('====================================================\n');

  if (!db) {
    throw new Error('Firestore instance is not initialized. Check firebase configuration.');
  }

  // 1. Seed Categories
  console.log(`📦 1. Seeding ${INITIAL_CATEGORIES.length} Categories...`);
  for (const cat of INITIAL_CATEGORIES) {
    await setDoc(doc(db, 'categories', cat.id), cat, { merge: true });
    console.log(`   ✓ Category: ${cat.name} (${cat.id})`);
  }

  // 2. Seed Brands
  console.log(`\n🏷️ 2. Seeding ${INITIAL_BRANDS.length} Brands...`);
  for (const b of INITIAL_BRANDS) {
    await setDoc(doc(db, 'brands', b.id), b, { merge: true });
    console.log(`   ✓ Brand: ${b.name} (${b.id})`);
  }

  // 3. Seed Products
  console.log(`\n💻 3. Seeding ${INITIAL_PRODUCTS.length} Products...`);
  for (const prod of INITIAL_PRODUCTS) {
    await setDoc(doc(db, 'products', prod.id), prod, { merge: true });
    console.log(`   ✓ Product: ${prod.name} (${prod.id})`);
  }

  // 4. Seed Attributes
  console.log(`\n⚙️ 4. Seeding ${INITIAL_ATTRIBUTES.length} Attributes...`);
  for (const attr of INITIAL_ATTRIBUTES) {
    await setDoc(doc(db, 'attributes', attr.id), attr, { merge: true });
    console.log(`   ✓ Attribute: ${attr.name} (${attr.id})`);
  }

  // 5. Seed Banners
  console.log(`\n🎨 5. Seeding ${INITIAL_BANNERS.length} Banners...`);
  for (const ban of INITIAL_BANNERS) {
    await setDoc(doc(db, 'banners', ban.id), ban, { merge: true });
    console.log(`   ✓ Banner: ${ban.title} (${ban.id})`);
  }

  // 6. Seed Testimonials
  console.log(`\n💬 6. Seeding ${INITIAL_TESTIMONIALS.length} Testimonials...`);
  for (const t of INITIAL_TESTIMONIALS) {
    await setDoc(doc(db, 'testimonials', t.id), t, { merge: true });
    console.log(`   ✓ Testimonial: ${t.customerName} (${t.id})`);
  }

  // 7. Seed Settings
  console.log(`\n📍 7. Seeding General Store Settings...`);
  await setDoc(doc(db, 'settings', 'general'), INITIAL_SETTINGS, { merge: true });
  console.log(`   ✓ Settings: Dream Computer store profile & contact info.`);

  // 8. Clean up test document
  try {
    await deleteDoc(doc(db, 'system_test', 'ping'));
  } catch (_) {}

  // 9. Verification
  console.log('\n====================================================');
  console.log('🔍 VERIFYING LIVE CLOUD FIRESTORE COLLECTIONS...');
  console.log('====================================================');
  const collectionsToCheck = ['categories', 'brands', 'products', 'attributes', 'banners', 'testimonials', 'settings'];
  for (const colName of collectionsToCheck) {
    const snap = await getDocs(collection(db, colName));
    console.log(`   ✓ Collection '${colName}': ${snap.size} document(s) in cloud`);
  }

  console.log('\n🎉 ALL COLLECTIONS SUCCESSFULLY SEEDED TO LIVE FIRESTORE!');
  process.exit(0);
}

seedLiveFirestore().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
