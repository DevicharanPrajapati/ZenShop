"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, isConfigured } =
    useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    if (mode === "signin") {
      const res = await signInWithEmail(email, password);
      if (res.error) {
        setErrorMsg(res.error);
        setIsSubmitting(false);
      } else {
        setSuccessMsg("Welcome back to Zen Studio!");
        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      }
    } else {
      if (!fullName.trim()) {
        setErrorMsg("Please enter your full name.");
        setIsSubmitting(false);
        return;
      }
      const res = await signUpWithEmail(email, password, fullName);
      if (res.error) {
        setErrorMsg(res.error);
        setIsSubmitting(false);
      } else {
        setSuccessMsg("Studio account registered successfully!");
        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    const res = await signInWithGoogle();
    if (res.error) {
      setErrorMsg(res.error);
    }
  };

  // If already logged in, show authenticated account portal
  if (user) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-16 sm:py-24 text-center">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-500/50 flex items-center justify-center mx-auto text-blue-400">
            <UserIcon className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
            STUDIO ACCOUNT ACTIVE
          </span>

          <h1 className="text-2xl font-mono font-black text-white uppercase">
            {user.fullName || "Streetwear Patron"}
          </h1>

          <p className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 py-2 px-4 rounded-xl inline-block">
            {user.email}
          </p>

          <div className="pt-4 flex flex-col gap-3 font-mono text-xs">
            <Link
              href="/orders"
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-900/30"
            >
              <span>Track Your Orders</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="w-full flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 py-3.5 rounded-xl transition"
            >
              <span>Browse Active Drop 01</span>
            </Link>

            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center space-x-2 bg-neutral-950 hover:bg-red-950/40 border border-neutral-800 hover:border-red-800/60 text-neutral-400 hover:text-red-400 py-3 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-20">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Storefront</span>
        </Link>
      </div>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-blue-500/40 blur-md" />

        {/* Title & Subhead */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>SUPABASE AUTHENTICATION</span>
          </span>
          <h1 className="text-2xl font-mono font-black text-white uppercase tracking-tight">
            {mode === "signin" ? "STUDIO SIGN IN" : "JOIN THE VAULT"}
          </h1>
          <p className="text-xs text-neutral-400 font-sans">
            {mode === "signin"
              ? "Access your saved capsule drops, tracking, and fast checkout."
              : "Register to unlock VIP private drop access and pre-orders."}
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-850 text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === "signin"
                ? "bg-blue-600 text-white font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === "signup"
                ? "bg-blue-600 text-white font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success feedback */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-400 text-xs font-mono">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {mode === "signup" && (
            <div className="space-y-1">
              <label className="text-neutral-400">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aryan Khanna"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-neutral-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@zenstudio.in"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 text-white font-mono text-xs uppercase font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-900/30 cursor-pointer pt-3"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === "signin" ? "Sign In to Studio" : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-900" />
          </div>
          <span className="relative bg-neutral-950 px-3 text-[10px] font-mono uppercase text-neutral-500">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white font-mono text-xs py-3 rounded-xl transition cursor-pointer"
        >
          {/* Google Icon SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Security badge */}
        <div className="pt-2 flex items-center justify-center space-x-2 text-[10px] font-mono text-neutral-500 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Protected with Supabase Auth &amp; 256-bit SSL</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center text-xs font-mono text-neutral-500">
          Loading authentication gateway...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
