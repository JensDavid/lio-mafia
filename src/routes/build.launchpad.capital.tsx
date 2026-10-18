import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { BuildNav } from "@/components/mafia/section-nav";
import { PageHeader, SectionLabel } from "@/components/mafia/primitives";
import { MemberCard } from "@/components/mafia/member-card";
import { useDemo } from "@/components/mafia/demo-state";
import { roundReadiness } from "@/lib/community";
import { members } from "@/lib/data";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/build/launchpad/capital")({
  head: () =>
    pageHead("Capital", "Prepare a seed round with experienced Lio founders and backers."),
  component: Capital,
});

function Capital() {
  const { tasks } = useDemo();
  const ready = roundReadiness.filter((r) => tasks[r.stage]?.includes(r.task)).length;
  return (
    <div>
      <BuildNav />
      <Link to="/build/launchpad" className="text-sm text-muted-foreground hover:text-foreground">
        ← Launchpad
      </Link>
      <div className="mt-8">
        <PageHeader
          size="sm"
          eyebrow="Launchpad · Capital"
          title="Capital"
          sub="Capital with context: prepare the story, hit the milestones and meet backers who know the journey."
        />
      </div>

      <section>
        <SectionLabel
          right={
            <span className="eyebrow">
              {ready} / {roundReadiness.length} ready
            </span>
          }
        >
          Round readiness · what pre-seed backers will ask for
        </SectionLabel>
        <ul className="divide-y divide-border border-b border-border">
          {roundReadiness.map((r) => {
            const done = tasks[r.stage]?.includes(r.task) ?? false;
            return (
              <li key={r.label}>
                <Link
                  to="/build/track"
                  className="flex items-center justify-between gap-4 py-3 transition hover:opacity-70"
                >
                  <span className={cn("flex items-center gap-3", !done && "text-muted-foreground")}>
                    <span
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full border",
                        done
                          ? "border-foreground bg-foreground text-primary-foreground"
                          : "border-border-strong",
                      )}
                    >
                      {done && <Check className="h-2.5 w-2.5" />}
                    </span>
                    {r.label}
                  </span>
                  <span className="text-xs text-muted-foreground">Founder Track →</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          to="/playbooks/$playbookId"
          params={{ playbookId: "pre-seed" }}
          className="mt-5 inline-block text-lg hover:underline"
        >
          Raising a pre-seed without a network →
        </Link>
      </section>

      <section className="mt-12">
        <SectionLabel>Backers who know the journey</SectionLabel>
        <div className="grid gap-x-8 md:grid-cols-2">
          {members
            .filter((m) => m.type === "Backers")
            .map((m) => (
              <MemberCard key={m.id} m={m} />
            ))}
        </div>
      </section>
    </div>
  );
}
