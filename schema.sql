-- =========================================================
-- ZYPHOR'26 — Supabase Database Schema & Storage Setup
-- Copy and run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/frhenpsdnfajnphagakk/sql
-- =========================================================

-- 1. Create Teams Table
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_name TEXT UNIQUE NOT NULL,
    domain TEXT NOT NULL,
    team_leader TEXT NOT NULL,
    num_members INTEGER NOT NULL DEFAULT 1,
    member_names TEXT[] DEFAULT '{}',
    selected_statement TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add column if table already exists
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS selected_statement TEXT DEFAULT NULL;

-- 2. Create Domain Answers Table (Optional/Legacy)
CREATE TABLE IF NOT EXISTS public.domain_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    team_name TEXT UNIQUE NOT NULL,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    college_name TEXT NOT NULL,
    department TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    food_pref TEXT NOT NULL,
    veg_count INTEGER DEFAULT 0,
    non_veg_count INTEGER DEFAULT 0,
    total_amount INTEGER DEFAULT 0,
    payment_id TEXT DEFAULT NULL,
    upi_id TEXT DEFAULT '',
    payment_screenshot_url TEXT DEFAULT '',
    payment_status TEXT DEFAULT 'Payment Proof Submitted',
    registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns if table already exists
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS veg_count INTEGER DEFAULT 0;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS non_veg_count INTEGER DEFAULT 0;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS total_amount INTEGER DEFAULT 0;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS year_of_study TEXT DEFAULT '';
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS upi_id TEXT DEFAULT '';
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS payment_id TEXT DEFAULT NULL;
ALTER TABLE public.registrations ALTER COLUMN payment_status SET DEFAULT 'Payment Proof Submitted';


-- 4. Payment screenshot storage
-- The bucket is public so the organizer dashboard can preview submitted proofs.
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-screenshots', 'payment-screenshots', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Allow public upload payment screenshots" ON storage.objects;
CREATE POLICY "Allow public upload payment screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-screenshots');

DROP POLICY IF EXISTS "Allow public read payment screenshots" ON storage.objects;
CREATE POLICY "Allow public read payment screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-screenshots');

DROP POLICY IF EXISTS "Allow public update payment screenshots" ON storage.objects;
CREATE POLICY "Allow public update payment screenshots"
ON storage.objects FOR UPDATE
USING (bucket_id = 'payment-screenshots')
WITH CHECK (bucket_id = 'payment-screenshots');

-- Enable Row Level Security (RLS) & Policies for public access (Anon key)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domain_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select on teams" ON public.teams;
DROP POLICY IF EXISTS "Allow public insert/update on teams" ON public.teams;
CREATE POLICY "Allow public select on teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on teams" ON public.teams FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select on domain_answers" ON public.domain_answers;
DROP POLICY IF EXISTS "Allow public insert/update on domain_answers" ON public.domain_answers;
CREATE POLICY "Allow public select on domain_answers" ON public.domain_answers FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on domain_answers" ON public.domain_answers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select on registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow public insert/update on registrations" ON public.registrations;
CREATE POLICY "Allow public select on registrations" ON public.registrations FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on registrations" ON public.registrations FOR ALL USING (true) WITH CHECK (true);
