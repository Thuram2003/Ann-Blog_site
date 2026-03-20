"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { SinglePost } from '@/components/views/SinglePost';
import type { Post } from '@/types';

export default function PostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { posts, isLoading, getPostById, getPostsByCategory, incrementViews } = usePosts();
  
  // Need to unwrap params in Next.js 15
  const unwrappedParams = React.use(params as any) as { id: string };
  const postId = unwrappedParams.id;

  const post = getPostById(postId);
  const viewedRef = React.useRef<string | null>(null);
  
  useEffect(() => {
    if (post && !isLoading && viewedRef.current !== postId) {
      incrementViews(postId);
      viewedRef.current = postId;
    }
  }, [post, isLoading, postId, incrementViews]);

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

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <button onClick={() => router.push('/')} className="btn-primary">
          Return Home
        </button>
      </div>
    );
  }

  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.id !== post.id)
    .slice(0, 4);

  const handleBack = () => router.push('/');
  const handlePostClick = (p: Post) => router.push(`/post/${p.id}`);

  return (
    <SinglePost
      post={post}
      relatedPosts={relatedPosts}
      onBack={handleBack}
      onPostClick={handlePostClick}
      isPreview={false}
      onExitPreview={() => {}}
    />
  );
}
