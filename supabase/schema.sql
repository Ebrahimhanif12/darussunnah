-- ============================================================================
-- Al-Jamia Al-Islamia Darussunnah Nhila — Supabase Schema & Storage Setup
-- Tables: public.notices, public.posts
-- Storage Bucket: post-images (public read, authenticated write/delete)
-- Safe to run in the Supabase SQL Editor (idempotent)
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. Helper trigger function for updated_at timestamps
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- 2. NOTICES TABLE (নোটিশ বোর্ড)
-- ----------------------------------------------------------------------------
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'সাধারণ'
    check (category in ('ভর্তি', 'পরীক্ষা', 'ছুটি', 'মাহফিল ও অনুষ্ঠান', 'সাধারণ')),
  summary text not null,
  content text not null,
  issued_by text not null default 'কর্তৃপক্ষ, আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা',
  published_at timestamptz not null default now(),
  is_pinned boolean not null default false,
  is_urgent boolean not null default false,
  is_published boolean not null default true,
  attachment_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_notices_published_order
  on public.notices (is_published, is_pinned desc, published_at desc);

drop trigger if exists trg_notices_updated_at on public.notices;
create trigger trg_notices_updated_at
  before update on public.notices
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 3. POSTS TABLE (সংবাদ ও কার্যক্রম / News & Events with Photos)
-- ----------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  gallery_images text[] not null default '{}',
  category text not null default 'সংবাদ ও কার্যক্রম'
    check (category in ('সংবাদ ও কার্যক্রম', 'অনুষ্ঠান ও মাহফিল', 'শিক্ষা ও অর্জন', 'ক্যাম্পাস বার্তা', 'প্রশিক্ষণ')),
  author_name text not null default 'মিডিয়া ও প্রকাশনা বিভাগ',
  published_at timestamptz not null default now(),
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_posts_published_order
  on public.posts (is_published, published_at desc);

create index if not exists idx_posts_slug
  on public.posts (slug);

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- Public can SELECT published items only.
-- Authenticated users (future Admin Panel) can manage all rows.
-- ----------------------------------------------------------------------------
alter table public.notices enable row level security;
alter table public.posts enable row level security;

-- Notices policies
drop policy if exists "Public can view published notices" on public.notices;
create policy "Public can view published notices"
  on public.notices
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Authenticated users can view all notices" on public.notices;
create policy "Authenticated users can view all notices"
  on public.notices
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert notices" on public.notices;
create policy "Authenticated users can insert notices"
  on public.notices
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update notices" on public.notices;
create policy "Authenticated users can update notices"
  on public.notices
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete notices" on public.notices;
create policy "Authenticated users can delete notices"
  on public.notices
  for delete
  to authenticated
  using (true);

-- Posts policies
drop policy if exists "Public can view published posts" on public.posts;
create policy "Public can view published posts"
  on public.posts
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Authenticated users can view all posts" on public.posts;
create policy "Authenticated users can view all posts"
  on public.posts
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert posts" on public.posts;
create policy "Authenticated users can insert posts"
  on public.posts
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update posts" on public.posts;
create policy "Authenticated users can update posts"
  on public.posts
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete posts" on public.posts;
create policy "Authenticated users can delete posts"
  on public.posts
  for delete
  to authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- 5. SUPABASE STORAGE BUCKET: post-images
-- Public read for website visitors; authenticated upload/update/delete.
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-images',
  'post-images',
  true,
  5242880, -- 5 MB max file size
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read access for post-images" on storage.objects;
create policy "Public read access for post-images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'post-images');

drop policy if exists "Authenticated upload to post-images" on storage.objects;
create policy "Authenticated upload to post-images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'post-images');

drop policy if exists "Authenticated update in post-images" on storage.objects;
create policy "Authenticated update in post-images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'post-images')
  with check (bucket_id = 'post-images');

drop policy if exists "Authenticated delete in post-images" on storage.objects;
create policy "Authenticated delete in post-images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'post-images');

-- ----------------------------------------------------------------------------
-- 6. OPTIONAL SEED DATA (Sample Bangla Notices & Posts)
-- Safe to re-run without creating duplicates
-- ----------------------------------------------------------------------------
insert into public.notices (
  title, category, summary, content, issued_by, published_at, is_pinned, is_urgent, is_published
)
select * from (
  values
    (
      'নতুন শিক্ষাবর্ষে কিতাব, হেফজ, নূরানী, ইবতেদায়ী ও মকতব বিভাগে ভর্তি বিজ্ঞপ্তি',
      'ভর্তি',
      'আসন্ন শিক্ষাবর্ষে জামিয়ার সকল বিভাগে আবাসিক ও অনাবাসিক ছাত্র ভর্তি কার্যক্রম শুরু হতে যাচ্ছে। আগ্রহী শিক্ষার্থীদের নির্ধারিত কাগজপত্রসহ অফিসে যোগাযোগের অনুরোধ করা হলো।',
      E'সর্বসাধারণ ও সম্মানিত অভিভাবকদের অবগতির জন্য জানানো যাচ্ছে যে, আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার আগামী শিক্ষাবর্ষের জন্য কিতাব বিভাগ (ইয়াজদাহুম হতে দাওরায়ে হাদীস), হেফজ বিভাগ, নূরানী একাডেমি (প্লে–৫ম), ইবতেদায়ী (১ম–৩য়) এবং মকতব বিভাগে নতুন ছাত্র ভর্তি কার্যক্রম শুরু হবে।\n\nআগ্রহী ছাত্রদের জন্ম নিবন্ধন সনদের ফটোকপি, ২ কপি পাসপোর্ট সাইজ ছবি, পূর্ববর্তী প্রতিষ্ঠানের ছাড়পত্র/নম্বরপত্র এবং অভিভাবকের জাতীয় পরিচয়পত্রের ফটোকপিসহ সরাসরি মাদরাসার ভর্তি অফিসে উপস্থিত হওয়ার জন্য অনুরোধ করা যাচ্ছে।\n\nএতিম ও অসহায় মেধাবী ছাত্রদের জন্য লিল্লাহ বোর্ডিংয়ে বিশেষ সুযোগ-সুবিধা রয়েছে।',
      'শিক্ষা বিভাগীয় সচিব, জামিয়া দারুস সুন্নাহ, হ্নীলা',
      '2026-11-10T09:00:00+06:00'::timestamptz,
      true,
      true,
      true
    ),
    (
      'ঐতিহ্যবাহী বার্ষিক দস্তারবন্দী মহাসম্মেলন ও ওয়াজ মাহফিল',
      'মাহফিল ও অনুষ্ঠান',
      'আগামী ৯ ও ১০ ডিসেম্বর জামিয়া প্রাঙ্গণে ফারেগীন আলেমদের সম্মাননার পাগড়ী প্রদান উপলক্ষে দুই দিনব্যাপী বিশাল দস্তারবন্দী মহাসম্মেলন অনুষ্ঠিত হবে।',
      E'আলহামদুলিল্লাহ, প্রতি বছরের ন্যায় এ বছরও জামিয়ার দাওরায়ে হাদীস ফারেগীন কৃতি সন্তানদের মাথায় দস্তারে ফজিলত (সম্মাননার পাগড়ী) পরিয়ে দেওয়ার উদ্দেশ্যে আগামী ৯ ও ১০ ডিসেম্বর দুই দিনব্যাপী ঐতিহাসিক দস্তারবন্দী মহাসম্মেলন ও বার্ষিক ওয়াজ মাহফিল অনুষ্ঠিত হতে যাচ্ছে।\n\nমহাসম্মেলনে দেশের শীর্ষস্থানীয় উলামায়ে কেরাম, মাশায়েখ ও জামিয়ার প্রাক্তন শিক্ষার্থীরা উপস্থিত থাকবেন।\n\nসকল প্রাক্তন ছাত্রদের আগামী ৫ ডিসেম্বরের মধ্যে নাম নিবন্ধন সম্পন্ন করার এবং ধর্মপ্রাণ তৌহিদী জনতাকে সপরিবারে উপস্থিত হয়ে দোয়ায় শরিক হওয়ার জন্য আন্তরিক দাওয়াত জানানো হলো।',
      'মাহফিল বাস্তবায়ন কমিটি ও কর্তৃপক্ষ',
      '2026-11-18T10:00:00+06:00'::timestamptz,
      true,
      true,
      true
    ),
    (
      'দ্বিতীয় সাময়িক (অর্ধবার্ষিক) পরীক্ষার সময়সূচি প্রকাশ',
      'পরীক্ষা',
      'কিতাব, হেফজ, ইবতেদায়ী ও নূরানী বিভাগের দ্বিতীয় সাময়িক পরীক্ষা আগামী ২৫ নভেম্বর থেকে শুরু হবে। প্রবেশপত্র সংগ্রহের শেষ তারিখ ২২ নভেম্বর।',
      E'জামিয়ার সকল বিভাগের শিক্ষার্থীদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ২৫ নভেম্বর থেকে দ্বিতীয় সাময়িক (অর্ধবার্ষিক) পরীক্ষা শুরু হবে।\n\nপরীক্ষায় অংশগ্রহণের পূর্বে সকল শিক্ষার্থীকে বকেয়া মাসিক ফি (প্রযোজ্য ক্ষেত্রে) পরিশোধ করে আগামী ২২ নভেম্বরের মধ্যে শিক্ষা অফিস থেকে প্রবেশপত্র সংগ্রহ করতে হবে।\n\nপরীক্ষার বিস্তারিত রুটিন স্ব-স্ব শ্রেণিকক্ষ ও নোটিশ বোর্ডে টানিয়ে দেওয়া হয়েছে।',
      'পরীক্ষা নিয়ন্ত্রক, জামিয়া দারুস সুন্নাহ, হ্নীলা',
      '2026-11-05T09:00:00+06:00'::timestamptz,
      false,
      false,
      true
    ),
    (
      'কম্পিউটার প্রশিক্ষণ বিভাগের নতুন ব্যাচে ভর্তি ও ক্লাস রুটিন',
      'সাধারণ',
      'জামিয়ার আধুনিক কম্পিউটার ল্যাবে ৩ মাস মেয়াদি ‘বেসিক আইটি ও আরবি-বাংলা অফিস অ্যাপ্লিকেশন’ কোর্সের নতুন ব্যাচে নিবন্ধন চলছে।',
      E'জামিয়ার কিতাব ও হিফজ বিভাগের আগ্রহী শিক্ষার্থীদের জন্য কম্পিউটার প্রশিক্ষণ বিভাগের নতুন ব্যাচের কার্যক্রম শুরু হতে যাচ্ছে।\n\nকোর্সে বাংলা, ইংরেজি ও আরবি টাইপিং, এমএস ওয়ার্ড, এক্সেল, পাওয়ারপয়েন্ট এবং নিরাপদ ইন্টারনেট ব্যবহার শেখানো হবে।\n\nআগ্রহী ছাত্ররা কম্পিউটার বিভাগীয় প্রধানের নিকট নাম নিবন্ধন করতে পারবে।',
      'কম্পিউটার বিভাগীয় প্রধান',
      '2026-10-28T09:00:00+06:00'::timestamptz,
      false,
      false,
      true
    )
) as seed(title, category, summary, content, issued_by, published_at, is_pinned, is_urgent, is_published)
where not exists (
  select 1 from public.notices n where n.title = seed.title
);

insert into public.posts (
  title, slug, excerpt, content, cover_image_url, gallery_images, category, author_name, published_at, is_published
)
values
  (
    'জামিয়া মসজিদে বিশেষ দোয়া মাহফিল ও শিক্ষাবর্ষের সার্বিক সফলতা কামনায় মুনাজাত',
    'jamia-masjid-special-dua-mahfil',
    'সম্মানিত উলামায়ে কেরাম, আসাতিযায়ে কেরাম ও শত শত শিক্ষার্থীর অংশগ্রহণে জামিয়ার কেন্দ্রীয় মসজিদে বিশেষ দোয়া ও নসিহত মাহফিল অনুষ্ঠিত হয়েছে।',
    E'আলহামদুলিল্লাহ, আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার কেন্দ্রীয় মসজিদে সম্মানিত আসাতিযায়ে কেরাম ও শিক্ষার্থীদের উপস্থিতিতে এক ভাবগম্ভীর দোয়া ও নসিহত মাহফিল অনুষ্ঠিত হয়েছে।\n\nমাহফিলে জামিয়ার প্রতিষ্ঠাতা পরিচালক মুজাহিদে মিল্লাত আলহাজ্ব শাহ আবুল মনজুর (রহ.), ছদরে মুহতামিম আল্লামা শাহ ইসহাক ছদর সাহেব (রহ.) এবং আল্লামা শাহ সুফি আখতার কামাল (রহ.)-সহ সকল মরহুম আকাবির ও জমিদাতাদের রুহের মাগফিরাত কামনা করে বিশেষ মুনাজাত করা হয়।\n\nঅনুষ্ঠানে শিক্ষার্থীরা ইলম অর্জন, আমল-আখলাক এবং উম্মাহর কল্যাণে নিজেদের নিয়োজিত রাখার শপথ গ্রহণ করে। পরিশেষে দেশ, জাতি ও মুসলিম উম্মাহর শান্তি ও সমৃদ্ধি কামনা করে মুনাজাত পরিচালনা করা হয়।',
    '/madrasahPic4.jpg',
    array['/madrasahPic4.jpg', '/madrasahPic1.jpg', '/madrasahPic2.jpg'],
    'অনুষ্ঠান ও মাহফিল',
    'মিডিয়া ও প্রকাশনা বিভাগ',
    '2026-11-16T15:30:00+06:00'::timestamptz,
    true
  ),
  (
    'আধুনিক কম্পিউটার প্রশিক্ষণ ল্যাবে শিক্ষার্থীদের বাস্তবভিত্তিক আইটি প্রশিক্ষণ',
    'computer-lab-practical-it-training',
    'দ্বীনি শিক্ষার পাশাপাশি আধুনিক তথ্যপ্রযুক্তিতে দক্ষ করে তুলতে জামিয়ার সুসজ্জিত কম্পিউটার ল্যাবে নিয়মিত হাতে-কলমে প্রশিক্ষণ কার্যক্রম পরিচালিত হচ্ছে।',
    E'বর্তমান যুগের চাহিদা ও দ্বীনি দাওয়াহর বহুমুখী প্রসারের লক্ষ্যে আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলায় সুসজ্জিত আধুনিক কম্পিউটার প্রশিক্ষণ ল্যাব পরিচালিত হচ্ছে।\n\nকম্পিউটার বিভাগীয় প্রধানের তত্ত্বাবধানে শিক্ষার্থীরা এখানে আরবি, বাংলা ও ইংরেজি কম্পোজ, অফিস অ্যাপ্লিকেশন, ডিজিটাল নথিপত্র ব্যবস্থাপনা এবং নিরাপদ প্রযুক্তির ব্যবহার সম্পর্কে হাতে-কলমে দক্ষতা অর্জন করছে।\n\nপ্রশিক্ষণ শেষে অংশগ্রহণকারী শিক্ষার্থীরা সনদপত্র লাভ করে, যা তাদের ভবিষ্যৎ কর্মজীবন ও দ্বীনি খেদমতে সহায়ক ভূমিকা পালন করবে বলে কর্তৃপক্ষ আশাবাদ ব্যক্ত করেছেন।',
    '/madrasahPic6.jpg',
    array['/madrasahPic6.jpg', '/madrasahPic5.jpg'],
    'প্রশিক্ষণ',
    'কম্পিউটার প্রশিক্ষণ বিভাগ',
    '2026-11-08T11:00:00+06:00'::timestamptz,
    true
  ),
  (
    'সুশৃঙ্খল ও মনোরম পরিবেশে সাময়িক পরীক্ষার মূল্যায়ন সম্পন্ন',
    'peaceful-term-examination-completed',
    'জামিয়ার প্রশস্ত হলরুমে কিতাব, হেফজ, ইবতেদায়ী ও নূরানী বিভাগের শিক্ষার্থীদের অংশগ্রহণে অত্যন্ত সুশৃঙ্খলভাবে সাময়িক পরীক্ষা সম্পন্ন হয়েছে।',
    E'অত্যন্ত শান্ত, সুশৃঙ্খল ও নকলমুক্ত পরিবেশে জামিয়া দারুস সুন্নাহ, হ্নীলার প্রশস্ত পরীক্ষা হলে শিক্ষার্থীদের সাময়িক মূল্যায়ন পরীক্ষা সম্পন্ন হয়েছে।\n\nপরীক্ষা চলাকালীন সম্মানিত শিক্ষকমণ্ডলী হল পরিদর্শন করেন এবং শিক্ষার্থীদের সার্বিক শৃঙ্খলা ও প্রস্তুতিতে সন্তোষ প্রকাশ করেন। নির্ধারিত তারিখের মধ্যে উত্তরপত্র মূল্যায়ন শেষে মেধাতালিকা ও ফলাফল প্রকাশ করা হবে, ইনশাআল্লাহ।',
    '/madrasahPic3.jpg',
    array['/madrasahPic3.jpg', '/madrasahPic1.jpg'],
    'শিক্ষা ও অর্জন',
    'পরীক্ষা নিয়ন্ত্রক দপ্তর',
    '2026-10-30T14:00:00+06:00'::timestamptz,
    true
  )
on conflict (slug) do nothing;
