import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY } from '$env/static/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'

export const supabase = createClient(PUBLIC_SUPABASE_URL,SUPABASE_KEY);