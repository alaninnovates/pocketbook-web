export default function Page() {
  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-form">
          <section className="card">
            <header className="card-header">
              <h1 className="card-title">Thank you for signing up!</h1>
              <p className="card-description">Check your email to confirm</p>
            </header>
            <div className="card-content">
              <p className="muted-text">
                You&apos;ve successfully signed up. Please check your email to
                confirm your account before signing in.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
