import { createClient } from "@supabase/supabase-js";
import { getSession } from "./session.server";

// see documention about using .env variables
// https://remix.run/docs/en/v1/guides/envvars#server-environment-variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export async function loginWithEmail(email: string, password: string) {
  return await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
}

export async function logout() {
  return await supabaseClient.auth.signOut();
}

export async function signUpWithEmail(email: string, password: string) {
  return await supabaseClient.auth.signUp({
    email,
    password,
  });
}

/**
 *
 * @param {*} request
 * @returns
 */
export const hasAuthSession = async (request: Request) => {
  let session = await getSession(request.headers.get("Cookie"));
  console.log("session: ", session);
  if (!session.has("access_token")) {
    throw new Error("No session");
  }
  supabaseClient.auth.setSession(session.get("access_token"));
};
