import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Phone, Clock, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { INITIAL_SETTINGS } from '../../services/firebase/seedData';

export const AdminSeoStorePage = () => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbService.getAll('settings').then((data) => {
      if (data && data.length > 0) {
        setSettings(data[0]);
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await dbService.update('settings', settings.id || 'main-settings', settings);
    toast.success('Store & Local SEO information updated!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-[#303746]">
        <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
          STORE INFORMATION & LOCAL SEO
        </h1>
        <p className="text-xs text-[#8B929E] mt-1">
          Configure physical address, WhatsApp integration number, business hours, and Google Maps location.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-[#121826] border border-[#303746] rounded-xl p-6 space-y-4 text-xs">
        <div>
          <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
            Store Name
          </label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            className="w-full bg-[#191F2D] border border-[#303746] rounded p-2.5 text-xs text-[#F5F5F7]"
          />
        </div>

        <div>
          <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
            Official Store Address (Patna, Bihar)
          </label>
          <textarea
            rows={2}
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full bg-[#191F2D] border border-[#303746] rounded p-2.5 text-xs text-[#F5F5F7]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
              WhatsApp Booking Number (Primary)
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-[#191F2D] border border-[#303746] rounded p-2.5 text-xs text-[#BEF8A1] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
              Store Calling Phone
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-[#191F2D] border border-[#303746] rounded p-2.5 text-xs text-[#F5F5F7] font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
            Business Hours
          </label>
          <input
            type="text"
            value={settings.hours}
            onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
            className="w-full bg-[#191F2D] border border-[#303746] rounded p-2.5 text-xs text-[#F5F5F7]"
          />
        </div>

        <div>
          <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
            Google Maps Iframe Embed Source URL
          </label>
          <input
            type="text"
            value={settings.googleMapsEmbed}
            onChange={(e) => setSettings({ ...settings, googleMapsEmbed: e.target.value })}
            className="w-full bg-[#191F2D] border border-[#303746] rounded p-2.5 text-xs text-[#8B929E]"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 shadow-glow-subtle"
          >
            <Save className="w-4 h-4" /> Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
};
