import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/src/lib/supabase/server";
import { POST_IMAGES_BUCKET } from "@/src/lib/supabase";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

function sanitizeFilename(name: string): string {
  const parts = name.split(".");
  const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : "jpg";
  const base = parts
    .join(".")
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
  return `${base || "image"}.${safeExt}`;
}

function extractBucketPathFromUrl(urlOrPath: string): string | null {
  const marker = `/storage/v1/object/public/${POST_IMAGES_BUCKET}/`;
  const idx = urlOrPath.indexOf(marker);
  if (idx !== -1) {
    return decodeURIComponent(urlOrPath.slice(idx + marker.length));
  }
  // If a relative storage path (not starting with / or http) was passed directly
  if (
    !urlOrPath.startsWith("/") &&
    !urlOrPath.startsWith("http://") &&
    !urlOrPath.startsWith("https://")
  ) {
    return urlOrPath;
  }
  return null;
}

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase কনফিগারেশন পাওয়া যায়নি।" },
      { status: 500 }
    );
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "অনুমতি নেই। অনুগ্রহ করে পুনরায় লগইন করুন।" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "কোনো ছবি নির্বাচন করা হয়নি।" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "শুধুমাত্র JPG, PNG অথবা WebP ফরম্যাটের ছবি আপলোড করা যাবে।" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "ছবির আকার সর্বোচ্চ ৫ মেগাবাইট (5MB) হতে হবে।" },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeFilename(file.name);
    const randomSuffix = Math.random().toString(36).slice(2, 7);
    const storagePath = `posts/${Date.now()}-${randomSuffix}-${sanitizedName}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(POST_IMAGES_BUCKET)
      .upload(storagePath, arrayBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        {
          error: `ছবি আপলোড ব্যর্থ হয়েছে: ${uploadError.message}`,
        },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from(POST_IMAGES_BUCKET)
      .getPublicUrl(storagePath);

    return NextResponse.json({
      publicUrl: publicUrlData.publicUrl,
      storagePath,
    });
  } catch {
    return NextResponse.json(
      { error: "ছবি আপলোড করতে অপ্রত্যাশিত ত্রুটি ঘটেছে।" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase কনফিগারেশন পাওয়া যায়নি।" },
      { status: 500 }
    );
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "অনুমতি নেই। অনুগ্রহ করে পুনরায় লগইন করুন।" },
      { status: 401 }
    );
  }

  try {
    const body = (await request.json()) as { url?: string };
    if (!body?.url) {
      return NextResponse.json({ deleted: false });
    }

    const bucketPath = extractBucketPathFromUrl(body.url);
    if (!bucketPath) {
      // External or local public/ image — nothing to remove from bucket
      return NextResponse.json({ deleted: false });
    }

    const { error: removeError } = await supabase.storage
      .from(POST_IMAGES_BUCKET)
      .remove([bucketPath]);

    if (removeError) {
      return NextResponse.json(
        { error: `ছবি মুছতে সমস্যা হয়েছে: ${removeError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ deleted: true });
  } catch {
    return NextResponse.json(
      { error: "ছবি মুছতে অপ্রত্যাশিত ত্রুটি ঘটেছে।" },
      { status: 500 }
    );
  }
}
