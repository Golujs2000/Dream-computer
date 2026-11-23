import React, { useState, useEffect } from 'react';
import { Award, Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { slugify } from '../../utils/formatters';

export const AdminBrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    description: '',
    websiteUrl: '',
    displayOrder: 1,
    status: 'active',
  });

  const loadBrands = async () => {
    const data = await dbService.getAll('brands', {}, 'displayOrder', 'asc');
    setBrands(data || []);
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const openModal = (b = null) => {
    if (b) {
      setEditingBrand(b);
      setFormData(b);
    } else {
      setEditingBrand(null);
      setFormData({
        name: '',
        slug: '',
        logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80',
        description: '',
        websiteUrl: '',
        displayOrder: brands.length + 1,
        status: 'active',
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      ...formData,
      slug: formData.slug || slugify(formData.name),
      displayOrder: Number(formData.displayOrder),
    };

    if (editingBrand) {
      await dbService.update('brands', editingBrand.id, payload);
      toast.success('Brand updated');
    } else {
      await dbService.create('brands', payload);
      toast.success('Brand created');
    }

    setModalOpen(false);
    loadBrands();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete brand "${name}"?`)) {
      await dbService.deleteItem('brands', id);
      toast.success('Brand deleted');
      loadBrands();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            BRAND PARTNERS & LOGOS
          </h1>
          <p className="text-xs text-[#8B929E] mt-1">
            Configure authorized hardware manufacturers displayed on store pages.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 shadow-glow-subtle self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Brand
        </button>
      </div>

      <div className="bg-[#121826] border border-[#303746] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#303746] bg-[#0A101E] text-[#8B929E] font-rajdhani uppercase font-bold">
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-3">Website</th>
              <th className="py-3 px-3">Order</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#303746]/50">
            {brands.map((b) => (
              <tr key={b.id} className="hover:bg-[#191F2D]/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.logo || '/favicon.svg'}
                      alt={b.name}
                      className="w-8 h-8 rounded-full object-cover bg-[#0A101E] border border-[#303746]"
                    />
                    <div className="font-semibold text-[#F5F5F7]">{b.name}</div>
                  </div>
                </td>
                <td className="py-3 px-3 text-[#BEF8A1] truncate max-w-[200px]">
                  {b.websiteUrl || '—'}
                </td>
                <td className="py-3 px-3">{b.displayOrder}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950/60 text-emerald-400">
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => openModal(b)}
                      className="p-1.5 bg-[#191F2D] text-[#BEF8A1] rounded border border-[#303746]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id, b.name)}
                      className="p-1.5 bg-[#191F2D] text-red-400 rounded border border-[#303746]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="w-full max-w-md bg-[#121826] border border-[#303746] rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#303746]">
              <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
                {editingBrand ? 'Edit Brand' : 'Add Brand'}
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
                Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: slugify(e.target.value) })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-2.5 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Logo URL
              </label>
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-2.5 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Website URL
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-2.5 text-xs text-[#F5F5F7]"
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
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
