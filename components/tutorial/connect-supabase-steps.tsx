import { TutorialStep } from "./tutorial-step";

export function ConnectSupabaseSteps() {
  return (
    <ol className="tutorial-list">
      <TutorialStep title="Create Supabase project">
        <p>
          Head over to{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="strong-link"
            rel="noreferrer"
          >
            database.new
          </a>{" "}
          and create a new Supabase project.
        </p>
      </TutorialStep>

      <TutorialStep title="Declare environment variables">
        <p>
          Rename the{" "}
          <code className="inline-code">
            .env.example
          </code>{" "}
          file in your Next.js app to{" "}
          <code className="inline-code">
            .env.local
          </code>{" "}
          and populate with values from{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="strong-link"
            rel="noreferrer"
          >
            your Supabase project&apos;s API Settings
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep title="Restart your Next.js development server">
        <p>
          You may need to quit your Next.js development server and run{" "}
          <code className="inline-code">
            npm run dev
          </code>{" "}
          again to load the new environment variables.
        </p>
      </TutorialStep>

      <TutorialStep title="Refresh the page">
        <p>
          You may need to refresh the page for Next.js to load the new
          environment variables.
        </p>
      </TutorialStep>
    </ol>
  );
}
