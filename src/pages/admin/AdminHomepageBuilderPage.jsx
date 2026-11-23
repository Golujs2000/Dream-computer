import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Plus, Edit, Trash2, X, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';

export const AdminHomepageBuilderPage = () => {
  const [banners, setBanners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    badge: 'NEW GENERATION HARDWARE',
    image: '',
    ctaText: 'Explore Products',
    ctaLink: '/products',
    secondaryCtaText: 'Build PC',
    secondaryCtaLink: '/custom-pc-builder',
    displayOrder: 1,
    status: 'active',
  });

  const loadBanners = async () => {
    const data = await dbService.getAll('banners', {}, 'displayOrder', 'asc');
    setBanners(data || []);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const openModal = (b = null) => {
    if (b) {
      setEditingBanner(b);
      setFormData(b);
    } else {
      setEditingBanner(null);
      setFormData({
        title: 'POWER YOUR NEXT LEVEL',
        subtitle: 'Premium Gaming PCs & Laptops in Patna',
        description: 'Assembled with genuine components at SP Verma Road, Patna.',
        badge: 'NEW HARDWARE',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1600&auto=format&fit=crop&q=80',
        ctaText: 'Explore Products',
        ctaLink: '/products',
        secondaryCtaText: 'Build PC',
        secondaryCtaLink: '/custom-pc-builder',
        displayOrder: banners.length + 1,
        status: 'active',
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingBanner) {
      await dbService.update('banners', editingBanner.id, formData);
      toast.success('Hero banner updated');
    } else {
      await dbService.create('banners', formData);
      toast.success('Hero banner created');
    }

    setModalOpen(false);
    loadBanners();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this homepage banner?')) {
      await dbService.deleteItem('banners', id);
      toast.success('Banner deleted');
      loadBanners();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            HOMEPAGE CMS & HERO BANNERS
          </h1>
          <p className="text-xs text-[#8B929E] mt-1">
            Update marketing headlines, CTAs, and hero banners displayed on the storefront.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="px-4 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 shadow-glow-subtle self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Hero Banner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-[#121826] border border-[#303746] rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-48 bg-[#0A101E]">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-[#BEF8A1] text-[#0A101E] px-2 py-0.5 rounded text-[10px] font-bold uppercase font-rajdhani">
                {b.badge || 'PROMO'}
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-orbitron font-bold text-lg text-[#F5F5F7]">{b.title}</h3>
                <h4 className="font-rajdhani font-bold text-sm text-[#BEF8A1] mt-0.5">{b.subtitle}</h4>
                <p className="text-xs text-[#8B929E] mt-2 line-clamp-2">{b.description}</p>
              </div>

              <div className="pt-3 border-t border-[#303746] flex items-center justify-between">
                <div className="text-xs text-[#B7BBC5]">Order: #{b.displayOrder}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(b)}
                    className="p-1.5 bg-[#191F2D] text-[#BEF8A1] rounded border border-[#303746]"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 bg-[#191F2D] text-red-400 rounded border border-[#303746]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg bg-[#121826] border border-[#303746] rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#303746]">
              <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
                {editingBanner ? 'Edit Banner' : 'Create Banner'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#8B929E] hover:text-[#F5F5F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Main Headline *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Subheading
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Background Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="w-full bg-[#191F2D] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
                />
              </div>
              <div>
                <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                  Primary CTA Link
                </label>
                <input
                  type="text"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  className="w-full bg-[#191F2D] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#303746]">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-[#191F2D] text-[#8B929E] rounded text-xs font-rajdhani font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#BEF8A1] text-[#0A101E] rounded text-xs font-rajdhani font-bold uppercase"
              >
                Save Banner
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
