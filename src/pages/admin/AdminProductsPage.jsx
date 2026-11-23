import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  Star,
  Flame,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { formatPrice } from '../../utils/formatters';

export const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        dbService.getAll('products', {}, 'createdAt', 'desc'),
        dbService.getAll('categories'),
      ]);
      setProducts(prods || []);
      setCategories(cats || []);
    } catch (err) {
      console.error('Failed to load products', err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await dbService.deleteItem('products', id);
      toast.success('Product deleted');
      loadProducts();
    }
  };

  const handleDuplicate = async (product) => {
    const copy = {
      ...product,
      id: undefined,
      name: `${product.name} (Copy)`,
      slug: `${product.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      sku: `${product.sku}-CPY`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await dbService.create('products', copy);
    toast.success('Product duplicated');
    loadProducts();
  };

  const handleToggleStatus = async (product) => {
    const newStatus = product.status === 'published' ? 'draft' : 'published';
    await dbService.update('products', product.id, { status: newStatus });
    toast.success(`Product ${newStatus === 'published' ? 'published' : 'saved as draft'}`);
    loadProducts();
  };

  const handleToggleFeatured = async (product) => {
    await dbService.update('products', product.id, { featured: !product.featured });
    toast.success('Featured status updated');
    loadProducts();
  };

  const handleToggleBestSeller = async (product) => {
    await dbService.update('products', product.id, { bestSeller: !product.bestSeller });
    toast.success('Best Seller status updated');
    loadProducts();
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter ? p.categoryId === categoryFilter : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            PRODUCT MANAGEMENT
          </h1>
          <p className="text-xs text-[#8B929E] mt-1">
            Manage store catalog, specifications, multi-attribute variations, and pricing.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="px-4 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase rounded-lg flex items-center justify-center gap-2 shadow-glow-subtle transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8B929E] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full bg-[#191F2D] border border-[#303746] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs font-rajdhani font-semibold text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#303746] bg-[#0A101E] text-[#8B929E] font-rajdhani uppercase font-bold">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Stock</th>
                <th className="py-3 px-3">Variations</th>
                <th className="py-3 px-3">Badges</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303746]/50">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-[#8B929E]">
                    Loading catalog items...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#191F2D]/50 transition-colors">
                    {/* Thumbnail & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || '/favicon.svg'}
                          alt={p.name}
                          className="w-10 h-10 rounded object-cover bg-[#0A101E] shrink-0 border border-[#303746]"
                        />
                        <div className="max-w-[220px]">
                          <div className="font-semibold text-[#F5F5F7] line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-[#8B929E]">{p.brandName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono text-[#B7BBC5]">{p.sku}</td>

                    <td className="py-3 px-3 text-[#B7BBC5]">{p.categoryName || 'General'}</td>

                    <td className="py-3 px-3 font-bold font-rajdhani text-sm text-[#BEF8A1]">
                      {formatPrice(p.basePrice)}
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          (p.stock || 0) > 0
                            ? 'text-emerald-400 bg-emerald-950/60'
                            : 'text-rose-400 bg-rose-950/60'
                        }`}
                      >
                        {p.stock || 0}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-[#B7BBC5]">
                      {p.hasVariants ? (
                        <span className="text-[#BEF8A1] font-semibold">
                          {p.variants?.length || 0} Variants
                        </span>
                      ) : (
                        <span>Single SKU</span>
                      )}
                    </td>

                    {/* Featured / Best Seller Badges */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleFeatured(p)}
                          className={`p-1 rounded ${
                            p.featured ? 'text-amber-400 bg-amber-950/40' : 'text-[#8B929E] hover:text-[#F5F5F7]'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleBestSeller(p)}
                          className={`p-1 rounded ${
                            p.bestSeller ? 'text-orange-400 bg-orange-950/40' : 'text-[#8B929E] hover:text-[#F5F5F7]'
                          }`}
                          title="Toggle Best Seller"
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                          p.status === 'published'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : 'bg-[#191F2D] text-[#8B929E] border border-[#303746]'
                        }`}
                      >
                        {p.status || 'published'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="p-1.5 bg-[#191F2D] hover:bg-[#252e42] text-[#B7BBC5] hover:text-[#BEF8A1] rounded border border-[#303746]"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-1.5 bg-[#191F2D] hover:bg-[#252e42] text-[#B7BBC5] hover:text-[#F5F5F7] rounded border border-[#303746]"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 bg-[#191F2D] hover:bg-red-950/60 text-[#8B929E] hover:text-red-400 rounded border border-[#303746]"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-[#8B929E]">
                    No products found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
