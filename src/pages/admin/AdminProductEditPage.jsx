import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Layers,
  DollarSign,
  Cpu,
  Globe,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { slugify, generateSKU } from '../../utils/formatters';

export const AdminProductEditPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('basic'); // basic, pricing, images, inventory, variants, specs, seo, publish
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [attributesList, setAttributesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    brandId: '',
    brandName: '',
    categoryId: '',
    categoryName: '',
    basePrice: 0,
    baseMrp: 0,
    sku: '',
    stock: 10,
    shortDescription: '',
    description: '',
    images: [''],
    status: 'published',
    featured: false,
    bestSeller: false,
    hasVariants: false,
    variants: [],
    specifications: {},
    seo: {
      title: '',
      description: '',
      keywords: '',
    },
  });

  // Specs helper state
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  // Variants helper state
  const [newVariant, setNewVariant] = useState({
    sku: '',
    price: 0,
    mrp: 0,
    stock: 5,
    attributes: {},
    images: [''],
  });

  useEffect(() => {
    const init = async () => {
      try {
        const [cats, brnds, attrs] = await Promise.all([
          dbService.getAll('categories'),
          dbService.getAll('brands'),
          dbService.getAll('attributes'),
        ]);
        setCategories(cats || []);
        setBrands(brnds || []);
        setAttributesList(attrs || []);

        if (isEditing) {
          const existing = await dbService.getById('products', id);
          if (existing) {
            setFormData(existing);
          } else {
            toast.error('Product not found');
            navigate('/admin/products');
          }
        } else {
          // Defaults for new product
          setFormData((prev) => ({
            ...prev,
            sku: generateSKU('DC', 'GEN'),
            brandId: brnds?.[0]?.id || '',
            brandName: brnds?.[0]?.name || '',
            categoryId: cats?.[0]?.id || '',
            categoryName: cats?.[0]?.name || '',
          }));
        }
      } catch (err) {
        console.error('Failed to initialize edit studio', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id, isEditing, navigate]);

  // Handle Name change with auto slug
  const handleNameChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugify(name),
      seo: {
        ...prev.seo,
        title: `${name} in Patna | Dream Computer`,
      },
    }));
  };

  // Category select sync
  const handleCategoryChange = (catId) => {
    const cat = categories.find((c) => c.id === catId);
    setFormData((prev) => ({
      ...prev,
      categoryId: catId,
      categoryName: cat?.name || '',
    }));
  };

  // Brand select sync
  const handleBrandChange = (brandId) => {
    const brand = brands.find((b) => b.id === brandId);
    setFormData((prev) => ({
      ...prev,
      brandId: brandId,
      brandName: brand?.name || '',
    }));
  };

  // Images manipulation
  const handleAddImage = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const handleImageChange = (index, val) => {
    const updated = [...formData.images];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Specs manipulation
  const handleAddSpec = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [newSpecKey.trim()]: newSpecVal.trim(),
      },
    }));
    setNewSpecKey('');
    setNewSpecVal('');
  };

  const handleRemoveSpec = (key) => {
    const updated = { ...formData.specifications };
    delete updated[key];
    setFormData((prev) => ({ ...prev, specifications: updated }));
  };

  // Add Variant
  const handleAddVariantRow = () => {
    if (!newVariant.sku) {
      toast.error('Please enter a SKU for this variation');
      return;
    }
    const variantItem = {
      id: `var-${Date.now()}`,
      sku: newVariant.sku,
      price: Number(newVariant.price) || formData.basePrice,
      mrp: Number(newVariant.mrp) || formData.baseMrp,
      stock: Number(newVariant.stock) || 5,
      status: 'active',
      attributes: { ...newVariant.attributes },
      images: formData.images.filter(Boolean),
    };

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, variantItem],
    }));

    setNewVariant({
      sku: '',
      price: formData.basePrice,
      mrp: formData.baseMrp,
      stock: 5,
      attributes: {},
      images: [''],
    });

    toast.success('Variation added');
  };

  const handleRemoveVariant = (variantId) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== variantId),
    }));
  };

  // Save product
  const handleSaveProduct = async (status = null) => {
    if (!formData.name.trim()) {
      toast.error('Please provide a product title');
      setActiveTab('basic');
      return;
    }

    const payload = {
      ...formData,
      status: status || formData.status,
      basePrice: Number(formData.basePrice),
      baseMrp: Number(formData.baseMrp),
      stock: Number(formData.stock),
      images: formData.images.filter(Boolean),
    };

    try {
      if (isEditing) {
        await dbService.update('products', id, payload);
        toast.success('Product updated successfully!');
      } else {
        await dbService.create('products', payload);
        toast.success('Product created successfully!');
      }
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to save product', err);
      toast.error('Error saving product');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#303746] border-t-[#BEF8A1] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 rounded-lg bg-[#121826] text-[#8B929E] hover:text-[#F5F5F7] border border-[#303746]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-orbitron font-bold text-xl text-[#F5F5F7] uppercase">
              {isEditing ? `EDIT PRODUCT: ${formData.name}` : 'ADD NEW PRODUCT'}
            </h1>
            <p className="text-xs text-[#8B929E] mt-0.5">
              Patna Hardware Catalog Studio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSaveProduct('draft')}
            className="px-4 py-2 bg-[#121826] hover:bg-[#191F2D] text-[#B7BBC5] border border-[#303746] rounded-lg text-xs font-rajdhani font-bold uppercase transition-all"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSaveProduct('published')}
            className="px-5 py-2 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 shadow-glow-subtle transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Publish Product</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#303746]">
        {[
          { key: 'basic', label: '1. Basic Info' },
          { key: 'pricing', label: '2. Pricing' },
          { key: 'images', label: '3. Media & Images' },
          { key: 'inventory', label: '4. Inventory' },
          { key: 'variants', label: '5. Variations' },
          { key: 'specs', label: '6. Specifications' },
          { key: 'seo', label: '7. SEO' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3.5 py-2 text-xs font-rajdhani font-bold uppercase rounded-lg transition-all shrink-0 ${
              activeTab === tab.key
                ? 'bg-[#BEF8A1] text-[#0A101E] shadow-glow-subtle'
                : 'bg-[#121826] text-[#B7BBC5] hover:text-[#F5F5F7] border border-[#303746]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl p-6">
        {/* TAB 1: BASIC INFO */}
        {activeTab === 'basic' && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Product Title *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. ASUS ROG Strix G16 Gaming Laptop"
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                  Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs font-rajdhani font-semibold text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                  Brand *
                </label>
                <select
                  value={formData.brandId}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs font-rajdhani font-semibold text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs font-mono text-[#8B929E]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Short Highlight Snippet
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Key specs snippet shown on cards e.g. 165Hz FHD+, Intel i7, RTX 4060"
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Full Detailed Description
              </label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Complete overview of product, cooling capabilities, warranty, and store support..."
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-3 text-sm text-[#F5F5F7]"
              />
            </div>
          </div>
        )}

        {/* TAB 2: PRICING */}
        {activeTab === 'pricing' && (
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Base Selling Price (₹) *
              </label>
              <input
                type="number"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-base font-bold text-[#BEF8A1]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Base MRP (₹)
              </label>
              <input
                type="number"
                value={formData.baseMrp}
                onChange={(e) => setFormData({ ...formData, baseMrp: Number(e.target.value) })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-sm text-[#F5F5F7]"
              />
            </div>

            {formData.baseMrp > formData.basePrice && (
              <div className="p-3 bg-[#0A101E] border border-[#303746] rounded-lg text-xs text-[#BEF8A1]">
                Customer Discount:{' '}
                <strong>
                  {Math.round(((formData.baseMrp - formData.basePrice) / formData.baseMrp) * 100)}% OFF
                </strong>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IMAGES */}
        {activeTab === 'images' && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <h3 className="font-rajdhani font-bold text-sm uppercase text-[#F5F5F7]">
                Product Photography URLs
              </h3>
              <button
                type="button"
                onClick={handleAddImage}
                className="px-3 py-1 bg-[#191F2D] hover:bg-[#252e42] text-[#BEF8A1] rounded border border-[#303746] text-xs font-rajdhani font-bold"
              >
                + Add Another Image
              </button>
            </div>

            <div className="space-y-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs text-[#8B929E] font-mono w-6">#{idx + 1}</span>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs text-[#F5F5F7]"
                  />
                  {img && (
                    <img
                      src={img}
                      alt="Preview"
                      className="w-9 h-9 rounded object-cover bg-[#0A101E] border border-[#303746]"
                    />
                  )}
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-2 text-red-400 hover:bg-red-950/40 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Base SKU Code *
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-sm font-mono text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Available Stock Quantity (Patna Store) *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-sm text-[#F5F5F7]"
              />
            </div>
          </div>
        )}

        {/* TAB 5: VARIATIONS ENGINE */}
        {activeTab === 'variants' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#0A101E] border border-[#303746] rounded-xl">
              <div>
                <h4 className="font-rajdhani font-bold text-sm text-[#F5F5F7] uppercase">
                  Enable Multi-Attribute Variations
                </h4>
                <p className="text-xs text-[#8B929E]">
                  Allows customers to choose RAM, Storage, GPU, or Color variations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, hasVariants: !formData.hasVariants })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  formData.hasVariants ? 'bg-[#BEF8A1] justify-end' : 'bg-[#303746] justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-[#0A101E]" />
              </button>
            </div>

            {formData.hasVariants && (
              <div className="space-y-6">
                {/* Existing Variants Table */}
                <div>
                  <h4 className="text-xs font-rajdhani font-bold uppercase text-[#8B929E] mb-2">
                    Configured Variations ({formData.variants.length})
                  </h4>
                  {formData.variants.length > 0 ? (
                    <div className="border border-[#303746] rounded-lg overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0A101E] text-[#8B929E] font-rajdhani uppercase">
                          <tr>
                            <th className="p-3">SKU</th>
                            <th className="p-3">Attributes</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#303746]/50">
                          {formData.variants.map((v) => (
                            <tr key={v.id}>
                              <td className="p-3 font-mono text-[#BEF8A1]">{v.sku}</td>
                              <td className="p-3 text-[#F5F5F7]">
                                {Object.entries(v.attributes || {})
                                  .map(([k, val]) => `${k.toUpperCase()}: ${val}`)
                                  .join(' | ')}
                              </td>
                              <td className="p-3 font-bold font-rajdhani">{formatPrice(v.price)}</td>
                              <td className="p-3">{v.stock}</td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveVariant(v.id)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-[#8B929E] italic">No variations added yet.</p>
                  )}
                </div>

                {/* Add New Variant Box */}
                <div className="p-4 bg-[#191F2D] border border-[#303746] rounded-xl space-y-3">
                  <h4 className="font-rajdhani font-bold text-xs uppercase text-[#BEF8A1]">
                    + Add New Variation Combination
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#8B929E] uppercase mb-1">
                        Variant SKU *
                      </label>
                      <input
                        type="text"
                        value={newVariant.sku}
                        onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                        placeholder="e.g. DC-ROG-16G-1T"
                        className="w-full bg-[#0A101E] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#8B929E] uppercase mb-1">
                        Variant Price (₹)
                      </label>
                      <input
                        type="number"
                        value={newVariant.price}
                        onChange={(e) => setNewVariant({ ...newVariant, price: Number(e.target.value) })}
                        className="w-full bg-[#0A101E] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#8B929E] uppercase mb-1">
                        Stock Units
                      </label>
                      <input
                        type="number"
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })}
                        className="w-full bg-[#0A101E] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
                      />
                    </div>
                  </div>

                  {/* Attributes assignment */}
                  <div className="pt-2 border-t border-[#303746]/60">
                    <div className="text-xs font-rajdhani font-bold text-[#F5F5F7] mb-2 uppercase">
                      Select Attribute Values
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {attributesList.map((attr) => (
                        <div key={attr.id}>
                          <label className="block text-[10px] text-[#8B929E] uppercase mb-1">
                            {attr.name}
                          </label>
                          <select
                            value={newVariant.attributes[attr.slug] || ''}
                            onChange={(e) =>
                              setNewVariant({
                                ...newVariant,
                                attributes: {
                                  ...newVariant.attributes,
                                  [attr.slug]: e.target.value,
                                },
                              })
                            }
                            className="w-full bg-[#0A101E] border border-[#303746] rounded p-1.5 text-xs text-[#F5F5F7]"
                          >
                            <option value="">None</option>
                            {attr.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddVariantRow}
                    className="mt-2 px-4 py-2 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase rounded"
                  >
                    Save Variation to List
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: SPECIFICATIONS */}
        {activeTab === 'specs' && (
          <div className="space-y-6 max-w-3xl">
            <h4 className="font-rajdhani font-bold text-sm uppercase text-[#F5F5F7]">
              Technical Specifications Table
            </h4>

            {/* Existing Specs */}
            <div className="space-y-2">
              {Object.entries(formData.specifications || {}).map(([k, val]) => (
                <div
                  key={k}
                  className="flex items-center justify-between p-2.5 bg-[#0A101E] border border-[#303746] rounded-lg text-xs"
                >
                  <div className="w-1/3 font-semibold text-[#B7BBC5] font-rajdhani uppercase">{k}</div>
                  <div className="flex-1 text-[#F5F5F7] truncate px-3">{val}</div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(k)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Spec Row */}
            <div className="p-4 bg-[#191F2D] border border-[#303746] rounded-xl flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <label className="block text-[11px] text-[#8B929E] uppercase mb-1">
                  Feature / Component Key
                </label>
                <input
                  type="text"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  placeholder="e.g. Processor or Display or Warranty"
                  className="w-full bg-[#0A101E] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
                />
              </div>

              <div className="flex-1 w-full">
                <label className="block text-[11px] text-[#8B929E] uppercase mb-1">
                  Specification Value
                </label>
                <input
                  type="text"
                  value={newSpecVal}
                  onChange={(e) => setNewSpecVal(e.target.value)}
                  placeholder="e.g. Intel Core i7-14650HX 16 Cores"
                  className="w-full bg-[#0A101E] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
                />
              </div>

              <button
                type="button"
                onClick={handleAddSpec}
                className="px-4 py-2 bg-[#121826] hover:bg-[#BEF8A1] text-[#F5F5F7] hover:text-[#0A101E] border border-[#303746] rounded text-xs font-rajdhani font-bold uppercase shrink-0 transition-colors"
              >
                + Add Spec
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={formData.seo?.title || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, title: e.target.value },
                  })
                }
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.seo?.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, description: e.target.value },
                  })
                }
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-2.5 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.seo?.keywords || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, keywords: e.target.value },
                  })
                }
                placeholder="laptop patna, rtx 4060, gaming pc"
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs text-[#F5F5F7]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
