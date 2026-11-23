"use client";

import { useActionState } from "react";
import { AlertCircle, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { loginAdminAction, type ActionResult } from "@/app/admin/actions";

interface AdminLoginFormProps {
  configMissing: boolean;
}

export function AdminLoginForm({ configMissing }: AdminLoginFormProps) {
  const [state, formAction, isPending] = useActionState<
    ActionResult | null,
    FormData
  >(loginAdminAction, null);

  return (
    <form action={formAction} className="space-y-5">
      {configMissing && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Supabase কনফিগারেশন অনুপস্থিত</p>
            <p className="mt-0.5 leading-relaxed">
              প্রজেক্ট রুটে <code>.env.local</code> ফাইলে{" "}
              <code>NEXT_PUBLIC_SUPABASE_URL</code> এবং{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> যুক্ত করে সার্ভার
              পুনরায় চালু করুন।
            </p>
          </div>
        </div>
      )}

      {state && !state.success && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="admin-email"
          className="block text-sm font-semibold text-ink-primary mb-1.5"
        >
          অ্যাডমিন ইমেইল
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="admin-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@darussunnahnhila.edu.bd"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-primary/20 bg-surface-ivory/60 text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="block text-sm font-semibold text-ink-primary mb-1.5"
        >
          পাসওয়ার্ড
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-primary/20 bg-surface-ivory/60 text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending || configMissing}
        className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white font-bold text-sm sm:text-base shadow-md transition-colors cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>যাচাই করা হচ্ছে...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5 text-brand-gold-bright" />
            <span>অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
          </>
        )}
      </button>
    </form>
  );
}
