import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, CheckCircle2, XCircle, Trash2, Plus, Star, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { dbService } from '../../services/firebase/db';

export const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    location: 'Patna',
    rating: 5,
    date: 'Today',
    comment: '',
    verifiedBooking: true,
    approved: true,
  });

  const loadTestimonials = async () => {
    const data = await dbService.getAll('testimonials');
    setTestimonials(data || []);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleToggleApprove = async (t) => {
    await dbService.update('testimonials', t.id, { approved: !t.approved });
    toast.success(`Review ${!t.approved ? 'approved' : 'hidden'}`);
    loadTestimonials();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this review?')) {
      await dbService.deleteItem('testimonials', id);
      toast.success('Review deleted');
      loadTestimonials();
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.comment) return;

    await dbService.create('testimonials', formData);
    toast.success('Testimonial added');
    setModalOpen(false);
    loadTestimonials();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            CUSTOMER REVIEWS & TESTIMONIALS
          </h1>
          <p className="text-xs text-[#8B929E] mt-1">
            Review approval queue and verified customer feedback management.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 shadow-glow-subtle self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Verified Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
              t.approved
                ? 'bg-[#121826] border-[#303746]'
                : 'bg-[#121826]/40 border-amber-800/40 opacity-75'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase font-rajdhani px-2 py-0.5 rounded ${
                    t.approved
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                  }`}
                >
                  {t.approved ? 'Live on Store' : 'Pending Approval'}
                </span>
              </div>

              <p className="text-xs text-[#B7BBC5] italic font-inter leading-relaxed">
                "{t.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#303746]/60 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#F5F5F7] font-rajdhani">{t.customerName}</div>
                <div className="text-[10px] text-[#8B929E]">{t.location}</div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleApprove(t)}
                  className={`p-1.5 rounded border text-xs ${
                    t.approved
                      ? 'bg-[#191F2D] text-amber-400 border-[#303746]'
                      : 'bg-[#BEF8A1] text-[#0A101E] border-transparent font-bold'
                  }`}
                  title={t.approved ? 'Hide from storefront' : 'Approve for storefront'}
                >
                  {t.approved ? 'Hide' : 'Approve'}
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 bg-[#191F2D] text-red-400 rounded border border-[#303746]"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleAddReview}
            className="w-full max-w-md bg-[#121826] border border-[#303746] rounded-2xl p-6 shadow-2xl space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#303746]">
              <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
                Add Customer Review
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
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full bg-[#191F2D] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Location in Patna
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Boring Road, Patna"
                className="w-full bg-[#191F2D] border border-[#303746] rounded p-2 text-xs text-[#F5F5F7]"
              />
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Review Text *
              </label>
              <textarea
                rows={3}
                required
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
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
                Add Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
