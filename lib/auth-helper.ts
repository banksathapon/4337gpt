import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from "next";

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}