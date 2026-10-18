import { createFileRoute, Link } from "@tanstack/react-router";
import { BuildNav } from "@/components/mafia/section-nav";
import { useState } from "react";
import { Btn, PageHeader, Tag } from "@/components/mafia/primitives";
import { IntroModal } from "@/components/mafia/modals";
import { getMember, partners } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/build/launchpad/legal")({
  head: () =>
    pageHead("Legal & Ops", "Trusted legal and operations partners with warm Mafia relationships."),
  component: Legal,
});

function Legal() {
  const [p, setP] = useState<(typeof partners)[number] | null>(null);
  const contact = p ? getMember(p.contact) : undefined;
  return (
    <div>
      <BuildNav />
      <Link to="/build/launchpad" className="text-sm text-muted-foreground hover:text-foreground">
        ← Launchpad
      </Link>
      <div className="mt-8">
        <PageHeader
          size="sm"
          eyebrow="Launchpad · Legal & Ops"
          title="Legal & Ops"
          sub="Trusted partners for incorporation, equity and contracts — with a warm path in."
        />
      </div>
      <div className="divide-y divide-border border-y border-border">
        {partners.map((x) => (
          <div
            key={x.name}
            className="grid gap-6 py-8 md:grid-cols-[1fr_1.5fr_auto] md:items-center"
          >
            <div>
              <div className="display text-4xl">{x.name}</div>
              <div className="mt-2 flex gap-2">
                <Tag tone="outline">{x.category}</Tag>
                <Tag tone="signal">Warm Mafia relationship</Tag>
              </div>
            </div>
            <div>
              <div className="eyebrow mb-2">Best for</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {x.best.map((b) => (
                  <span key={b}>{b}</span>
                ))}
              </div>
            </div>
            <Btn onClick={() => setP(x)}>Request Intro</Btn>
          </div>
        ))}
      </div>
      {p && contact && (
        <IntroModal
          key={p.name}
          member={contact}
          open={!!p}
          onOpenChange={(o) => !o && setP(null)}
          target={{
            to: p.name,
            toTitle: p.category,
            message: `I'm validating Matchmaker and expect to need help with ${(p.best[0] ?? "").toLowerCase()} soon. Would you be open to introducing me to the ${p.name} team?`,
          }}
        />
      )}
    </div>
  );
}
