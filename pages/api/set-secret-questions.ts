import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../lib/auth-helper";
import { supabaseClient } from "@/lib/superbase-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check if method is POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // check if user is logged in
  const session = await getSession(req, res)
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // get user id from session
  const { id } = session.user;

  // get secret questions from request json body
  const { q1, q2, q3, a1, a2, a3 } = req.body;

  // update wallet data by id
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase
      .from('wallet_data')
      .update({ 
        question1: q1,
        question2: q2,
        question3: q3,
        answer1: a1,
        answer2: a2,
        answer3: a3,
       })
      .eq('user_id', id);
    
    console.log(data, error);
    if (error) {
      throw error;
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to update wallet data', error });
  }

  res.status(200).json({ message: 'Success' });
}