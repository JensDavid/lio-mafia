import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Avatar, PageHeader, Tag } from "@/components/mafia/primitives";
import { PLAYBOOK_CATEGORIES, getMember, playbooks } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/playbooks/")({
  head: () => pageHead("Playbooks", "Don't relearn what the Mafia already knows."),
  component: Playbooks,
});

function Playbooks() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const list = playbooks.filter(
    (p) =>
      (!cat || p.tags.includes(cat) || p.topic === cat) &&
      (!q || `${p.title} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <div>
      <PageHeader
        eyebrow="Playbooks · 86 shared"
        title="Don't relearn what the Mafia already knows."
      />
      <div className="flex items-center gap-3 border-b-2 border-foreground pb-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What are you trying to figure out?"
          aria-label="Search playbooks"
          className="flex-1 bg-transparent text-base md:text-xl outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {PLAYBOOK_CATEGORIES.map((c) => (
          <button
            type="button"
            key={c}
            aria-pressed={cat === c}
            onClick={() => setCat(cat === c ? null : c)}
            className="chip"
          >
            {c}
          </button>
        ))}
      </div>
      <div key={`${q}${cat}`} className="mt-10 divide-y divide-border border-y border-border">
        {list.map((p) => (
          <Link
            key={p.id}
            to="/playbooks/$playbookId"
            params={{ playbookId: p.id }}
            className="group grid gap-3 py-6 animate-rise md:grid-cols-[140px_1fr_200px] md:items-center"
          >
            <span className="eyebrow">{p.topic}</span>
            <div>
              <div className="display text-3xl transition group-hover:translate-x-0.5">
                {p.title}
              </div>
              <div className="mt-2 flex gap-1">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar id={p.author} initials={getMember(p.author)?.initials ?? ""} size="md" />
              <div>
                <div className="text-sm font-medium">{getMember(p.author)?.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {getMember(p.author)?.title}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {!list.length && (
          <p className="py-6 text-sm text-muted-foreground">Nothing yet — try Ask the Mafia.</p>
        )}
      </div>
    </div>
  );
}
