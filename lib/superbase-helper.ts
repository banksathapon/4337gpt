import { createClient } from '@supabase/supabase-js';

export function supabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or Service Role Key");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

export async function getSecretQuestions(user_id: string) {
  const supabase = supabaseClient();
  const { data, error } = await supabase
      .from('wallet_data')
      .select('wallet_address, email, user_id, question1, question2, question3, answer1, answer2, answer3')
      .eq('user_id', user_id)
      .single();
    
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}