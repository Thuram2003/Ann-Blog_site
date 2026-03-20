import { useState } from 'react';
import { PostEditor } from './PostEditor';
import { SettingsEditor } from './SettingsEditor';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { AdminSidebar } from './AdminSidebar';
import { AdminStatsCards } from './AdminStatsCards';
import { AdminDataGrid } from './AdminDataGrid';
import type { Post, Category } from '@/types';
import { CATEGORIES } from '@/types';
import { 
  Plus, 
  Search,
  Calendar,
  Users,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut
} from 'lucide-react';
import Link from 'next/link';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

interface AdminDashboardProps {
  posts: Post[];
  subscribers?: Subscriber[];
  onLogout: () => void;
  onCreatePost: () => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onViewPost: (post: Post) => void;
  onDeleteSubscriber?: (id: string) => void;
}

export function AdminDashboard({ 
  posts,
  subscribers = [],
  onLogout, 
  onCreatePost, 
  onEditPost, 
  onDeletePost,
  onViewPost,
  onDeleteSubscriber
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'subscribers' | 'settings'>('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const itemsPerPage = 10;

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination for posts
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats Data Parsing
  const totalPosts = posts.length;
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const featuredPosts = posts.filter(p => p.featured).length;
  const breakingNews = posts.filter(p => p.breaking).length;
  const thisMonthPosts = posts.filter(p => {
    const postDate = new Date(p.date);
    const now = new Date();
    return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
  }).length;

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDeletePost(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleDeleteSub = (id: string) => {
    if (deleteConfirm === id && onDeleteSubscriber) {
      onDeleteSubscriber(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  // Subscribers Pagination
  const totalSubPages = Math.ceil(subscribers.length / itemsPerPage);
  const paginatedSubscribers = subscribers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination when switching tabs
  const handleTabSwitch = (tab: 'posts' | 'subscribers' | 'settings') => {
    setActiveTab(tab);
    setCurrentPage(1);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Componentized Sidebar Atom */}
      <AdminSidebar
        activeTab={activeTab}
        onTabSwitch={handleTabSwitch}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        subscribersCount={subscribers.length}
        onLogout={onLogout}
      />

      {/* Mobile Top Header (Kept Inline for fluid scaling) */}
      <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-all">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMobileSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/images/ann-logo.png" alt="ANN" className="h-10 w-auto transition-transform group-hover:scale-105" />
            <span className="font-bold text-lg tracking-wide text-slate-800 group-hover:text-[#00a7b3] transition-colors">Admin Panel</span>
          </Link>
        </div>
        <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Pane */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Dynamic Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 capitalize tracking-tight">{activeTab}</h1>
              <p className="text-slate-500 mt-1 text-sm md:text-base">
                {activeTab === 'posts' ? 'Manage your news content and analytics payload' : activeTab === 'settings' ? 'Configure global site parameters and authorization profiles' : 'Manage your newsletter audience'}
              </p>
            </div>
            {activeTab === 'posts' && (
              <button
                onClick={onCreatePost}
                className="flex items-center justify-center gap-2 bg-[#00a7b3] text-white px-6 py-3 rounded-lg hover:bg-[#008891] transition-all font-medium shadow-lg shadow-[#00a7b3]/25 hover:shadow-[#00a7b3]/40 transform hover:-translate-y-0.5 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                <span>Create New Post</span>
              </button>
            )}
          </div>

          {activeTab === 'posts' ? (
            <>
              {/* Componentized Global Stats Cards Atom */}
              <AdminStatsCards 
                totalPosts={totalPosts}
                totalViews={totalViews}
                featuredPosts={featuredPosts}
                breakingNews={breakingNews}
                thisMonthPosts={thisMonthPosts}
              />

              {/* DataGrid & Filter Configuration Root */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-8 mb-6 relative overflow-visible z-10 w-full lg:sticky lg:top-4">
                <div className="p-4 md:p-5">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#00a7b3] transition-colors" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts explicitly by title or inner content block..."
                        className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all font-medium text-slate-800 placeholder:font-normal"
                      />
                    </div>
                    <div className="w-full sm:w-48 md:w-64 flex-shrink-0 relative z-20">
                      <SearchableSelect
                        options={[
                          { label: 'All Categories', value: 'All' },
                          ...CATEGORIES.map(cat => ({ label: cat, value: cat }))
                        ]}
                        value={categoryFilter}
                        onChange={(val) => setCategoryFilter(val as Category | 'All')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Componentized Data Grid Matrix Atom */}
              <div className="mb-6 z-0 relative">
                <AdminDataGrid 
                  posts={paginatedPosts}
                  onView={onViewPost}
                  onEdit={onEditPost}
                  onDelete={handleDelete}
                  deleteConfirm={deleteConfirm}
                />
              </div>

              {/* Content Pagination Component */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-sm border border-slate-100 mt-6">
                  <p className="text-sm font-medium text-slate-500">
                    Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(currentPage * itemsPerPage, filteredPosts.length)}</span> of <span className="text-[#00a7b3] font-bold">{filteredPosts.length}</span> results
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                    <span className="text-sm font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
              )}
            </>
          ) : activeTab === 'settings' ? (
            <div className="mt-8">
              <SettingsEditor />
            </div>
          ) : (
            <>
              {/* Subscribers UI Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</th>
                        <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Subscribed Timestamp</th>
                        <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedSubscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <span className="font-semibold text-slate-800 group-hover:text-[#00a7b3] transition-colors">{sub.email}</span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {new Date(sub.subscribed_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDeleteSub(sub.id)} className={`p-2 rounded-lg transition-all inline-block shadow-sm ${deleteConfirm === sub.id ? 'text-white bg-red-600 border border-red-600' : 'text-slate-400 bg-white border border-slate-200 hover:text-red-600 hover:border-red-300 hover:bg-red-50'}`} title={deleteConfirm === sub.id ? 'Confirm Deletion Payload' : 'Purge Subscriber'}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {paginatedSubscribers.length === 0 && (
                  <div className="text-center py-20 bg-slate-50 m-4 rounded-xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm"><Users className="w-8 h-8 text-slate-400" /></div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">No active subscribers discovered</h3>
                    <p className="text-sm font-medium text-slate-500">Traffic intersecting the Newsletter endpoint will cache here automatically.</p>
                  </div>
                )}

                {totalSubPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-500">Showing <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, subscribers.length)}</span> of <span className="font-bold text-slate-900">{subscribers.length}</span> endpoints</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 text-slate-500 bg-white border border-slate-200 hover:text-slate-900 hover:bg-slate-50 rounded-lg disabled:opacity-40 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                      <span className="text-sm font-bold text-slate-700 mx-2">Page {currentPage} of {totalSubPages}</span>
                      <button onClick={() => setCurrentPage(p => Math.min(totalSubPages, p + 1))} disabled={currentPage === totalSubPages} className="p-2 text-slate-500 bg-white border border-slate-200 hover:text-slate-900 hover:bg-slate-50 rounded-lg disabled:opacity-40 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
