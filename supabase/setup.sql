-- Run this in Supabase Dashboard → SQL Editor
-- Project: flfstoclxdykhflawrza

-- 1. Create the portfolio storage bucket (public read for site assets & JSON data)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio',
  'portfolio',
  true,
  52428800,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/json']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage policies for the portfolio bucket
-- Public read (required for portfolio site visitors)
DROP POLICY IF EXISTS "Public read portfolio" ON storage.objects;
CREATE POLICY "Public read portfolio"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

-- Authenticated admins can upload new files
DROP POLICY IF EXISTS "Authenticated insert portfolio" ON storage.objects;
CREATE POLICY "Authenticated insert portfolio"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio');

-- Authenticated admins can update files (required for upsert on JSON data)
DROP POLICY IF EXISTS "Authenticated update portfolio" ON storage.objects;
CREATE POLICY "Authenticated update portfolio"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio')
WITH CHECK (bucket_id = 'portfolio');

-- Authenticated admins can delete files
DROP POLICY IF EXISTS "Authenticated delete portfolio" ON storage.objects;
CREATE POLICY "Authenticated delete portfolio"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portfolio');
