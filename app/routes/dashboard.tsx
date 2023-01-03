import { json, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node"; // change this import to whatever runtime you are using
import { hasAuthSession, supabaseClient } from "~/utils/supabase.server";

export const loader = async ({ request }: LoaderArgs) => {
  try {
    await hasAuthSession(request);
    const response = new Response();
    // const { data } = await supabaseClient.from("test").select("*");

    return json(
      { data: [] },
      {
        headers: response.headers,
      }
    );
  } catch (e) {
    return redirect("/", {});
  }
};

export default function Dashboard() {
  return <div>Welcome to Voirdire Dashboard.</div>;
}
