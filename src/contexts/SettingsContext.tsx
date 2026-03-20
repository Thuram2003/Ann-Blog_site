"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  image: string;
  phone_number: string;
  country: string;
  state_region: string;
  city: string;
  address: string;
  social_twitter: string;
  social_facebook: string;
  social_youtube: string;
  social_instagram: string;
  social_whatsapp: string;
  social_telegram: string;
}

const defaultProfile: UserProfile = {
  id: '',
  name: 'Agbor Admin',
  email: 'contact@annblog.com',
  role: 'admin',
  image: '',
  phone_number: '+237 677 00 00 00',
  social_twitter: '',
  social_facebook: '',
  social_youtube: '',
  social_instagram: '',
  social_whatsapp: '',
  social_telegram: '',
  country: 'Cameroon',
  state_region: 'Littoral',
  city: 'Douala',
  address: '4 Etage , Bonaberi'
};



interface SettingsContextType {
  settings: UserProfile;
  isLoading: boolean;
  updateSettings: (newSettings: Partial<UserProfile>) => Promise<boolean>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('role', 'admin').limit(1).single();
        if (data && !error) {
          // Sanitize nulls into strings to prevent React uncontrolled input runtime errors
          const sanitized = { ...data };
          Object.keys(sanitized).forEach(key => {
            if (sanitized[key] === null) sanitized[key] = '';
          });
          setSettings(sanitized as UserProfile);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<UserProfile>): Promise<boolean> => {
    try {
      const payload: any = { ...newSettings };
      
      // Critical Fix: DO NOT attempt to update Primary Key or read-only columns
      // Sending ID inside an update payload triggers a Supabase 502 Bad Gateway / CORS rejection
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;

      let query = supabase.from('users').update(payload);
      
      if (settings.id) {
        query = query.eq('id', settings.id);
      } else {
        query = query.eq('role', 'admin');
      }

      const { error } = await query;
      
      if (error) {
        console.error("Update fault:", error);
        toast.error("Failed to update site settings.");
        return false;
      }
      setSettings(prev => ({ ...prev, ...newSettings }));
      toast.success("Site settings updated successfully!");
      return true;
    } catch (err) {
      console.error("Catch Update error:", err);
      toast.error("An error occurred while updating settings.");
      return false;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, isLoading, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
