// api to create new ethereum wallet address with private key
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../lib/auth-helper";
import { supabaseClient } from "@/lib/superbase-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check if method is POST
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // // check if user is logged in
  const session = await getSession(req, res)
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // get user id and email from session
  const { id } = session.user;
  
  // find user wallet data
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase
      .from('wallet_data')
      .select('wallet_address, email, user_id, question1, question2, question3, answer1, answer2, answer3')
      .eq('user_id', id)
      .single();

    // console.log(data, error);
    if (error) {
      console.log(error);
      res.status(400).json({ message: 'Failed to check user wallet data', error });
      return;
    }

    if (!data) {
      res.status(200).json({ hasSecretQuestions: false });
      return;
    }

    const hasSecretQuestions = data.question1 && data.question2 && data.question3 && data.answer1 && data.answer2 && data.answer3;
    res.status(200).json({ hasSecretQuestions });
  } catch (error) {
    res.status(400).json({ message: 'Failed to check user wallet data', error });
  }
}