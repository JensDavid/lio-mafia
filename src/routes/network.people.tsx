import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MemberCard } from "@/components/mafia/member-card";
import { PageHeader } from "@/components/mafia/primitives";
import { members } from "@/lib/data";
import { NetworkNav } from "@/components/mafia/section-nav";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CHIPS = [
  "Technical Co-Founder",
  "Consumer Product",
  "Sports",
  "US Fundraising",
  "AI Infrastructure",
  "Enterprise GTM",
];
const CHIP_TERMS: Record<string, string[]> = {
  "Technical Co-Founder": ["co-founding", "full stack", "ai"],
  "Consumer Product": ["consumer"],
  Sports: ["sports"],
  "US Fundraising": ["fundraising", "us expansion"],
  "AI Infrastructure": ["ai infrastructure", "ai"],
  "Enterprise GTM": ["enterprise gtm", "gtm"],
};
const FILTERS = ["All", "People", "Mentors", "Founders", "Backers"] as const;
type Filter = (typeof FILTERS)[number];

export const Route = createFileRoute("/network/people")({
  validateSearch: (s: Record<string, unknown>): { filter?: Filter; chip?: string } => ({
    ...(FILTERS.includes(s["filter"] as Filter) ? { filter: s["filter"] as Filter } : {}),
    ...(CHIPS.includes(s["chip"] as string) ? { chip: s["chip"] as string } : {}),
  }),
  head: () => pageHead("People", "Find the person who can unlock your next move."),
  component: People,
});

function People() {
  const search = Route.useSearch();
  const [q, setQ] = useState("");
  const [chip, setChip] = useState<string | null>(search.chip ?? null);
  const [f, setF] = useState<Filter>(search.filter ?? "All");
  const list = useMemo(
    () =>
      members
        .filter((m) => {
          const hay = [m.name, m.title, m.badge, ...m.skills, ...m.helpWith, ...m.openTo]
            .join(" ")
            .toLowerCase();
          if (f !== "All" && m.type !== f) return false;
          if (q && !hay.includes(q.toLowerCase())) return false;
          if (chip && !(CHIP_TERMS[chip] ?? []).some((t) => hay.includes(t))) return false;
          return true;
        })
        .sort((a, b) => (b.match ?? 0) - (a.match ?? 0)),
    [q, chip, f],
  );

  return (
    <div>
      <NetworkNav />
      <PageHeader
        size="sm"
        eyebrow="Network · 1,240 members"
        title="People"
        sub="Find the person who can unlock your next move."
      />
      <div className="flex items-center gap-3 border-b-2 border-foreground pb-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search people, expertise, companies or connections…"
          aria-label="Search members"
          className="flex-1 bg-transparent text-base md:text-xl outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {CHIPS.map((c) => (
          <button
            type="button"
            key={c}
            aria-pressed={chip === c}
            onClick={() => setChip(chip === c ? null : c)}
            className="chip"
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-b border-border">
        <div className="flex flex-wrap gap-6">
          {FILTERS.map((x) => (
            <button
              type="button"
              key={x}
              aria-pressed={f === x}
              onClick={() => setF(x)}
              className={cn("section-tab -mb-px", f === x && "active")}
            >
              {x}
            </button>
          ))}
        </div>
        <span className="eyebrow">{list.length} results · sorted by Matchmaker fit</span>
      </div>
      <div key={`${q}${chip}${f}`} className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <MemberCard key={m.id} m={m} />
        ))}
        {list.length === 0 && (
          <p className="py-6 text-sm text-muted-foreground">
            No one matches yet — try Ask the Mafia.
          </p>
        )}
      </div>
    </div>
  );
}
