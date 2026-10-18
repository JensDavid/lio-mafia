import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BuildNav } from "@/components/mafia/section-nav";
import { Avatar, Btn, PageHeader, SectionLabel } from "@/components/mafia/primitives";
import { IntroModal } from "@/components/mafia/modals";
import { MemberCard } from "@/components/mafia/member-card";
import { designPartnerPaths, getMember, type Member } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/build/launchpad/customers")({
  head: () =>
    pageHead(
      "Customers & Partners",
      "Find early design partners and warm sports and media introductions for Matchmaker.",
    ),
  component: Customers,
});

function Customers() {
  const [ask, setAsk] = useState<Member | null>(null);
  const paths = designPartnerPaths
    .map((id) => getMember(id))
    .filter((m): m is Member => !!m?.intro);
  return (
    <div>
      <BuildNav />
      <Link to="/build/launchpad" className="text-sm text-muted-foreground hover:text-foreground">
        ← Launchpad
      </Link>
      <div className="mt-8">
        <PageHeader
          size="sm"
          eyebrow="Launchpad · Customers & Partners"
          title="Customers & Partners"
          sub="Find your first believers: warm paths to sports, media and consumer product teams."
        />
      </div>

      <section>
        <SectionLabel right={<span className="eyebrow">{paths.length} warm paths</span>}>
          First partners for Matchmaker
        </SectionLabel>
        <ul className="divide-y divide-border border-b border-border">
          {paths.map((m) => (
            <li
              key={m.id}
              className="grid gap-4 py-6 md:grid-cols-[1.4fr_1fr_auto] md:items-center"
            >
              <div>
                <div className="display text-3xl">{m.intro?.toTitle.split(" · ").at(-1)}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {m.intro?.to} · {m.intro?.toTitle.split(" · ")[0]}
                </div>
              </div>
              <Link
                to="/network/$memberId"
                params={{ memberId: m.id }}
                className="flex items-center gap-3 text-sm hover:opacity-70"
              >
                <Avatar id={m.id} initials={m.initials} size="sm" />
                <span>
                  via <span className="font-medium">{m.name}</span>
                  <span className="block text-xs text-muted-foreground">{m.title}</span>
                </span>
              </Link>
              <Btn onClick={() => setAsk(m)}>Request intro</Btn>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionLabel>People who open these doors</SectionLabel>
        <div className="grid gap-x-8 md:grid-cols-3">
          {paths.map((m) => (
            <MemberCard key={m.id} m={m} />
          ))}
        </div>
      </section>

      {ask && (
        <IntroModal
          key={ask.id}
          member={ask}
          open={!!ask}
          onOpenChange={(o) => !o && setAsk(null)}
        />
      )}
    </div>
  );
}
