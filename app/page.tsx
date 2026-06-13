import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
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
      </div>
    </main>
  );
}
