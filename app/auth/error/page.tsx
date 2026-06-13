import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {params?.error ? (
        <p className="muted-text">
          Code error: {params.error}
        </p>
      ) : (
        <p className="muted-text">
          An unspecified error occurred.
        </p>
      )}
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-form">
          <section className="card">
            <header className="card-header">
              <h1 className="card-title">Sorry, something went wrong.</h1>
            </header>
            <div className="card-content">
              <Suspense>
                <ErrorContent searchParams={searchParams} />
              </Suspense>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
