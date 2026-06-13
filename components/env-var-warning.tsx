export function EnvVarWarning() {
  return (
    <div className="auth-actions">
      <span className="badge">
        Supabase environment variables required
      </span>
      <div className="auth-actions">
        <button className="button button-secondary" disabled>
          Sign in
        </button>
        <button className="button button-primary" disabled>
          Sign up
        </button>
      </div>
    </div>
  );
}
