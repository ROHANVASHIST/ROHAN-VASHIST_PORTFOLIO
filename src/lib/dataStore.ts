import { createClient } from '@supabase/supabase-js';

export const STORAGE_BUCKET = 'portfolio';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseStorageConfigured = !!(supabaseUrl && supabaseAnonKey);

import { ADMIN_EMAILS } from './adminConfig';

export { ADMIN_EMAILS };

function getClient(accessToken?: string) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase is not configured');
  }

  return createClient(supabaseUrl, supabaseAnonKey, accessToken
    ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
    : undefined);
}

export function dataFilePath(type: string): string {
  return `data/${type}.json`;
}

export async function fetchDataFromStorage(type: string): Promise<unknown> {
  const client = getClient();
  const path = dataFilePath(type);
  const { data, error } = await client.storage.from(STORAGE_BUCKET).download(path);

  if (error) throw error;

  const text = await data.text();
  return JSON.parse(text);
}

export async function saveDataToStorage(type: string, payload: unknown, accessToken: string): Promise<void> {
  const client = getClient(accessToken);
  const path = dataFilePath(type);
  const body = JSON.stringify(payload, null, 2);
  const { error } = await client.storage.from(STORAGE_BUCKET).upload(
    path,
    Buffer.from(body, 'utf-8'),
    { upsert: true, contentType: 'application/json' },
  );

  if (error) throw error;
}

export async function verifyAdminToken(authHeader: string | undefined): Promise<boolean> {
  if (!authHeader?.startsWith('Bearer ') || !isSupabaseStorageConfigured) return false;

  const token = authHeader.slice(7);
  const client = getClient();
  const { data: { user }, error } = await client.auth.getUser(token);

  if (error || !user?.email) return false;
  return ADMIN_EMAILS.includes(user.email);
}
