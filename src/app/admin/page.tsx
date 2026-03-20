"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { useAdmin } from '@/contexts/AdminContext';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { PostEditor } from '@/components/admin/PostEditor';
import type { Post } from '@/types';
import { supabase } from '@/lib/supabase';

// Local interface since we didn't inject this globally
export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdmin();
  const { posts, deletePost, addPost, updatePost } = usePosts();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // Newsletter Logic
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      // Fetch Subscribers physically from DB
      const fetchSubscribers = async () => {
        const { data, error } = await supabase
          .from('subscribers')
          .select('*')
          .order('subscribed_at', { ascending: false });
        if (data && !error) {
          setSubscribers(data);
        }
      };
      fetchSubscribers();
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setIsEditorOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditorOpen(true);
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  const handleDeleteSubscriber = async (id: string) => {
    try {
      await supabase.from('subscribers').delete().eq('id', id);
      setSubscribers(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Failed to delete subscriber", err);
    }
  };

  const handleViewPost = (post: Post) => {
    window.open(`/post/${post.id}`, '_blank');
  };

  const handleSavePost = async (postData: Omit<Post, 'id' | 'views'>) => {
    await addPost(postData);
    setIsEditorOpen(false);
  };

  const handleUpdatePost = async (id: string, postData: Partial<Post>) => {
    await updatePost(id, postData);
    setIsEditorOpen(false);
  };

  if (isEditorOpen) {
    return (
      <PostEditor
        post={selectedPost}
        onSave={handleSavePost}
        onUpdate={handleUpdatePost}
        onCancel={() => setIsEditorOpen(false)}
        onPreview={(post) => {
          localStorage.setItem('preview_post', JSON.stringify(post));
          window.open('/preview', '_blank');
        }}
      />
    );
  }

  return (
    <AdminDashboard
      posts={posts}
      subscribers={subscribers}
      onLogout={handleLogout}
      onCreatePost={handleCreatePost}
      onEditPost={handleEditPost}
      onDeletePost={handleDeletePost}
      onViewPost={handleViewPost}
      onDeleteSubscriber={handleDeleteSubscriber}
    />
  );
}
