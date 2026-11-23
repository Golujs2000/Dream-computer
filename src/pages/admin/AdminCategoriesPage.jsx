import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { slugify } from '../../utils/formatters';

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    displayOrder: 1,
    status: 'active',
  });

  const loadCategories = async () => {
    const data = await dbService.getAll('categories', {}, 'displayOrder', 'asc');
    setCategories(data || []);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openModal = (cat = null) => {
    if (cat) {
      setEditingCat(cat);
      setFormData(cat);
    } else {
      setEditingCat(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        displayOrder: categories.length + 1,
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

    if (editingCat) {
      await dbService.update('categories', editingCat.id, payload);
      toast.success('Category updated');
    } else {
      await dbService.create('categories', payload);
      toast.success('Category created');
    }

    setModalOpen(false);
    loadCategories();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      await dbService.deleteItem('categories', id);
      toast.success('Category deleted');
      loadCategories();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            HARDWARE CATEGORIES
          </h1>
          <p className="text-xs text-[#8B929E] mt-1">
            Organize catalog taxonomy, category banners, and store navigation.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 shadow-glow-subtle self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-[#121826] border border-[#303746] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#303746] bg-[#0A101E] text-[#8B929E] font-rajdhani uppercase font-bold">
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-3">Slug</th>
              <th className="py-3 px-3">Order</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#303746]/50">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-[#191F2D]/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.image || '/favicon.svg'}
                      alt={c.name}
                      className="w-9 h-9 rounded object-cover bg-[#0A101E] border border-[#303746]"
                    />
                    <div>
                      <div className="font-semibold text-[#F5F5F7]">{c.name}</div>
                      <div className="text-[10px] text-[#8B929E] line-clamp-1">{c.description}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-mono text-[#8B929E]">{c.slug}</td>
                <td className="py-3 px-3">{c.displayOrder}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950/60 text-emerald-400">
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => openModal(c)}
                      className="p-1.5 bg-[#191F2D] text-[#BEF8A1] rounded border border-[#303746]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
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
                {editingCat ? 'Edit Category' : 'Add Category'}
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
                Category Name *
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
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-2.5 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
