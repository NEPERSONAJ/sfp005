import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cskxdblpdnsnycpamyny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNza3hkYmxwZG5zbnljcGFteW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMzM1ODQsImV4cCI6MjA0OTcwOTU4NH0.IZdl_VhTJ-2fgqMObZbbDNfY55dYHuR9P6JNsnIUWD8';

export const supabase = createClient(supabaseUrl, supabaseKey);