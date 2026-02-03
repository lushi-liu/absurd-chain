import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? 'https://test.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? 'testkey';
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
