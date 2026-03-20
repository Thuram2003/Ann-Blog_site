-- Copy and paste this entirely into the Supabase SQL Editor and click "Run"

-- 1. Create the Posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  breaking BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the Storage Bucket for Images
insert into storage.buckets (id, name, public) 
values ('images', 'images', true);

-- 3. Set up Storage Policies so anyone can view, but only authenticated rules apply to uploads
create policy "Public Access" 
  on storage.objects for select 
  using ( bucket_id = 'images' );

create policy "Anon Upload" 
  on storage.objects for insert 
  with check ( bucket_id = 'images' );
  
create policy "Anon Update" 
  on storage.objects for update 
  using ( bucket_id = 'images' );

create policy "Anon Delete" 
  on storage.objects for delete 
  using ( bucket_id = 'images' );

-- 4. Create the Admins table for custom Authentication
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a default administrator account
INSERT INTO admins (username, password) 
VALUES ('admin', 'admin123');
