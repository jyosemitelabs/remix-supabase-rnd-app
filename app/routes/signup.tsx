import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { signUpWithEmail } from "~/utils/supabase.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    throw new Error("Missing email or password");
  }
  console.log("signinup...", email, password);
  const { data: user, error } = await signUpWithEmail(email, password);
  return { user, error };
};

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h2> Sign up in Voirdier</h2>
      <Form method="post">
        <div className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            placeholder="Type your email address"
          />
          <input
            name="password"
            type="password"
            placeholder="Type your password"
          />
          <button
            type="submit"
            className="border border-slate-300 py-2 px-3 rounded"
          >
            Sign Up
          </button>
        </div>
      </Form>
    </div>
  );
}
