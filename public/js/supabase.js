import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://xiysixocmsmrvrbdinlq.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpeXNpeG9jbXNtcnZyYmRpbmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODcwMzYsImV4cCI6MjA4MDA2MzAzNn0.K9iSLaX4Fhyetup9P3T_t7Ry_JEhFz5mKjDQKaO2LZw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
