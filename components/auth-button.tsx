import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="auth-actions">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="auth-actions">
      <Link href="/auth/login" className="button button-secondary">
        Sign in
      </Link>
      <Link href="/auth/sign-up" className="button button-primary">
        Sign up
      </Link>
    </div>
  );
}
