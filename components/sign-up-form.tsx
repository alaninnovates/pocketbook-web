"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`auth-form ${className ?? ""}`} {...props}>
      <section className="card">
        <header className="card-header">
          <h1 className="card-title">Sign up</h1>
          <p className="card-description">Create a new account</p>
        </header>
        <div className="card-content">
          <form onSubmit={handleSignUp}>
            <div className="form-stack">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  className="input"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  className="input"
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="repeat-password">Repeat Password</label>
                <input
                  className="input"
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button className="button button-primary full-width" type="submit" disabled={isLoading}>
                {isLoading ? "Creating an account..." : "Sign up"}
              </button>
            </div>
            <div className="form-footer">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
