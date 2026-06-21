-- ============================================
-- Fix: Allow anonymous to read author names
-- (Previously: only authenticated users could read users table)
-- ============================================

create policy "Anyone can read public user profiles"
  on public.users for select
  using (true);
