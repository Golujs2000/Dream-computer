import React, { useState, useEffect } from 'react';
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
import { BarChart3, TrendingUp, Users, Smartphone, Globe, MessageSquare } from 'lucide-react';
import { analyticsService } from '../../services/firebase/analyticsService';
import { formatPrice } from '../../utils/formatters';

const COLORS = ['#BEF8A1', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

export const AdminAnalyticsPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [timeRange, setTimeRange] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const data = await analyticsService.getDashboardMetrics(timeRange);
        setMetrics(data);
      } catch (err) {
        console.error('Failed to load analytics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [timeRange]);

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#303746] border-t-[#BEF8A1] rounded-full animate-spin" />
      </div>
    );
  }

  const { kpi, trafficSources, deviceData, funnelData } = metrics;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#303746] gap-4">
        <div>
          <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase tracking-wide">
            TRAFFIC & BOOKING ANALYTICS
          </h1>
          <p className="text-xs text-[#8B929E] mt-1">
            Conversion funnels, WhatsApp outbound handoffs, and audience acquisition.
          </p>
        </div>

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

      {/* Traffic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl">
          <div className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Total Sessions</div>
          <div className="font-orbitron font-bold text-2xl text-[#F5F5F7] mt-1">{kpi.totalSessions}</div>
        </div>
        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl">
          <div className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Total Pageviews</div>
          <div className="font-orbitron font-bold text-2xl text-[#F5F5F7] mt-1">{kpi.pageViews}</div>
        </div>
        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl">
          <div className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">WhatsApp Inquiries</div>
          <div className="font-orbitron font-bold text-2xl text-[#BEF8A1] mt-1">{kpi.whatsappClicks}</div>
        </div>
        <div className="p-4 bg-[#121826] border border-[#303746] rounded-xl">
          <div className="text-xs text-[#8B929E] font-rajdhani uppercase font-bold">Booking Rate</div>
          <div className="font-orbitron font-bold text-2xl text-emerald-400 mt-1">{kpi.conversionRate}%</div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-[#121826] border border-[#303746] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron font-bold text-sm text-[#F5F5F7] uppercase">
            FULL STORE CONVERSION FUNNEL
          </h3>
          <span className="text-xs text-[#BEF8A1] font-rajdhani font-semibold">
            {kpi.uniqueVisitors} Unique Visitors → {kpi.confirmedBookings} Confirmed Orders
          </span>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="step" stroke="#8B929E" fontSize={11} />
              <YAxis stroke="#8B929E" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#191F2D', borderColor: '#303746', borderRadius: '8px' }}
                labelStyle={{ color: '#F5F5F7', fontWeight: 'bold' }}
              />
              <Bar dataKey="count" fill="#BEF8A1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Sources & Device Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-[#121826] border border-[#303746] rounded-xl p-6">
          <h3 className="font-orbitron font-bold text-sm text-[#F5F5F7] uppercase mb-4">
            TRAFFIC CHANNELS
          </h3>
          <div className="space-y-3">
            {trafficSources.map((src, i) => (
              <div key={src.name} className="flex items-center justify-between p-3 bg-[#0A101E] rounded-lg border border-[#303746]/50">
                <span className="text-xs font-rajdhani font-bold text-[#F5F5F7]">{src.name}</span>
                <span className="text-xs font-mono text-[#BEF8A1] font-bold">{src.value} Visits</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device breakdown */}
        <div className="bg-[#121826] border border-[#303746] rounded-xl p-6 flex flex-col justify-between">
          <h3 className="font-orbitron font-bold text-sm text-[#F5F5F7] uppercase mb-4">
            AUDIENCE DEVICE TYPE
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                  {deviceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#191F2D', borderColor: '#303746' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-[#303746]">
            {deviceData.map((d) => (
              <div key={d.name}>
                <div className="text-[10px] text-[#8B929E] font-rajdhani uppercase">{d.name}</div>
                <div className="font-bold text-xs text-[#F5F5F7]">{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
