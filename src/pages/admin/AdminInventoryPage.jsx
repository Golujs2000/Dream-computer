import React, { useState, useEffect } from 'react';
import { Boxes, AlertTriangle, Search, Plus, Minus, History, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { formatDate } from '../../utils/formatters';

export const AdminInventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [adjustModal, setAdjustModal] = useState(null); // { product, variant }
  const [adjustAmount, setAdjustAmount] = useState(1);
  const [adjustType, setAdjustType] = useState('add'); // 'add' or 'deduct'
  const [adjustReason, setAdjustReason] = useState('Store Walk-in Delivery');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, logs] = await Promise.all([
        dbService.getAll('products', {}, 'stock', 'asc'),
        dbService.getAll('inventoryLogs', {}, 'timestamp', 'desc'),
      ]);
      setProducts(prods || []);
      setInventoryLogs(logs || []);
    } catch (err) {
      console.error('Failed to load inventory', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApplyAdjustment = async () => {
    if (!adjustModal) return;
    const { product, variant } = adjustModal;
    const delta = adjustType === 'add' ? Number(adjustAmount) : -Number(adjustAmount);

    try {
      await dbService.adjustInventory(
        product.id,
        variant?.id || null,
        variant?.sku || product.sku,
        delta,
        adjustReason
      );
      toast.success('Inventory updated successfully!');
      setAdjustModal(null);
      setAdjustAmount(1);
      loadData();
    } catch (err) {
      toast.error('Failed to adjust inventory');
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchLowStock = filterLowStock ? (p.stock || 0) <= 5 : true;
    return matchSearch && matchLowStock;
  });

  const lowStockCount = products.filter((p) => (p.stock || 0) <= 5).length;
  const outOfStockCount = products.filter((p) => (p.stock || 0) <= 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            INVENTORY & STOCK CONTROL
          </h1>
          <p className="text-xs text-[#8B929E] mt-1">
            Real-time stock tracking, variation counts, low-stock alerts, and audit trails.
          </p>
        </div>
      </div>

      {/* Stock Alerts Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">Low Stock Warning (&le; 5 units)</div>
            <div className="font-orbitron font-bold text-2xl text-amber-400 mt-1">
              {lowStockCount} Products
            </div>
          </div>
          <button
            onClick={() => setFilterLowStock(!filterLowStock)}
            className={`px-3 py-1.5 rounded text-xs font-rajdhani font-bold uppercase border transition-all ${
              filterLowStock
                ? 'bg-amber-500 text-black border-amber-400'
                : 'bg-[#191F2D] text-amber-400 border-[#303746]'
            }`}
          >
            {filterLowStock ? 'Show All' : 'Filter Alert'}
          </button>
        </div>

        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl">
          <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">Out of Stock Alert</div>
          <div className="font-orbitron font-bold text-2xl text-rose-400 mt-1">
            {outOfStockCount} Products
          </div>
        </div>

        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl">
          <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">Total Catalog Units</div>
          <div className="font-orbitron font-bold text-2xl text-[#BEF8A1] mt-1">
            {products.reduce((sum, p) => sum + (p.stock || 0), 0)} Units
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8B929E] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory by product name or SKU..."
            className="w-full bg-[#191F2D] border border-[#303746] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
          />
        </div>
      </div>

      {/* Inventory Stock Table */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#303746] bg-[#0A101E] text-[#8B929E] font-rajdhani uppercase font-bold">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Current Stock</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303746]/50">
              {filtered.map((p) => (
                <React.Fragment key={p.id}>
                  <tr className="hover:bg-[#191F2D]/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#F5F5F7]">
                      {p.name}
                      {p.hasVariants && (
                        <span className="ml-2 text-[10px] text-[#BEF8A1] uppercase font-rajdhani">
                          ({p.variants?.length} Variations)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-[#8B929E]">{p.sku}</td>
                    <td className="py-3 px-3 text-[#B7BBC5]">{p.categoryName}</td>
                    <td className="py-3 px-3 font-bold font-rajdhani text-sm text-[#F5F5F7]">
                      {p.stock || 0}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          (p.stock || 0) <= 0
                            ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                            : (p.stock || 0) <= 5
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                            : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        }`}
                      >
                        {(p.stock || 0) <= 0
                          ? 'Out of Stock'
                          : (p.stock || 0) <= 5
                          ? 'Low Stock'
                          : 'In Stock'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setAdjustModal({ product: p, variant: null })}
                        className="px-3 py-1.5 bg-[#191F2D] hover:bg-[#252e42] text-[#BEF8A1] border border-[#303746] rounded text-xs font-rajdhani font-bold uppercase"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>

                  {/* If product has variations, render variant sub-rows */}
                  {p.hasVariants &&
                    p.variants?.map((v) => (
                      <tr key={v.id} className="bg-[#0A101E]/40 text-[#B7BBC5]">
                        <td className="py-2 px-4 pl-10 text-[11px]">
                          ↳ Variation: {Object.entries(v.attributes || {}).map(([k, val]) => `${k.toUpperCase()}: ${val}`).join(' | ')}
                        </td>
                        <td className="py-2 px-3 font-mono text-[10px] text-[#8B929E]">{v.sku}</td>
                        <td className="py-2 px-3 text-[10px]">{p.categoryName}</td>
                        <td className="py-2 px-3 font-bold text-xs">{v.stock || 0}</td>
                        <td className="py-2 px-3 text-[10px]">
                          {(v.stock || 0) <= 2 ? (
                            <span className="text-amber-400 font-semibold">Low Variant</span>
                          ) : (
                            <span className="text-emerald-400 font-semibold">Available</span>
                          )}
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button
                            onClick={() => setAdjustModal({ product: p, variant: v })}
                            className="px-2 py-1 bg-[#121826] hover:bg-[#191F2D] text-[10px] font-rajdhani font-bold uppercase text-[#BEF8A1] border border-[#303746] rounded"
                          >
                            Adjust Variant
                          </button>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Audit Logs */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-[#BEF8A1]" />
          <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
            RECENT STOCK ADJUSTMENT LOGS
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#303746] text-[#8B929E] font-rajdhani uppercase font-bold">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Product</th>
                <th className="py-2 px-3">SKU</th>
                <th className="py-2 px-3">Adjustment</th>
                <th className="py-2 px-3">New Stock</th>
                <th className="py-2 px-3">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303746]/50">
              {inventoryLogs.slice(0, 10).map((log) => (
                <tr key={log.id} className="hover:bg-[#191F2D]/50">
                  <td className="py-2 px-3 text-[#8B929E]">{formatDate(log.timestamp)}</td>
                  <td className="py-2 px-3 font-semibold text-[#F5F5F7]">{log.productName}</td>
                  <td className="py-2 px-3 font-mono text-[#8B929E]">{log.sku}</td>
                  <td className="py-2 px-3 font-bold font-rajdhani">
                    <span className={log.quantityChange > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-bold">{log.newStock}</td>
                  <td className="py-2 px-3 text-[#B7BBC5]">{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {adjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121826] border border-[#303746] rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
              ADJUST INVENTORY
            </h3>
            <p className="text-xs text-[#8B929E]">
              {adjustModal.product.name}{' '}
              {adjustModal.variant && `(${adjustModal.variant.sku})`}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAdjustType('add')}
                className={`py-2 text-xs font-rajdhani font-bold uppercase rounded-lg border ${
                  adjustType === 'add'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                    : 'bg-[#191F2D] border-[#303746] text-[#8B929E]'
                }`}
              >
                + Add Units (Shipment)
              </button>
              <button
                type="button"
                onClick={() => setAdjustType('deduct')}
                className={`py-2 text-xs font-rajdhani font-bold uppercase rounded-lg border ${
                  adjustType === 'deduct'
                    ? 'bg-rose-950/60 border-rose-500 text-rose-400'
                    : 'bg-[#191F2D] border-[#303746] text-[#8B929E]'
                }`}
              >
                - Deduct Units (Sale/Damage)
              </button>
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-2.5 text-sm text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Reason for Adjustment *
              </label>
              <input
                type="text"
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder="e.g. New consignment arrived from distributor"
                className="w-full bg-[#191F2D] border border-[#303746] rounded-lg p-2.5 text-xs text-[#F5F5F7]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#303746]">
              <button
                onClick={() => setAdjustModal(null)}
                className="px-4 py-2 bg-[#191F2D] text-[#8B929E] rounded text-xs font-rajdhani font-bold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyAdjustment}
                className="px-5 py-2 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] rounded text-xs font-rajdhani font-bold uppercase shadow-glow-subtle"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
