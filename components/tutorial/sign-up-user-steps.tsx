import Link from "next/link";
import { TutorialStep } from "./tutorial-step";

export function SignUpUserSteps() {
  return (
    <ol className="tutorial-list">
      {process.env.VERCEL_ENV === "preview" ||
      process.env.VERCEL_ENV === "production" ? (
        <TutorialStep title="Set up redirect urls">
          <p>It looks like this App is hosted on Vercel.</p>
          <p className="stacked-paragraph">
            This particular deployment is
            <code className="inline-code">
              &quot;{process.env.VERCEL_ENV}&quot;
            </code>{" "}
            on
            <code className="inline-code">
              https://{process.env.VERCEL_URL}
            </code>
            .
          </p>
          <p className="stacked-paragraph">
            You will need to{" "}
            <Link
              className="text-link"
              href={
                "https://supabase.com/dashboard/project/_/auth/url-configuration"
              }
            >
              update your Supabase project
            </Link>{" "}
            with redirect URLs based on your Vercel deployment URLs.
          </p>
          <ul className="stacked-list">
            <li>
              -{" "}
              <code className="inline-code">
                http://localhost:3000/**
              </code>
            </li>
            <li>
              -{" "}
              <code className="inline-code">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/**`}
              </code>
            </li>
            <li>
              -{" "}
              <code className="inline-code">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
                  ".vercel.app",
                  "",
                )}-*-[vercel-team-url].vercel.app/**`}
              </code>{" "}
              (Vercel Team URL can be found in{" "}
              <Link
                className="text-link"
                href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                target="_blank"
              >
                Vercel Team settings
              </Link>
              )
            </li>
          </ul>
          <Link
            href="https://supabase.com/docs/guides/auth/redirect-urls#vercel-preview-urls"
            target="_blank"
            className="text-link docs-link"
          >
            Redirect URLs Docs
          </Link>
        </TutorialStep>
      ) : null}
      <TutorialStep title="Sign up your first user">
        <p>
          Head over to the{" "}
          <Link
            href="auth/sign-up"
            className="strong-link"
          >
            Sign up
          </Link>{" "}
          page and sign up your first user. It&apos;s okay if this is just you
          for now. Your awesome idea will have plenty of users later!
        </p>
      </TutorialStep>
    </ol>
  );
}
