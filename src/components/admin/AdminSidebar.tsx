import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Settings, X, LogOut } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

interface AdminSidebarProps {
  activeTab: 'posts' | 'subscribers' | 'settings';
  onTabSwitch: (tab: 'posts' | 'subscribers' | 'settings') => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
  subscribersCount: number;
  onLogout: () => void;
}

export function AdminSidebar({ 
  activeTab, 
  onTabSwitch, 
  isMobileOpen, 
  setIsMobileOpen, 
  subscribersCount, 
  onLogout 
}: AdminSidebarProps) {
  const { settings } = useSettings();
  
  const adminName = settings?.name || 'Agbor Admin';
  const adminEmail = settings?.email || 'admin@ann.com';
  const adminAvatar = settings?.image;
  
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return 'A';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  const initials = getInitials(adminName);

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-slate-900 text-white z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between gap-3 mb-8">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/ann-logo-main.png" alt="ANN" className="h-10 lg:h-12 w-auto drop-shadow-md" />
              <div className="hidden lg:block">
                <p className="font-extrabold text-xl leading-tight text-white tracking-tight">Admin Dashboard</p>
              </div>
            </Link>
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Main Navigation */}
          <nav className="space-y-2">
            <button 
              onClick={() => onTabSwitch('posts')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${activeTab === 'posts' ? 'bg-[#00a7b3] shadow-lg shadow-[#00a7b3]/25 text-white scale-[1.02]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Posts</span>
            </button>
            <button 
              onClick={() => onTabSwitch('subscribers')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${activeTab === 'subscribers' ? 'bg-[#00a7b3] shadow-lg shadow-[#00a7b3]/25 text-white scale-[1.02]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Users className="w-5 h-5" />
              <span>Subscribers</span>
              <span className="ml-auto bg-slate-800 text-xs px-2.5 py-0.5 rounded-full text-slate-300">{subscribersCount}</span>
            </button>
            <button 
              onClick={() => onTabSwitch('settings')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${activeTab === 'settings' ? 'bg-[#00a7b3] shadow-lg shadow-[#00a7b3]/25 text-white scale-[1.02]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="mt-auto p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-3 px-3 py-2 mb-3 bg-slate-800/40 rounded-xl">
            {adminAvatar ? (
               <img src={adminAvatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-600" />
            ) : (
               <div className="w-10 h-10 bg-[#00a7b3] rounded-full flex items-center justify-center shadow-inner">
                 <span className="font-bold text-sm text-white">{initials}</span>
               </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white truncate">{adminName}</p>
              <p className="text-[11px] text-slate-400 truncate">{adminEmail}</p>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="flex items-center justify-center gap-3 px-4 py-2.5 text-red-400 hover:text-white hover:bg-red-500/90 w-full rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-4 h-4 text-inherit" />
            <span>Secure Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
}
