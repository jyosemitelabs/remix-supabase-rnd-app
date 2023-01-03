import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node"; // change this import to whatever runtime you are using
import { loginWithEmail } from "~/utils/supabase.server";
import { commitSession, getSession } from "~/utils/session.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data: user, error } = await loginWithEmail(email, password);
  if (user) {
    // get session and set access_token
    let session = await getSession(request.headers.get("Cookie"));
    session.set("access_token", user.session?.access_token);
    // redirect to page with the cookie set in header
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return { user, error };
};

export default function Index() {
  return (
    <div>
      <h1>Login to Voirdier</h1>
      <Form method="post">
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <button type="submit">Sign In</button>
      </Form>
    </div>
  );
}
