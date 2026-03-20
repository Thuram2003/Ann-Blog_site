import React from 'react';
import type { Metadata } from 'next';
import { Open_Sans, Oswald } from 'next/font/google';
import { PostsProvider } from '@/contexts/PostsContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { GlobalLayout } from '@/components/GlobalLayout';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--next-font-sans',
});

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--next-font-oswald',
});

export const metadata: Metadata = {
  title: 'ANN - Agbor News Network',
  description: 'Your trusted source for latest news',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${oswald.variable}`}>
      <body className="bg-[#f4f4f4] text-[#333333] font-sans antialiased">
        <SettingsProvider>
          <PostsProvider>
            <AdminProvider>
              <div className="min-h-screen flex flex-col">
                <Toaster position="top-right" />
                <GlobalLayout>
                  {children}
                </GlobalLayout>
              </div>
            </AdminProvider>
          </PostsProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
