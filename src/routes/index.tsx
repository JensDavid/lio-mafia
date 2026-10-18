import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar } from "@/components/mafia/primitives";
import { LioLogo } from "@/components/mafia/lio-logo";
import { useDemo } from "@/components/mafia/demo-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Lio Mafia — Built inside Lio. Built beyond Lio." },
      {
        name: "description",
        content: "The network that turns operators into builders, founders and backers.",
      },
      { property: "og:title", content: "Lio Mafia" },
      {
        property: "og:description",
        content: "The network that turns operators into builders, founders and backers.",
      },
    ],
  }),
  component: Entry,
});

function Entry() {
  const { profile } = useDemo();
  return (
    <div className="flex min-h-screen flex-col px-6 py-8 md:px-12">
      <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
        PRIVATE · MEMBERS ONLY
      </div>
      <div className="mx-auto w-full max-w-[1200px] flex-1 py-16 md:py-20">
        <div className="animate-rise">
          <LioLogo className="mb-12" showWordmark={false} />
          <h1 className="display text-7xl md:text-[9rem]">Lio Mafia</h1>
          <p className="mt-8 text-2xl">Built inside Lio. Built beyond Lio.</p>
        </div>
        <div
          className="mt-14 max-w-lg border-t border-border pt-8 animate-rise"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex items-center gap-4">
            <Avatar id="jens-fischer" initials="JF" size="lg" />
            <div>
              <div className="text-lg font-semibold tracking-tight">{profile.name}</div>
            </div>
          </div>
          <Link
            to="/home"
            className="mt-6 flex h-11 w-full items-center justify-between rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Enter the Mafia <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
