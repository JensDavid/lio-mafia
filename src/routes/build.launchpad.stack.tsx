import { createFileRoute, Link } from "@tanstack/react-router";
import { BuildNav } from "@/components/mafia/section-nav";
import { useState } from "react";
import { Avatar, PageHeader, SectionLabel, Tag } from "@/components/mafia/primitives";
import { IntroModal } from "@/components/mafia/modals";
import { getMember, tools, type Tool } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/build/launchpad/stack")({
  head: () => pageHead("Stack", "Use what Lio and Mafia founders already know works."),
  component: Stack,
});

function Stack() {
  const [ask, setAsk] = useState<Tool | null>(null);
  const askExpert = ask ? getMember(ask.experts[0] ?? "") : undefined;
  const sections = ["Infrastructure", "Product", "GTM", "Operations"];
  return (
    <div>
      <BuildNav />
      <Link to="/build/launchpad" className="text-sm text-muted-foreground hover:text-foreground">
        ← Launchpad
      </Link>
      <div className="mt-8">
        <PageHeader
          size="sm"
          eyebrow="Launchpad · Stack"
          title="Stack"
          sub="Don't start from zero. Use what Lio and Mafia founders already know works."
        />
      </div>
      <div className="mb-10 flex flex-wrap gap-6 text-sm">
        <span className="flex items-center gap-2">
          <Tag tone="solid">Lio experience</Tag> Operators know it from inside Lio
        </span>
        <span className="flex items-center gap-2">
          <Tag tone="outline">Mafia recommended</Tag> Founders use it to build
        </span>
      </div>
      <div className="space-y-14">
        {sections.map((s) => (
          <section key={s}>
            <SectionLabel>{s}</SectionLabel>
            <div className="divide-y divide-border">
              {tools
                .filter((t) => t.section === s)
                .map((t) => (
                  <div
                    key={t.name}
                    className="grid items-center gap-4 py-5 md:grid-cols-[1.2fr_1.6fr_1fr_auto]"
                  >
                    <div>
                      <div className="text-lg font-semibold tracking-tight">{t.name}</div>
                      <div className="mt-1">
                        <Tag tone={t.label === "LIO EXPERIENCE" ? "solid" : "outline"}>
                          {t.label}
                        </Tag>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div>{t.use}</div>
                      <div className="text-muted-foreground">{t.why}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {t.experts.map((e) => (
                          <Avatar
                            key={e}
                            id={e}
                            initials={getMember(e)?.initials ?? ""}
                            size="sm"
                            className="ring-2 ring-background"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {t.experts.length} with experience
                      </span>
                    </div>
                    {t.cta === "View Playbook" ? (
                      <Link
                        to="/playbooks/$playbookId"
                        params={{ playbookId: "startup-stack" }}
                        className="text-sm font-medium hover:underline"
                      >
                        View Playbook →
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAsk(t)}
                        className="text-left text-sm font-medium hover:underline"
                      >
                        {t.cta} →
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
      {ask && askExpert && (
        <IntroModal
          key={ask.name}
          member={askExpert}
          open={!!ask}
          onOpenChange={(o) => !o && setAsk(null)}
          target={{
            to: `${ask.name} conversation`,
            toTitle: "20 min",
            message: `I'm setting up the stack for Matchmaker and would love to hear how you've used ${ask.name} — what worked and what you'd avoid.`,
          }}
        />
      )}
    </div>
  );
}
