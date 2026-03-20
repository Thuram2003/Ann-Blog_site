import React from 'react';
import { formatLargeNumber } from './AdminStatsCards';
import { Eye, Edit2, Trash2, Calendar, FileText } from 'lucide-react';
import type { Post } from '@/types';

interface AdminDataGridProps {
  posts: Post[];
  onView: (p: Post) => void;
  onEdit: (p: Post) => void;
  onDelete: (id: string) => void;
  deleteConfirm: string | null;
}

export function AdminDataGrid({ posts, onView, onEdit, onDelete, deleteConfirm }: AdminDataGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
           <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="font-semibold text-slate-900 text-lg mb-1">No posts found</h3>
        <p className="text-slate-500 text-sm">Try adjusting your search or active filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0 lg:rounded-xl lg:overflow-hidden lg:border lg:border-slate-200 lg:bg-white">
      {/* Desktop Header Row */}
      <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="col-span-5 text-xs font-bold uppercase tracking-wider text-slate-500">Post Details</div>
        <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-slate-500">Category</div>
        <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-slate-500">Performance</div>
        <div className="col-span-1 text-xs font-bold uppercase tracking-wider text-slate-500">Status</div>
        <div className="col-span-2 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Actions</div>
      </div>

      {/* Grid Elements (Rows on Desktop, Cards on Mobile) */}
      <div className="flex flex-col gap-4 lg:gap-0 lg:divide-y lg:divide-slate-100">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 lg:p-6 lg:border-none lg:shadow-none lg:rounded-none lg:grid lg:grid-cols-12 lg:items-center lg:gap-4 hover:bg-slate-50/80 transition-colors group"
          >
            {/* Post Details (Avatar & Title) */}
            <div className="col-span-5 flex items-center gap-4 mb-4 lg:mb-0">
              <img src={post.image} alt={post.title} className="w-16 h-16 rounded-lg object-cover border border-slate-100 shadow-sm" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 line-clamp-2 md:line-clamp-1 group-hover:text-[#00a7b3] transition-colors leading-tight mb-1">{post.title}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{post.author}</span>
                  <span className="hidden sm:flex items-center gap-1 opacity-75">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Marker */}
            <div className="col-span-2 mb-4 lg:mb-0 flex lg:block items-center justify-between">
              <span className="lg:hidden text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</span>
              <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 rounded-lg whitespace-nowrap">
                {post.category}
              </span>
            </div>

            {/* Performance Stats */}
            <div className="col-span-2 mb-4 lg:mb-0 hidden sm:flex lg:flex items-center gap-2">
               <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
                 <Eye className="w-4 h-4 text-slate-400" />
                 <span className="text-sm font-semibold text-slate-700">{formatLargeNumber(post.views)}</span>
               </div>
            </div>

            {/* Status Flags */}
            <div className="col-span-1 mb-4 lg:mb-0 flex gap-1.5 flex-wrap">
              {post.featured && <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded">Featured</span>}
              {post.breaking && <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 rounded">Breaking</span>}
              {!post.featured && !post.breaking && <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 rounded">Standard</span>}
            </div>

            {/* Actions Array */}
            <div className="col-span-2 flex items-center justify-between lg:justify-end gap-2 pt-4 border-t border-slate-100 lg:pt-0 lg:border-none">
              <span className="lg:hidden text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => onView(post)} 
                  className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-[#00a7b3] hover:border-[#00a7b3] hover:bg-[#00a7b3]/5 rounded-lg transition-all shadow-sm group-hover:bg-slate-50 select-none"
                  title="View Render"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onEdit(post)} 
                  className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all shadow-sm group-hover:bg-slate-50 select-none"
                  title="Edit Post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(post.id)} 
                  className={`p-2 bg-white border shadow-sm rounded-lg transition-all select-none ${deleteConfirm === post.id ? 'border-red-500 text-white bg-red-600' : 'border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 group-hover:bg-slate-50'}`}
                  title={deleteConfirm === post.id ? 'Click to Confirm Delete' : 'Delete Post'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
