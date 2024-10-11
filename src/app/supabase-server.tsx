import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import dotenv from 'dotenv'

dotenv.config({
  path: '.env.local'
})

export const createServerSupabaseClient = cache(() => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  console.log(supabaseKey)
  console.log(supabaseUrl)

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createServerComponentClient({
    cookies,
    supabaseUrl,
    supabaseKey,
  });
});

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getSupabase() {
  const supabase = createServerSupabaseClient();
  try {
    return supabase;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
