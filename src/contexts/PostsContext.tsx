"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Post, Category } from '@/types';
import { supabase } from '@/lib/supabase';
import { initialPosts } from '@/data/initialPosts';

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  getPostById: (id: string) => Post | undefined;
  getPostsByCategory: (category: Category) => Post[];
  getFeaturedPosts: () => Post[];
  getBreakingNews: () => Post | undefined;
  getLatestPosts: (limit?: number) => Post[];
  getTrendingPosts: (limit?: number) => Post[];
  searchPosts: (query: string) => Post[];
  addPost: (post: Omit<Post, 'id' | 'views'>) => Promise<Post | null>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
  incrementViews: (id: string) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setPosts(data as Post[]);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const getPostById = useCallback((id: string): Post | undefined => {
    return posts.find(post => post.id === id);
  }, [posts]);

  const getPostsByCategory = useCallback((category: string): Post[] => {
    return posts.filter(post => post.category === category);
  }, [posts]);

  const getFeaturedPosts = useCallback((): Post[] => {
    return posts.filter(post => post.featured);
  }, [posts]);

  const getBreakingNews = useCallback((): Post | undefined => {
    return posts.find(post => post.breaking);
  }, [posts]);

  const getLatestPosts = useCallback((limit: number = 10): Post[] => {
    return [...posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }, [posts]);

  const getTrendingPosts = useCallback((limit: number = 5): Post[] => {
    return [...posts]
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }, [posts]);

  const searchPosts = useCallback((query: string): Post[] => {
    const lowerQuery = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }, [posts]);

  const addPost = async (post: Omit<Post, 'id' | 'views'>): Promise<Post | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ ...post, views: 0 }])
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setPosts(prev => [data as Post, ...prev]);
        return data as Post;
      }
      return null;
    } catch (err) {
      console.error('Error adding post:', err);
      return null;
    }
  };

  const updatePost = async (id: string, updates: Partial<Post>): Promise<Post | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        setPosts(prev => prev.map(p => p.id === id ? (data as Post) : p));
        return data as Post;
      }
      return null;
    } catch (err) {
      console.error('Error updating post:', err);
      return null;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setPosts(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting post:', err);
      return false;
    }
  };

  const incrementViews = async (id: string): Promise<void> => {
    const targetPost = posts.find(p => p.id === id);
    if (!targetPost) return;
    
    // Optimistic local update
    setPosts(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p));
    
    try {
      await supabase
        .from('posts')
        .update({ views: targetPost.views + 1 })
        .eq('id', id);
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  };

  return (
    <PostsContext.Provider value={{
      posts, isLoading, getPostById, getPostsByCategory, getFeaturedPosts, getBreakingNews,
      getLatestPosts, getTrendingPosts, searchPosts, addPost, updatePost, deletePost, incrementViews,
      refreshPosts: fetchPosts
    }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}

