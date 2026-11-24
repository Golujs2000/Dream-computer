import React, { useState } from 'react';
import { Settings, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Database, CloudUpload } from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { isFirebaseConfigured, firebaseConfig } from '../../services/firebase/config';

export const AdminSettingsPage = () => {
  const [resetting, setResetting] = useState(false);
  const [syncingCloud, setSyncingCloud] = useState(false);

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

  const handleSyncToFirestore = async () => {
    if (!window.confirm('Upload all default products, categories, brands, and settings to live Firebase Cloud Firestore (dream-computer-a5256)?')) {
      return;
    }
    setSyncingCloud(true);
    try {
      await dbService.syncToCloudFirestore();
      toast.success('Official catalog successfully uploaded to live Firebase Firestore!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to sync to Firestore. Check security rules or credentials.');
    } finally {
      setSyncingCloud(false);
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
      <div className="bg-[#121826] border border-[#303746] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
            FIREBASE CLOUD BACKEND STATUS
          </h3>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#191F2D] border border-[#303746] text-[#BEF8A1]">
            Project: {firebaseConfig.projectId}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isFirebaseConfigured ? 'bg-emerald-400' : 'bg-blue-400 animate-pulse'
            }`}
          />
          <span className="text-sm font-rajdhani font-bold text-[#F5F5F7]">
            {isFirebaseConfigured
              ? `Connected to Live Firebase Cloud (${firebaseConfig.projectId})`
              : 'Local High-Performance Persistence Engine Active'}
          </span>
        </div>
        <p className="text-xs text-[#8B929E]">
          {isFirebaseConfigured
            ? `Production rules and operations are communicating with ${firebaseConfig.projectId}. Cloud Storage bucket: ${firebaseConfig.storageBucket}`
            : 'All CRUD, variation selections, stock decrements, and WhatsApp flows are fully active.'}
        </p>

        {isFirebaseConfigured && (
          <div className="pt-2 border-t border-[#303746]/60">
            <button
              onClick={handleSyncToFirestore}
              disabled={syncingCloud}
              className="px-4 py-2 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 shadow-glow-subtle transition-all"
            >
              <CloudUpload className={`w-4 h-4 ${syncingCloud ? 'animate-bounce' : ''}`} />
              <span>{syncingCloud ? 'Uploading to Firestore...' : 'Upload Official Catalog to Live Firestore'}</span>
            </button>
          </div>
        )}
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
