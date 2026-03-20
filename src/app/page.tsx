"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { BreakingNews } from '@/components/sections/BreakingNews';
import { HeroSection } from '@/components/sections/HeroSection';
import { LatestNews } from '@/components/sections/LatestNews';
import { CategorySection } from '@/components/sections/CategorySection';
import { Sidebar } from '@/components/sections/Sidebar';
import type { Post } from '@/types';

export default function Home() {
  const router = useRouter();
  const { 
    isLoading,
    getPostsByCategory, 
    getFeaturedPosts, 
    getBreakingNews, 
    getLatestPosts, 
    getTrendingPosts, 
  } = usePosts();

  const viewPost = (post: Post) => {
    router.push(`/post/${post.id}`);
  };

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

  const featuredPosts = getFeaturedPosts();
  const breakingNews = getBreakingNews();
  const latestPosts = getLatestPosts(4);
  const trendingPosts = getTrendingPosts(5);

  const sportsPosts = getPostsByCategory('Sports').slice(0, 5);
  const politicsPosts = getPostsByCategory('Politics').slice(0, 5);
  const tourismPosts = getPostsByCategory('Tourism').slice(0, 4);
  const healthPosts = getPostsByCategory('Health').slice(0, 4);

  return (
    <main>
      {breakingNews && (
        <BreakingNews 
          post={breakingNews} 
          onClick={() => viewPost(breakingNews)} 
        />
      )}

      <HeroSection 
        featuredPosts={featuredPosts} 
        onPostClick={viewPost} 
      />

      <div className="container-ann">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <LatestNews 
              posts={latestPosts} 
              onPostClick={viewPost} 
            />

            {sportsPosts.length > 0 && (
              <CategorySection
                category="Sports"
                posts={sportsPosts}
                onPostClick={viewPost}
              />
            )}

            {politicsPosts.length > 0 && (
              <CategorySection
                category="Politics"
                posts={politicsPosts}
                onPostClick={viewPost}
              />
            )}

            {tourismPosts.length > 0 && (
              <CategorySection
                category="Tourism"
                posts={tourismPosts}
                onPostClick={viewPost}
              />
            )}

            {healthPosts.length > 0 && (
              <CategorySection
                category="Health"
                posts={healthPosts}
                onPostClick={viewPost}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar 
                trendingPosts={trendingPosts}
                onPostClick={viewPost}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
