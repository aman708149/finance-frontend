
'use client'
import React, { useState } from 'react';
import {
  Users, TrendingUp, Wallet, BarChart3,
  Search, Filter, Plus, Eye,
  PieChart, ArrowUpRight, Briefcase,
  Landmark, Coins, Sparkles,
  Calendar, Download, ChevronRight, Bell, Settings,
  HelpCircle, LogOut, Activity
} from 'lucide-react';

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock investor data
  const investors = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', totalInvested: 1250000, returns: 18.5, risk: 'Moderate', investments: { gold: 250000, silver: 150000, stocks: 500000, crypto: 350000 } },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', totalInvested: 875000, returns: 22.3, risk: 'High', investments: { gold: 100000, silver: 75000, stocks: 400000, crypto: 300000 } },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', totalInvested: 2100000, returns: 15.2, risk: 'Conservative', investments: { gold: 600000, silver: 400000, stocks: 800000, crypto: 300000 } },
    { id: 4, name: 'Neha Gupta', email: 'neha@example.com', totalInvested: 450000, returns: 28.7, risk: 'Aggressive', investments: { gold: 50000, silver: 50000, stocks: 150000, crypto: 200000 } },
  ];

  // Asset classes
  const assetClasses = [
    { name: 'Gold', icon: Coins, value: '₹42.5L', change: '+5.2%', color: 'from-amber-500 to-yellow-600' },
    { name: 'Silver', icon: Sparkles, value: '₹18.3L', change: '+3.8%', color: 'from-gray-400 to-gray-500' },
    { name: 'Stocks', icon: TrendingUp, value: '₹85.6L', change: '+12.4%', color: 'from-emerald-500 to-teal-600' },
    { name: 'Crypto', icon: Landmark, value: '₹32.1L', change: '+8.7%', color: 'from-purple-500 to-pink-600' },
  ];

  // Stats cards
  const stats = [
    { title: 'Total Investors', value: '24', change: '+12%', icon: Users },
    { title: 'AUM', value: '₹178.5L', change: '+18.2%', icon: Wallet },
    { title: 'Total Returns', value: '₹32.8L', change: '+24.5%', icon: BarChart3 },
    { title: 'Active Portfolios', value: '42', change: '+8%', icon: PieChart },
  ];

  const filteredInvestors = investors.filter(investor =>
    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white  dark:bg-black text-dark dark:text-dark-light">

      {/* Main Content */}
      <div>
        {/* Dashboard Content */}
        <main className="p-8">
          {/* Welcome Banner */}
          <div className="mb-8 bg-linear-to-r from-primary to-secondary rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-50"></div>
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 animate-slideInRight">Welcome back, Partner 👋</h2>
                <p className="text-white/90">Track your investors, manage portfolios, and monitor performance in real-time.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm">
                  <Plus className="w-4 h-4" />
                  Add Investor
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm border border-white/20">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-success text-sm font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-dark dark:text-dark-light mb-1">{stat.value}</h3>
                <p className="text-white-dark text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Asset Distribution & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Asset Classes */}
            <div className="lg:col-span-2 bg-white dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark dark:text-dark-light">Asset Distribution</h3>
                <button className="text-primary text-sm hover:text-primary/80 transition-colors flex items-center gap-1">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {assetClasses.map((asset, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-black/5 dark:bg-white/5 rounded-xl">
                    <div className={`w-10 h-10 bg-linear-to-r ${asset.color} rounded-lg flex items-center justify-center`}>
                      <asset.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-dark dark:text-dark-light font-medium">{asset.name}</span>
                        <span className="text-success text-sm">{asset.change}</span>
                      </div>
                      <span className="text-white-dark text-sm">{asset.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-dark dark:text-dark-light mb-4">Portfolio Performance</h3>
              <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
                  <p className="text-white-dark text-sm">+24.8% YTD Return</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white-dark">This Month</span>
                  <span className="text-success">+8.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white-dark">Last Month</span>
                  <span className="text-success">+5.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investors Table */}
          <div className="bg-white dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/20 dark:border-white/10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-lg font-semibold text-dark dark:text-dark-light">Investor Portfolio Details</h3>
                <button className="text-primary text-sm hover:text-primary/80 transition-colors flex items-center gap-1">
                  View All Investors
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark dark:text-white-dark">Investor</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark dark:text-white-dark">Total Invested</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark dark:text-white-dark">Returns</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark dark:text-white-dark">Risk Profile</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark dark:text-white-dark">Asset Allocation</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark dark:text-white-dark">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20 dark:divide-white/10">
                  {filteredInvestors.map((investor) => (
                    <tr key={investor.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-dark dark:text-dark-light font-medium">{investor.name}</p>
                          <p className="text-white-dark text-sm">{investor.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-dark dark:text-dark-light font-medium">₹{investor?.totalInvested.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-success">
                          <ArrowUpRight className="w-4 h-4" />
                          <span className="font-medium">{investor.returns}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${investor.risk === 'High' ? 'bg-danger/10 text-danger' :
                            investor.risk === 'Moderate' ? 'bg-warning/10 text-warning' :
                              investor.risk === 'Aggressive' ? 'bg-info/10 text-info' :
                                'bg-success/10 text-success'
                          }`}>
                          {investor.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(investor.investments).map(([key, value]) => (
                            value > 0 && (
                              <span key={key} className="text-xs text-white-dark">
                                {key}: ₹{typeof value === 'number' ? value.toLocaleString() : value}
                              </span>
                            )
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-white-dark" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h3 className="text-lg font-semibold text-dark dark:text-dark-light">Recent Investor Activity</h3>
              <div className="flex items-center gap-2 text-sm text-white-dark">
                <Calendar className="w-4 h-4" />
                <span>Last 30 days</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { investor: 'Rajesh Kumar', action: 'Invested in Gold', amount: '₹2,50,000', time: '2 hours ago', type: 'buy' },
                { investor: 'Priya Sharma', action: 'Added to Crypto Portfolio', amount: '₹1,00,000', time: '5 hours ago', type: 'buy' },
                { investor: 'Amit Patel', action: 'Claimed Dividends', amount: '₹45,000', time: '1 day ago', type: 'claim' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'buy' ? 'bg-success' : 'bg-info'}`}></div>
                    <div>
                      <p className="text-dark dark:text-dark-light text-sm font-medium">{activity.investor}</p>
                      <p className="text-white-dark text-xs">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-success text-sm font-medium">{activity.amount}</p>
                    <p className="text-white-dark text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}