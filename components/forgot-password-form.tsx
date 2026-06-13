"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`auth-form ${className ?? ""}`} {...props}>
      {success ? (
        <section className="card">
          <header className="card-header">
            <h1 className="card-title">Check Your Email</h1>
            <p className="card-description">Password reset instructions sent</p>
          </header>
          <div className="card-content">
            <p className="muted-text">
              If you registered using your email and password, you will receive
              a password reset email.
            </p>
          </div>
        </section>
      ) : (
        <section className="card">
          <header className="card-header">
            <h1 className="card-title">Reset Your Password</h1>
            <p className="card-description">
              Type in your email and we&apos;ll send you a link to reset your
              password
            </p>
          </header>
          <div className="card-content">
            <form onSubmit={handleForgotPassword}>
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
                {error && <p className="form-error">{error}</p>}
                <button className="button button-primary full-width" type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset email"}
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
      )}
    </div>
  );
}
