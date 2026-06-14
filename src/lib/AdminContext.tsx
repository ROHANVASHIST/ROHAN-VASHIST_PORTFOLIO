import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from './supabase';
import { ADMIN_EMAILS } from './adminConfig';

interface AdminContextType {
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  checkAdminStatus: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  editMode: false,
  setEditMode: () => {},
  checkAdminStatus: async () => {},
});

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const checkAdminStatus = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userEmail = session?.user?.email;
      setIsAdmin(!!(userEmail && ADMIN_EMAILS.includes(userEmail)));
    } catch {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    // Check on mount
    checkAdminStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, [checkAdminStatus]);

  return (
    <AdminContext.Provider value={{ isAdmin, editMode, setEditMode, checkAdminStatus }}>
      {children}
    </AdminContext.Provider>
  );
}