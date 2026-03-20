-- Copy and paste this into the Supabase SQL Editor and click "Run"
-- This creates a single table to securely collect newsletter emails from the sidebar

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
