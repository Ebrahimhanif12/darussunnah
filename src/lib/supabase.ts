import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const POST_IMAGES_BUCKET = "post-images";

let cachedClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return Boolean(
    url &&
      anonKey &&
      url.startsWith("https://") &&
      !url.includes("your-project-ref")
  );
}

/**
 * Returns a shared public Supabase client when env vars are configured,
 * or null so Server Components can gracefully fall back to static data.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  if (!cachedClient) {
    cachedClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  return cachedClient;
}

/**
 * Resolves a stored image value:
 * - Full http(s) URL or local `/...` path -> returned as-is
 * - Storage object path (e.g. `events/cover.jpg`) -> resolved via Supabase `post-images` public URL
 */
export function resolvePostImageUrl(pathOrUrl?: string | null): string {
  if (!pathOrUrl || !pathOrUrl.trim()) {
    return "/madrasahPic1.jpg";
  }

  const trimmed = pathOrUrl.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  const client = getSupabaseClient();
  if (!client) return "/madrasahPic1.jpg";

  const { data } = client.storage
    .from(POST_IMAGES_BUCKET)
    .getPublicUrl(trimmed);

  return data.publicUrl || "/madrasahPic1.jpg";
}
