"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
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
          <h1 className="card-title">Reset Your Password</h1>
          <p className="card-description">
            Please enter your new password below.
          </p>
        </header>
        <div className="card-content">
          <form onSubmit={handleForgotPassword}>
            <div className="form-stack">
              <div className="field">
                <label htmlFor="password">New password</label>
                <input
                  className="input"
                  id="password"
                  type="password"
                  placeholder="New password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button className="button button-primary full-width" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save new password"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
