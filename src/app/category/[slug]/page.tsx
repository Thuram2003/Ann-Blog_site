"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { CategoryPage } from '@/components/views/CategoryPage';
import type { Category, Post } from '@/types';

export default function CategoryViewPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { isLoading, getPostsByCategory } = usePosts();
  
  // Unwrap params in Next 15
  const unwrappedParams = React.use(params as any) as { slug: string };
  const decodedCategory = decodeURIComponent(unwrappedParams.slug) as Category;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00a7b3] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const categoryPosts = getPostsByCategory(decodedCategory);

  const handleBack = () => router.push('/');
  const handlePostClick = (p: Post) => router.push(`/post/${p.id}`);

  return (
    <CategoryPage
      category={decodedCategory}
      posts={categoryPosts}
      onBack={handleBack}
      onPostClick={handlePostClick}
    />
  );
}
