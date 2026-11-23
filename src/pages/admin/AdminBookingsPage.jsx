import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Eye,
  CheckCircle2,
  Clock,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';
import { formatPrice, formatDate } from '../../utils/formatters';
import { getWhatsAppUrl } from '../../services/whatsapp/whatsappService';

const STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Confirmed',
  'Processing',
  'Ready for Pickup',
  'Completed',
  'Cancelled',
];

export const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Status update state in modal
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await dbService.getAll('bookings', {}, 'createdAt', 'desc');
      setBookings(data || []);
    } catch (err) {
      console.error('Failed to load bookings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const openBookingModal = (b) => {
    setSelectedBooking(b);
    setEditStatus(b.bookingStatus);
    setEditNotes(b.adminNotes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedBooking) return;
    try {
      await dbService.update('bookings', selectedBooking.id, {
        bookingStatus: editStatus,
        adminNotes: editNotes,
      });
      toast.success('Booking status updated!');
      setSelectedBooking(null);
      loadBookings();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  // Export Bookings CSV
  const handleExportCSV = () => {
    if (bookings.length === 0) {
      toast.error('No bookings to export');
      return;
    }

    const headers = ['Booking ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Items', 'Est. Total', 'Status', 'Preference'];
    const rows = bookings.map((b) => [
      b.bookingId,
      new Date(b.createdAt).toLocaleDateString(),
      `"${b.customer?.name || ''}"`,
      b.customer?.phone || '',
      b.customer?.email || '',
      `"${b.items?.map((i) => `${i.productName} (x${i.quantity})`).join('; ') || ''}"`,
      b.estimatedTotal,
      b.bookingStatus,
      b.deliveryPreference || 'pickup',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dream_computer_bookings_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Bookings exported to CSV');
  };

  const filtered = bookings.filter((b) => {
    const term = search.toLowerCase();
    const matchSearch =
      b.bookingId?.toLowerCase().includes(term) ||
      b.customer?.name?.toLowerCase().includes(term) ||
      b.customer?.phone?.includes(term);
    const matchStatus = statusFilter ? b.bookingStatus === statusFilter : true;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            CUSTOMER BOOKINGS & ORDERS
          </h1>
          <p className="text-xs text-[#8B929E] mt-1">
            Track inquiries, update reservation statuses, and directly contact Patna customers.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-[#121826] hover:bg-[#191F2D] text-[#BEF8A1] border border-[#303746] rounded-lg text-xs font-rajdhani font-bold uppercase flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8B929E] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Booking ID, customer name, or phone..."
            className="w-full bg-[#191F2D] border border-[#303746] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#191F2D] border border-[#303746] rounded-lg px-3 py-2 text-xs font-rajdhani font-semibold text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#303746] bg-[#0A101E] text-[#8B929E] font-rajdhani uppercase font-bold">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3">Items Booked</th>
                <th className="py-3 px-3">Est. Total</th>
                <th className="py-3 px-3">Preference</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303746]/50">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-[#8B929E]">
                    Loading bookings...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-[#191F2D]/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#BEF8A1]">
                      {b.bookingId}
                    </td>
                    <td className="py-3 px-3 text-[#8B929E]">{formatDate(b.createdAt)}</td>
                    <td className="py-3 px-3 font-semibold text-[#F5F5F7]">{b.customer?.name}</td>
                    <td className="py-3 px-3 text-[#B7BBC5] font-mono">{b.customer?.phone}</td>
                    <td className="py-3 px-3 text-[#B7BBC5] max-w-[200px] truncate">
                      {b.items?.map((i) => i.productName).join(', ')}
                    </td>
                    <td className="py-3 px-3 font-bold font-rajdhani text-sm text-[#F5F5F7]">
                      {formatPrice(b.estimatedTotal)}
                    </td>
                    <td className="py-3 px-3 capitalize text-[#8B929E]">
                      {b.deliveryPreference || 'pickup'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#191F2D] text-[#BEF8A1] border border-[#BEF8A1]/30">
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openBookingModal(b)}
                          className="px-2.5 py-1 bg-[#191F2D] hover:bg-[#252e42] text-[#BEF8A1] rounded border border-[#303746] font-rajdhani font-bold uppercase text-[11px]"
                        >
                          Manage
                        </button>
                        <a
                          href={`https://wa.me/${b.customer?.phone?.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-[#BEF8A1] text-[#0A101E] rounded hover:scale-105 transition-all"
                          title="WhatsApp Customer"
                        >
                          <MessageSquare className="w-3 h-3 fill-current" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-[#8B929E]">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details & Status Update Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#121826] border border-[#303746] rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between p-5 border-b border-[#303746] bg-[#0A101E]">
              <div>
                <h3 className="font-orbitron font-bold text-base text-[#F5F5F7]">
                  BOOKING {selectedBooking.bookingId}
                </h3>
                <p className="text-xs text-[#8B929E]">Placed on {formatDate(selectedBooking.createdAt)}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1 text-[#8B929E] hover:text-[#F5F5F7] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
              {/* Customer Details */}
              <div className="p-4 bg-[#191F2D] border border-[#303746] rounded-xl space-y-2">
                <div className="font-rajdhani font-bold uppercase text-sm text-[#BEF8A1]">
                  Customer Contact Information
                </div>
                <div className="grid grid-cols-2 gap-2 text-[#B7BBC5]">
                  <div>Name: <strong className="text-[#F5F5F7]">{selectedBooking.customer?.name}</strong></div>
                  <div>Phone: <strong className="text-[#F5F5F7]">{selectedBooking.customer?.phone}</strong></div>
                  <div>Email: {selectedBooking.customer?.email || 'N/A'}</div>
                  <div>Preference: <strong className="capitalize text-[#BEF8A1]">{selectedBooking.deliveryPreference || 'pickup'}</strong></div>
                </div>

                {selectedBooking.customerNotes && (
                  <div className="pt-2 border-t border-[#303746] text-[#8B929E]">
                    Customer Note: <em className="text-[#F5F5F7]">"{selectedBooking.customerNotes}"</em>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <a
                    href={`tel:${selectedBooking.customer?.phone}`}
                    className="px-3 py-1.5 bg-[#0A101E] border border-[#303746] text-[#F5F5F7] hover:text-[#BEF8A1] rounded font-rajdhani font-bold uppercase flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Customer
                  </a>
                  <a
                    href={`https://wa.me/${selectedBooking.customer?.phone?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#BEF8A1] text-[#0A101E] rounded font-rajdhani font-bold uppercase flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" /> WhatsApp Chat
                  </a>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <div className="font-rajdhani font-bold uppercase text-xs text-[#8B929E]">
                  Reserved Products & Variations ({selectedBooking.items?.length || 0})
                </div>
                <div className="space-y-2">
                  {selectedBooking.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#0A101E] border border-[#303746] rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-[#F5F5F7]">{item.productName}</div>
                        {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                          <div className="text-[10px] text-[#8B929E] mt-0.5">
                            {Object.entries(item.selectedAttributes)
                              .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
                              .join(' • ')}
                          </div>
                        )}
                        <div className="text-[10px] text-[#8B929E] font-mono">SKU: {item.sku}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-rajdhani font-bold text-sm text-[#BEF8A1]">
                          {formatPrice(item.price)}
                        </div>
                        <div className="text-[10px] text-[#8B929E]">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 text-sm font-bold border-t border-[#303746]">
                  <span>Total Estimated Pipeline Value:</span>
                  <span className="font-orbitron text-[#BEF8A1]">
                    {formatPrice(selectedBooking.estimatedTotal)}
                  </span>
                </div>
              </div>

              {/* Update Status and Internal Notes */}
              <div className="p-4 bg-[#191F2D] border border-[#303746] rounded-xl space-y-3">
                <div className="font-rajdhani font-bold uppercase text-sm text-[#F5F5F7]">
                  Update Booking Lifecycle
                </div>

                <div>
                  <label className="block text-[11px] text-[#8B929E] uppercase mb-1">
                    Booking Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#0A101E] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#8B929E] uppercase mb-1">
                    Internal Store Notes
                  </label>
                  <textarea
                    rows={2}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="e.g. Customer will visit SP Verma Road on Saturday for unboxing..."
                    className="w-full bg-[#0A101E] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#303746] bg-[#0A101E] flex justify-end gap-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-[#191F2D] text-[#8B929E] rounded text-xs font-rajdhani font-bold uppercase"
              >
                Close
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-5 py-2 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] rounded text-xs font-rajdhani font-bold uppercase shadow-glow-subtle"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
