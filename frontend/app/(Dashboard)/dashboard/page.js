"use client";
import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Users,
  Calendar,
  Ticket,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Activity,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock Data
const mockData = {
  totalSales: '$2,450,000',
  totalEvents: 154,
  ticketsSold: '120,450',
  totalUsers: '50,230',
  salesTrend: '+12.5%',
  usersTrend: '+8.2%',
  salesChart: [
    { name: 'Jan', sales: 4200 },
    { name: 'Feb', sales: 3800 },
    { name: 'Mar', sales: 2500 },
    { name: 'Apr', sales: 4100 },
    { name: 'May', sales: 3100 },
    { name: 'Jun', sales: 4800 },
    { name: 'Jul', sales: 5200 },
  ],
  recentEvents: [
    { id: 1, name: 'Summer Music Fest', sales: 8500, status: 'Active', category: 'Music' },
    { id: 2, name: 'Tech Conference 2024', sales: 12000, status: 'Sold Out', category: 'Tech' },
    { id: 3, name: 'Art & Wine Expo', sales: 6000, status: 'Upcoming', category: 'Arts' },
  ],
  recentUsers: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', date: '2 hours ago', avatar: 'A' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', date: '5 hours ago', avatar: 'B' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', date: '1 day ago', avatar: 'C' },
  ],
};

const MetricCard = ({ title, value, trend, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`flex items-center gap-0.5 text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend}
          {trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        </span>
      )}
    </div>
    <div>
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black text-gray-900 tracking-tight">{value}</p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
            Overview
          </h1>
          <p className="text-gray-500 font-medium">Welcome back, here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/create-event"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Plus size={20} />
            Create Event
          </Link>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={mockData.totalSales}
          trend={mockData.salesTrend}
          icon={DollarSign}
          color="indigo"
          delay={0.1}
        />
        <MetricCard
          title="Tickets Sold"
          value={mockData.ticketsSold}
          trend="+15.3%"
          icon={Ticket}
          color="emerald"
          delay={0.2}
        />
        <MetricCard
          title="Total Events"
          value={mockData.totalEvents}
          icon={Calendar}
          color="orange"
          delay={0.3}
        />
        <MetricCard
          title="Total Users"
          value={mockData.totalUsers}
          trend={mockData.usersTrend}
          icon={Users}
          color="blue"
          delay={0.4}
        />
      </div>

      {/* Analytics Main Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Chart Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Sales Analytics</h2>
              <p className="text-gray-400 text-sm font-medium">Monthly revenue performance</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">7 Days</button>
              <button className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg shadow-md shadow-indigo-100">30 Days</button>
            </div>
          </div>

          <div className="h-[300px] w-full mt-4 flex items-end justify-between gap-4">
            {mockData.salesChart.map((item, idx) => {
              const height = (item.sales / 6000) * 100;
              return (
                <div key={item.name} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full flex justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.6 + (idx * 0.1) }}
                      className="w-full max-w-[40px] bg-indigo-50 rounded-t-xl group-hover:bg-indigo-600 transition-colors duration-300 relative"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        ${item.sales}
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Side Panel: Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-4 space-y-8"
        >
          {/* Recent Users */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-gray-900 tracking-tight">New Users</h3>
              <Link href="/dashboard/users" className="text-xs font-bold text-indigo-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {mockData.recentUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{user.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Health / Quick Stats */}
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 flex flex-col justify-between h-[200px] relative overflow-hidden">
            <div className="relative z-10">
              <Activity size={32} className="mb-4 text-indigo-200" />
              <p className="text-sm font-bold text-indigo-100 mb-1">System Health</p>
              <h4 className="text-2xl font-black">All Systems Functional</h4>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Table Section: Top Performing Events */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Top Performing Events</h2>
            <p className="text-gray-400 text-sm font-medium">A summary of your most successful events</p>
          </div>
          <Link href="/dashboard/events" className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">View All Events</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Event</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Category</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Sales</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Status</th>
                <th className="px-8 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockData.recentEvents.map(event => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-gray-900">{event.name}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-gray-900">${event.sales.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm
                      ${event.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                        event.status === 'Sold Out' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
