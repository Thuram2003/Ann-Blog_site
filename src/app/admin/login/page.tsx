"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { useAdmin } from '@/contexts/AdminContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdmin();

  const handleAdminLogin = async (email: string, password: string): Promise<boolean> => {
    const success = await login(email, password);
    if (success) {
      router.push('/admin');
    }
    return success;
  };

  const handleBack = () => {
    router.push('/');
  };

  return <AdminLogin onLogin={handleAdminLogin} onBack={handleBack} />;
}
