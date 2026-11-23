import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  CalendarCheck,
  Users,
  DollarSign,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { analyticsService } from '../../services/firebase/analyticsService';
import { formatPrice, formatDate } from '../../utils/formatters';

const PIE_COLORS = ['#BEF8A1', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

export const AdminDashboardPage = () => {
  const [timeRange, setTimeRange] = useState('all');
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const data = await analyticsService.getDashboardMetrics(timeRange);
        setMetrics(data);
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [timeRange]);

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 border-4 border-[#303746] border-t-[#BEF8A1] rounded-full animate-spin" />
      </div>
    );
  }

  const { kpi, trafficSources, deviceData, funnelData, recentBookings } = metrics;

  return (
    <div className="space-y-8">
      {/* Top Banner and Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            STORE OVERVIEW & LIVE METRICS
          </h1>
          <p className="text-xs text-[#8B929E] mt-1 font-inter">
            Real-time business performance for Dream Computer Patna
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Period:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#121826] border border-[#303746] rounded-lg text-xs font-rajdhani font-semibold text-[#F5F5F7] px-3 py-1.5 focus:outline-none focus:border-[#BEF8A1]"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div className="p-5 bg-[#121826] border border-[#303746] rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">Total Bookings</div>
            <div className="font-orbitron font-bold text-2xl text-[#F5F5F7] mt-1">
              {kpi.totalBookings}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{kpi.confirmedBookings} Confirmed</span>
            </div>
          </div>
          <div className="p-3 bg-[#191F2D] rounded-xl text-[#BEF8A1] border border-[#303746]">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Estimated Booking Value */}
        <div className="p-5 bg-[#121826] border border-[#303746] rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">Est. Pipeline Value</div>
            <div className="font-orbitron font-bold text-xl text-[#BEF8A1] mt-1 truncate max-w-[150px]">
              {formatPrice(kpi.totalBookingValue)}
            </div>
            <div className="text-[11px] text-[#8B929E] mt-1">Across all requests</div>
          </div>
          <div className="p-3 bg-[#191F2D] rounded-xl text-emerald-400 border border-[#303746]">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* WhatsApp Handoffs */}
        <div className="p-5 bg-[#121826] border border-[#303746] rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">WhatsApp Inquiries</div>
            <div className="font-orbitron font-bold text-2xl text-[#F5F5F7] mt-1">
              {kpi.whatsappClicks}
            </div>
            <div className="text-[11px] text-[#BEF8A1] mt-1">Direct store chats</div>
          </div>
          <div className="p-3 bg-[#191F2D] rounded-xl text-[#BEF8A1] border border-[#303746]">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="p-5 bg-[#121826] border border-[#303746] rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">Store Visitors</div>
            <div className="font-orbitron font-bold text-2xl text-[#F5F5F7] mt-1">
              {kpi.uniqueVisitors}
            </div>
            <div className="text-[11px] text-[#8B929E] mt-1">{kpi.pageViews} Page views</div>
          </div>
          <div className="p-3 bg-[#191F2D] rounded-xl text-blue-400 border border-[#303746]">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Secondary KPI Bar: Inventory & Conversion */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl flex items-center gap-4">
          <div className="p-2.5 bg-[#191F2D] text-amber-400 rounded-lg">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Catalog Size</div>
            <div className="text-lg font-bold font-orbitron text-[#F5F5F7]">
              {kpi.totalProducts} <span className="text-xs font-normal text-[#8B929E]">({kpi.activeProducts} Active)</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl flex items-center gap-4">
          <div className="p-2.5 bg-[#191F2D] text-rose-400 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Out of Stock Alert</div>
            <div className="text-lg font-bold font-orbitron text-rose-400">
              {kpi.outOfStockProducts} Products
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl flex items-center gap-4">
          <div className="p-2.5 bg-[#191F2D] text-[#BEF8A1] rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Booking Conversion</div>
            <div className="text-lg font-bold font-orbitron text-[#BEF8A1]">
              {kpi.conversionRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Funnel Bar Chart */}
        <div className="lg:col-span-8 bg-[#121826] border border-[#303746] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-orbitron font-bold text-sm text-[#F5F5F7] uppercase">
              CUSTOMER JOURNEY & BOOKING FUNNEL
            </h3>
            <span className="text-xs text-[#BEF8A1] font-rajdhani font-semibold">Live Events Flow</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" stroke="#8B929E" fontSize={11} />
                <YAxis dataKey="step" type="category" stroke="#8B929E" fontSize={11} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#191F2D', borderColor: '#303746', borderRadius: '8px' }}
                  labelStyle={{ color: '#F5F5F7', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" fill="#BEF8A1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Split Chart */}
        <div className="lg:col-span-4 bg-[#121826] border border-[#303746] rounded-xl p-6 flex flex-col justify-between">
          <h3 className="font-orbitron font-bold text-sm text-[#F5F5F7] uppercase mb-2">
            DEVICE BREAKDOWN
          </h3>

          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#191F2D', borderColor: '#303746', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-[#303746]/60">
            {deviceData.map((d, i) => (
              <div key={d.name}>
                <div className="text-[10px] text-[#8B929E] font-rajdhani uppercase">{d.name}</div>
                <div className="font-bold text-xs text-[#F5F5F7] mt-0.5">{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron font-bold text-base text-[#F5F5F7] uppercase">
            RECENT PRODUCT BOOKINGS
          </h3>
          <Link
            to="/admin/bookings"
            className="text-xs font-rajdhani font-bold text-[#BEF8A1] hover:underline flex items-center gap-1"
          >
            <span>Manage All Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#303746] text-[#8B929E] font-rajdhani uppercase font-bold">
                <th className="py-2.5 px-3">Booking ID</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Items</th>
                <th className="py-2.5 px-3">Est. Value</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303746]/50">
              {recentBookings.length > 0 ? (
                recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#191F2D]/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#BEF8A1]">{b.bookingId}</td>
                    <td className="py-3 px-3 font-semibold text-[#F5F5F7]">{b.customer.name}</td>
                    <td className="py-3 px-3 text-[#B7BBC5]">{b.customer.phone}</td>
                    <td className="py-3 px-3 text-[#B7BBC5] max-w-[200px] truncate">
                      {b.items?.[0]?.productName || 'Hardware items'}
                    </td>
                    <td className="py-3 px-3 font-bold font-rajdhani text-sm text-[#F5F5F7]">
                      {formatPrice(b.estimatedTotal)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#191F2D] text-[#BEF8A1] border border-[#BEF8A1]/30">
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to="/admin/bookings"
                        className="text-xs text-[#BEF8A1] hover:underline font-semibold"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-[#8B929E]">
                    No bookings logged for this period.
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
