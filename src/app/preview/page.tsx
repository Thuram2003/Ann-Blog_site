"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SinglePost } from '@/components/views/SinglePost';
import type { Post } from '@/types';

export default function PreviewPage() {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('preview_post');
    if (data) {
      try {
        setPost(JSON.parse(data));
      } catch (err) {
        console.error("Failed to parse preview post data");
        router.push('/admin');
      }
    } else {
      router.push('/admin');
    }
  }, [router]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00a7b3] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Preview...</p>
        </div>
      </div>
    );
  }

  return (
    <SinglePost
      post={post}
      relatedPosts={[]}
      onBack={() => window.close()}
      onPostClick={() => {}}
      isPreview={true}
      onExitPreview={() => window.close()}
    />
  );
}
