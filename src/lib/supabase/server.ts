import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "@/src/lib/supabase";

/**
 * Creates a cookie-aware Supabase client for Server Components, Server Actions,
 * and Route Handlers. Returns null if Supabase env vars are not configured.
 */
export async function createServerSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Safe to ignore in Server Components where response cookies are read-only;
            // proxy.ts refreshes cookies on incoming requests.
          }
        },
      },
    }
  );
}

/**
 * Verifies an authenticated Supabase user on the server (using getUser(), not getSession()).
 * Redirects to /admin/login if unauthenticated or if Supabase is unconfigured.
 */
export async function requireAdminSession() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect("/admin/login?error=config");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  return { supabase, user };
}
