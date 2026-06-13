import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";

export function Hero() {
  return (
    <div className="hero">
      <div className="logo-row">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="logo-divider" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div>
      <h1 className="visually-hidden">Supabase and Next.js Starter Template</h1>
      <p className="hero-copy">
        The fastest way to build apps with{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="strong-link"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="strong-link"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <div className="hero-rule" />
    </div>
  );
}
