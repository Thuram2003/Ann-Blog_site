"use client";

import React, { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { TopBar } from '@/components/sections/TopBar';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export function GlobalLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAdmin();

  const isAdminRoute = pathname?.startsWith('/admin');

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const viewCategory = (category: string) => {
    router.push(`/category/${encodeURIComponent(category)}`);
  };

  const goHome = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const handleLoginClick = () => {
    router.push('/admin/login');
  };

  const handleDashboardClick = () => {
    router.push('/admin');
  };

  const handleAdminLogout = () => {
    logout();
    router.push('/');
  };

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Header 
        onSearch={handleSearch}
        onCategoryClick={viewCategory}
        onHomeClick={goHome}
        isAuthenticated={isAuthenticated}
        onLoginClick={handleLoginClick}
        onDashboardClick={handleDashboardClick}
        onLogout={handleAdminLogout}
      />
      {children}
      <Footer onHomeClick={goHome} />
    </>
  );
}
