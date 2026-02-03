import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? 'https://sfdlepvqjjvllppwjfbx.supabase.co';
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmZGxlcHZxamp2bGxwcHdqZmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjEzNDcsImV4cCI6MjA4NTU5NzM0N30.ktf8r6JXGhcbWlRptBPAYIzXEAfbN6m2zOEE9HI_Dc4';
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
