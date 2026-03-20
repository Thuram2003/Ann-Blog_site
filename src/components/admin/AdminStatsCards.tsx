import React from 'react';
import { TrendingUp, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function formatLargeNumber(value: number): string {
  // Requirement: strict integers up to 100,000.
  if (value < 100000) return value.toLocaleString();
  
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  return (value / 1000).toFixed(1) + 'K';
}

interface AdminStatsCardsProps {
  totalPosts: number;
  totalViews: number;
  featuredPosts: number;
  breakingNews: number;
  thisMonthPosts: number;
}

export function AdminStatsCards({ 
  totalPosts, 
  totalViews, 
  featuredPosts, 
  breakingNews, 
  thisMonthPosts
}: AdminStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-0">
      
      {/* Posts */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-slate-100 group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium tracking-wide">Total Posts</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{formatLargeNumber(totalPosts)}</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 text-xs font-medium">
          <span className="text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md">+{formatLargeNumber(thisMonthPosts)}</span>
          <span className="text-slate-400">added this month</span>
        </div>
      </div>

      {/* Views */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-slate-100 group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium tracking-wide">Total Views</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{formatLargeNumber(totalViews)}</p>
          </div>
          <div className="w-10 h-10 bg-amber-50 group-hover:bg-amber-100 rounded-lg flex items-center justify-center transition-colors">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-slate-400">All time traffic</span>
        </div>
      </div>

      {/* Featured */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-slate-100 group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium tracking-wide">Featured</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{formatLargeNumber(featuredPosts)}</p>
          </div>
          <div className="w-10 h-10 bg-green-50 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 text-xs font-medium">
          <span className="text-slate-400">Active on homepage</span>
        </div>
      </div>

      {/* Breaking Alerts */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-slate-100 group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium tracking-wide">Breaking</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{formatLargeNumber(breakingNews)}</p>
          </div>
          <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 text-xs font-medium">
          <span className="text-slate-400">Live emergency flags</span>
        </div>
      </div>
      
    </div>
  );
}
