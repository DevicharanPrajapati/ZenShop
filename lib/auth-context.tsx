"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase";

export type UserRole = "admin" | "user";

export type StudioUser = {
  id: string;
  email: string;
  fullName?: string;
  role: UserRole;
};

interface AuthContextType {
  user: StudioUser | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  role: UserRole | null;
  isAdmin: boolean;
  isUser: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: string | null; needsEmailConfirmation?: boolean }>;
  signInWithGithub: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const determineRole = (email?: string, metaRole?: string): UserRole => {
  if (metaRole === "admin") return "admin";
  if (!email) return "user";
  const normalized = email.toLowerCase().trim();
  const configuredAdmin = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase()?.trim() || "admin@zenstudio.in";
  if (configuredAdmin && normalized === configuredAdmin) return "admin";
  if (
    normalized.startsWith("admin@") ||
    normalized.startsWith("byteadmin@") ||
    normalized.includes("byteadmin")
  ) {
    return "admin";
  }
  return "user";
};

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
          const parsed = JSON.parse(demoUser);
          setUser({
            ...parsed,
            role: determineRole(parsed.email, parsed.role),
          });
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
        const email = session.user.email || "";
        const role = determineRole(email, session.user.user_metadata?.role);
        setUser({
          id: session.user.id,
          email,
          fullName: session.user.user_metadata?.full_name || email.split("@")[0],
          role,
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
        const email = session.user.email || "";
        const role = determineRole(email, session.user.user_metadata?.role);
        setUser({
          id: session.user.id,
          email,
          fullName: session.user.user_metadata?.full_name || email.split("@")[0],
          role,
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
    const trimmedEmail = email.trim();
    if (!supabase) {
      // Demo simulated login
      const demo: StudioUser = {
        id: "demo-user-1",
        email: trimmedEmail,
        fullName: trimmedEmail.split("@")[0],
        role: determineRole(trimmedEmail),
      };
      setUser(demo);
      try {
        localStorage.setItem("zen_demo_user", JSON.stringify(demo));
      } catch {}
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        if (
          error.status === 429 ||
          error.message.toLowerCase().includes("rate limit") ||
          error.message.toLowerCase().includes("too many requests")
        ) {
          return {
            error:
              "Too many attempts. Supabase has an email rate limit. To fix this instantly: Open Supabase Dashboard -> Authentication -> Providers -> Email -> Turn OFF 'Confirm email'.",
          };
        }
        if (error.message.toLowerCase().includes("email not confirmed")) {
          return {
            error:
              "Email confirmation required. Please check your inbox or turn off 'Confirm email' in Supabase Dashboard (Authentication -> Providers -> Email).",
          };
        }
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          return { error: "Invalid email or password. Please verify or create an account." };
        }
        return { error: error.message };
      }

      if (data.user) {
        const email = data.user.email || trimmedEmail;
        const role = determineRole(email, data.user.user_metadata?.role);
        setUser({
          id: data.user.id,
          email,
          fullName: data.user.user_metadata?.full_name || email.split("@")[0],
          role,
        });
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || "An unexpected sign-in error occurred." };
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const trimmedEmail = email.trim();
    const role = determineRole(trimmedEmail);

    if (!supabase) {
      const demo: StudioUser = {
        id: "demo-user-1",
        email: trimmedEmail,
        fullName,
        role,
      };
      setUser(demo);
      try {
        localStorage.setItem("zen_demo_user", JSON.stringify(demo));
      } catch {}
      return { error: null, needsEmailConfirmation: false };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role,
          },
        },
      });

      if (error) {
        if (
          error.status === 429 ||
          error.message.toLowerCase().includes("rate limit") ||
          error.message.toLowerCase().includes("too many requests")
        ) {
          return {
            error:
              "Email rate limit exceeded! To fix this instantly: in your Supabase Dashboard -> Authentication -> Providers -> Email -> Turn OFF 'Confirm email'.",
          };
        }
        return { error: error.message };
      }

      // Check if email already existed in Supabase
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        return {
          error: "An account with this email already exists. Please switch to Sign In.",
        };
      }

      const hasSession = Boolean(data.session);

      if (data.user && hasSession) {
        setUser({
          id: data.user.id,
          email: data.user.email || trimmedEmail,
          fullName: fullName.trim(),
          role,
        });
      }

      return { error: null, needsEmailConfirmation: !hasSession };
    } catch (err: any) {
      return { error: err.message || "An unexpected sign-up error occurred." };
    }
  };

  const signInWithGithub = async () => {
    if (!supabase) {
      const demo: StudioUser = {
        id: "demo-github-user",
        email: "developer@github.com",
        fullName: "GitHub Developer",
        role: "user",
      };
      setUser(demo);
      try {
        localStorage.setItem("zen_demo_user", JSON.stringify(demo));
      } catch {}
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
        },
      });

      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || "GitHub OAuth error." };
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

  const role: UserRole | null = user?.role || null;
  const isAdmin = role === "admin";
  const isUser = role === "user";

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isConfigured: isSupabaseConfigured,
        role,
        isAdmin,
        isUser,
        signInWithEmail,
        signUpWithEmail,
        signInWithGithub,
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
