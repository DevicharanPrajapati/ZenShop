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

  const { user, signInWithEmail, signUpWithEmail, signInWithGithub, signOut, isConfigured } =
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
      } else if (res.needsEmailConfirmation) {
        setSuccessMsg(
          "Studio account created! An activation link has been sent to your email. Check your inbox to verify."
        );
        setIsSubmitting(false);
      } else {
        setSuccessMsg("Studio account registered successfully! Redirecting...");
        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      }
    }
  };

  const handleGithubSignIn = async () => {
    setErrorMsg(null);
    const res = await signInWithGithub();
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

        {/* GitHub OAuth Button */}
        <button
          type="button"
          onClick={handleGithubSignIn}
          className="w-full flex items-center justify-center space-x-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white font-mono text-xs py-3.5 rounded-xl transition cursor-pointer"
        >
          {/* GitHub Icon SVG */}
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span className="font-semibold">Continue with GitHub</span>
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
