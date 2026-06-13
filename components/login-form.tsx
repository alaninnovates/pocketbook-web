"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
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
          <h1 className="card-title">Login</h1>
          <p className="card-description">
            Enter your email below to login to your account
          </p>
        </header>
        <div className="card-content">
          <form onSubmit={handleLogin}>
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
                <div className="field-row">
                  <label htmlFor="password">Password</label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-link"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <input
                  className="input"
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button className="button button-primary full-width" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="form-footer">
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="text-link">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
