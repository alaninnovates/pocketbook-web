import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="app-shell">
      <div className="app-frame">
        <nav className="site-nav">
          <div className="site-nav-inner">
            <div className="brand-row">
              <Link href={"/"}>Next.js Supabase Starter</Link>
            </div>
              <Suspense>
                  <AuthButton />
              </Suspense>
          </div>
        </nav>
        <div className="content-shell">
          {children}
        </div>
      </div>
    </main>
  );
}
