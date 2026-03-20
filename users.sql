-- 1. Eliminate the legacy single-row settings and hardcoded admins schemas.
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS admins;

-- 2. Build the massively scalable Users hierarchy
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  image TEXT,
  phone_number TEXT,
  country TEXT,
  state_region TEXT,
  city TEXT,
  address TEXT,
  social_twitter TEXT,
  social_facebook TEXT,
  social_youtube TEXT,
  social_instagram TEXT,
  social_whatsapp TEXT,
  social_telegram TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Seed the initial Master Admin so you can log back in
INSERT INTO users (name, email, password, role)
VALUES ('Agbor Admin', 'admin@annblog.com', 'admin123', 'admin')
ON CONFLICT (email) DO NOTHING;
