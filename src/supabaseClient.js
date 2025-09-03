import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://nlwpjpspqumaqcxnecnt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sd3BqcHNwcXVtYXFjeG5lY250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NDY5NjMsImV4cCI6MjA3MjQyMjk2M30.T0lflj7PD1LP4Mp8BQqV4W_7RzKmhyJ3YZHWXY-CTFE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
