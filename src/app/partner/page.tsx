
'use client'
import React, { useState } from 'react';
import { 
  Users, TrendingUp, Wallet, BarChart3, 
  Search, Filter, Plus, Eye, MoreVertical,
  DollarSign, PieChart, ArrowUpRight, ArrowDownRight,
  Briefcase, Landmark, Coins, Sparkles, Award,
  Calendar, Download, ChevronRight, Bell, Settings,
  HelpCircle, LogOut, Star, Shield, Activity
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
    { title: 'Total Investors', value: '24', change: '+12%', icon: Users, color: 'blue' },
    { title: 'AUM', value: '₹178.5L', change: '+18.2%', icon: Wallet, color: 'emerald' },
    { title: 'Total Returns', value: '₹32.8L', change: '+24.5%', icon: BarChart3, color: 'purple' },
    { title: 'Active Portfolios', value: '42', change: '+8%', icon: PieChart, color: 'orange' },
  ];

  const filteredInvestors = investors.filter(investor => 
    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[80vh] overflow-y-auto bg-linear-to-br from-gray-900 via-gray-900 to-black">
    
      {/* Main Content */}
      <div>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search investors, portfolios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Filter className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">Partner Name</p>
                  <p className="text-xs text-gray-400">Premium Partner</p>
                </div>
                <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">PN</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Welcome Banner */}
          <div className="mb-8 bg-linear-to-r from-emerald-900/30 via-gray-800/30 to-transparent rounded-2xl border border-emerald-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Partner 👋</h2>
                <p className="text-gray-400">Track your investors, manage portfolios, and monitor performance in real-time.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Investor
                </button>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all flex items-center gap-2 border border-gray-700">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-500/10 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Asset Distribution & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Asset Classes */}
            <div className="lg:col-span-2 bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Asset Distribution</h3>
                <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors flex items-center gap-1">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {assetClasses.map((asset, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl">
                    <div className={`w-10 h-10 bg-linear-to-r ${asset.color} rounded-lg flex items-center justify-center`}>
                      <asset.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{asset.name}</span>
                        <span className="text-emerald-400 text-sm">{asset.change}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{asset.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Portfolio Performance</h3>
              <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin mb-4"></div>
                  <p className="text-gray-400 text-sm">+24.8% YTD Return</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">This Month</span>
                  <span className="text-emerald-400">+8.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Last Month</span>
                  <span className="text-emerald-400">+5.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investors Table */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Investor Portfolio Details</h3>
                <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors flex items-center gap-1">
                  View All Investors
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Investor</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Total Invested</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Returns</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Risk Profile</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Asset Allocation</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredInvestors.map((investor) => (
                    <tr key={investor.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{investor.name}</p>
                          <p className="text-gray-500 text-sm">{investor.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">₹{investor.totalInvested.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-emerald-400">
                          <ArrowUpRight className="w-4 h-4" />
                          <span className="font-medium">{investor.returns}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          investor.risk === 'High' ? 'bg-red-500/20 text-red-400' :
                          investor.risk === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                          investor.risk === 'Aggressive' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {investor.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {Object.entries(investor.investments).map(([key, value]) => (
                            value > 0 && (
                              <div key={key} className="text-xs text-gray-400">
                                {key}: ₹{typeof value === 'number' ? value.toLocaleString() : value}
                              </div>
                            )
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Investor Activity</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
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
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'buy' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                    <div>
                      <p className="text-white text-sm font-medium">{activity.investor}</p>
                      <p className="text-gray-400 text-xs">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 text-sm font-medium">{activity.amount}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
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