"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { SearchResults } from '@/components/views/SearchResults';
import type { Post } from '@/types';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchPosts, isLoading } = usePosts();

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

  const results = searchPosts(query);
  const handleBack = () => router.push('/');
  const handlePostClick = (p: Post) => router.push(`/post/${p.id}`);

  return (
    <SearchResults
      query={query}
      results={results}
      onBack={handleBack}
      onPostClick={handlePostClick}
    />
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
