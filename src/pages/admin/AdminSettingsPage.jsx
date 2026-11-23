import React, { useState } from 'react';
import { Settings, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Database } from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { isFirebaseConfigured } from '../../services/firebase/config';

export const AdminSettingsPage = () => {
  const [resetting, setResetting] = useState(false);

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to re-seed the catalog? This will restore all default Dream Computer Patna products, variations, categories, and banners.'
      )
    ) {
      setResetting(true);
      dbService.resetToDefault();
      setTimeout(() => {
        setResetting(false);
        toast.success('Database re-seeded with official Patna catalog data!');
      }, 500);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-[#303746]">
        <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
          SYSTEM SETTINGS & SEEDER
        </h1>
        <p className="text-xs text-[#8B929E] mt-1">
          Diagnostics, Firebase cloud synchronization status, and database utilities.
        </p>
      </div>

      {/* Cloud Status */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl p-6 space-y-3">
        <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
          FIREBASE CLOUD BACKEND STATUS
        </h3>
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isFirebaseConfigured ? 'bg-emerald-400' : 'bg-blue-400 animate-pulse'
            }`}
          />
          <span className="text-sm font-rajdhani font-bold text-[#F5F5F7]">
            {isFirebaseConfigured
              ? 'Connected to Live Firebase Cloud Firestore & Storage'
              : 'Local High-Performance Persistence Engine Active (Ready for Deployment)'}
          </span>
        </div>
        <p className="text-xs text-[#8B929E]">
          {isFirebaseConfigured
            ? 'Production rules and authenticated operations are communicating with your Google Cloud Firestore project.'
            : 'All CRUD, variation selections, stock decrements, and WhatsApp flows are fully active in reactive offline-ready storage.'}
        </p>
      </div>

      {/* Database Reset & Seeding */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 text-amber-400">
          <Database className="w-5 h-5" />
          <h3 className="font-orbitron font-bold text-base uppercase">
            PATNA DEMO CATALOG RE-SEEDER
          </h3>
        </div>

        <p className="text-xs text-[#8B929E] leading-relaxed">
          Need to test the store with fresh sample data? Click below to populate all 8 hardware categories,
          ASUS ROG & Lenovo laptops, RTX 4080 custom rigs, NVMe SSDs, verified Patna testimonials, and hero banners.
        </p>

        <button
          onClick={handleReset}
          disabled={resetting}
          className="px-5 py-2.5 bg-[#191F2D] hover:bg-[#252e42] text-[#BEF8A1] border border-[#BEF8A1]/40 hover:border-[#BEF8A1] rounded-lg text-xs font-rajdhani font-bold uppercase flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${resetting ? 'animate-spin' : ''}`} />
          <span>{resetting ? 'Re-seeding Catalog...' : 'Re-Seed Dream Computer Catalog'}</span>
        </button>
      </div>
    </div>
  );
};
