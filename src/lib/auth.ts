import { supabase } from './supabase';
import { User, Session } from '@supabase/supabase-js';

// Cache the access token in memory.
let cachedSession: Session | null = null;
let isSigningIn = false;

// Initialize auth state listener. Call this on app load.
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  // Check current session first
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      cachedSession = session;
      if (onAuthSuccess) onAuthSuccess(session.user, session.access_token);
    } else {
      if (onAuthFailure) onAuthFailure();
    }
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      cachedSession = session;
      if (onAuthSuccess && event === 'SIGNED_IN') {
        onAuthSuccess(session.user, session.access_token);
      }
    } else {
      cachedSession = null;
      if (onAuthFailure && event === 'SIGNED_OUT') {
        onAuthFailure();
      }
    }
  });

  return () => {
    subscription.unsubscribe();
  };
};

export const signInWithProvider = async (): Promise<void> => {
  try {
    isSigningIn = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin/dashboard`
      }
    });
    
    if (error) throw error;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (!cachedSession) {
    const { data: { session } } = await supabase.auth.getSession();
    cachedSession = session;
  }
  return cachedSession?.access_token || null;
};

export const logout = async () => {
  await supabase.auth.signOut();
  cachedSession = null;
};
