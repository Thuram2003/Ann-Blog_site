import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react';
import { CATEGORIES } from '@/types';
import { useSettings } from '@/contexts/SettingsContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryClick: (category: string) => void;
  onHomeClick: () => void;
  isAuthenticated?: boolean;
  onLoginClick?: () => void;
  onDashboardClick?: () => void;
  onLogout?: () => void;
}

export function Header({ 
  onSearch, 
  onCategoryClick, 
  onHomeClick,
  isAuthenticated = false,
  onLoginClick,
  onDashboardClick,
  onLogout
}: HeaderProps) {
  const { settings } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsSearchOpen(false);
    }
  };

  return (
    <header className={`bg-white transition-all duration-300 z-50 ${isScrolled ? 'sticky top-0 shadow-lg' : ''}`}>
      {/* Tier 2: Main Header (Logo, Tagline, Ad, Search/Auth) */}
      <div className="container-ann py-2">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <Link 
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              onHomeClick();
            }}
          >
            <img 
              src="/images/ann-logo-main.png" 
              alt="ANN Logo" 
              className="h-20 md:h-28 w-auto transition-transform duration-300 group-hover:scale-105 mt-[-20px] mb-[-20px]"
            />
            <div className="hidden sm:block mr-[-20px] ml-[-20px]" >
              <span className="text-xl font-bold text-[#00a7b3] font-['Oswald'] tracking-wide">Agbor News Network</span>
              <p className="text-xs text-gray-500">Your trusted source for latest news</p>
            </div>
          </Link>



          {/* Right Section: Search & Auth */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={onDashboardClick}
                  className="flex items-center gap-2 px-4 py-2 bg-[#00a7b3]/10 text-[#00a7b3] rounded hover:bg-[#00a7b3] hover:text-white transition-colors font-['Oswald'] text-sm uppercase tracking-wide"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#00a7b3] text-white rounded hover:bg-[#008891] transition-colors font-['Oswald'] text-sm uppercase tracking-wide"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Width Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-b border-gray-200 py-4 px-4 bg-gray-50 animate-fade-in shadow-inner">
          <div className="container-ann">
            <form onSubmit={handleSearchSubmit} className="flex max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for news, articles, and more..."
                className="flex-grow px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:border-[#00a7b3] text-gray-700"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#00a7b3] text-white px-6 py-3 rounded-r hover:bg-[#008891] transition-colors flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tier 3: Category Nav Bar */}
      <nav className="hidden md:block bg-gray-100 border-t border-gray-200">
        <div className="container-ann">
          <ul className="flex flex-wrap items-center">
            <li>
              <button 
                onClick={onHomeClick}
                className="block py-3 px-5 font-['Oswald'] uppercase tracking-wider text-sm font-medium transition-colors hover:bg-gray-200 hover:text-[#00a7b3]"
              >
                Home
              </button>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category}>
                <button
                  onClick={() => onCategoryClick(category)}
                  className="block py-3 px-5 font-['Oswald'] uppercase tracking-wider text-sm font-medium transition-colors hover:bg-gray-200 hover:text-[#00a7b3]"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-y-auto max-h-[80vh]">
          <nav className="flex flex-col">
            <button 
              onClick={() => {
                onHomeClick();
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-6 py-4 border-b border-gray-50 hover:bg-gray-50 font-['Oswald'] uppercase text-sm font-medium"
            >
              Home
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryClick(category);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-6 py-4 border-b border-gray-50 hover:bg-gray-50 font-['Oswald'] uppercase text-sm font-medium"
              >
                {category}
              </button>
            ))}
            
            <div className="p-4 bg-gray-50">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onDashboardClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-white text-[#00a7b3] border border-[#00a7b3]/20 rounded font-['Oswald'] uppercase text-sm font-medium flex items-center gap-2 shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onLogout?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-white text-gray-500 border border-gray-200 rounded font-['Oswald'] uppercase text-sm font-medium flex items-center gap-2 shadow-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-3 bg-[#00a7b3] text-white rounded font-['Oswald'] uppercase text-sm font-medium shadow-sm flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
