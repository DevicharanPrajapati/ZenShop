"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase";

export type StudioUser = {
  id: string;
  email: string;
  fullName?: string;
};

interface AuthContextType {
  user: StudioUser | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StudioUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync auth state on mount
  useEffect(() => {
    if (!supabase) {
      // Check for demo user in localStorage
      try {
        const demoUser = localStorage.getItem("zen_demo_user");
        if (demoUser) {
          setUser(JSON.parse(demoUser));
        }
      } catch {
        // Ignore
      }
      setIsLoading(false);
      return;
    }

    // Get current session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
        });
      }
      setIsLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    if (!supabase) {
      // Demo simulated login
      const demo: StudioUser = {
        id: "demo-user-1",
        email,
        fullName: email.split("@")[0],
      };
      setUser(demo);
      try {
        localStorage.setItem("zen_demo_user", JSON.stringify(demo));
      } catch {}
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          fullName: data.user.user_metadata?.full_name || data.user.email?.split("@")[0],
        });
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || "An unexpected sign-in error occurred." };
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    if (!supabase) {
      const demo: StudioUser = {
        id: "demo-user-1",
        email,
        fullName,
      };
      setUser(demo);
      try {
        localStorage.setItem("zen_demo_user", JSON.stringify(demo));
      } catch {}
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          fullName,
        });
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || "An unexpected sign-up error occurred." };
    }
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      const demo: StudioUser = {
        id: "demo-google-user",
        email: "collector@zenstudio.in",
        fullName: "Studio Collector",
      };
      setUser(demo);
      try {
        localStorage.setItem("zen_demo_user", JSON.stringify(demo));
      } catch {}
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
        },
      });

      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || "Google OAuth error." };
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    try {
      localStorage.removeItem("zen_demo_user");
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
