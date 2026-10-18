import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, Btn, SectionLabel, Tag } from "@/components/mafia/primitives";
import { IntroModal } from "@/components/mafia/modals";
import { useDemo } from "@/components/mafia/demo-state";
import { getMember, getPlaybook } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/playbooks/$playbookId")({
  loader: ({ params }) => {
    const p = getPlaybook(params.playbookId);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.title, `A Lio Mafia playbook on ${loaderData.topic}.`)
      : pageHead("Playbook", "Shared knowledge from the Lio Mafia."),
  component: Playbook,
});

function Playbook() {
  const p = Route.useLoaderData();
  const author = getMember(p.author);
  const { saved, toggleSave } = useDemo();
  const [ask, setAsk] = useState(false);
  const paths = [...new Set(p.helpers.flatMap((h) => getMember(h)?.canIntroduce ?? []))];
  if (!author) return null;
  return (
    <div key={p.id}>
      <Link to="/playbooks" className="text-sm text-muted-foreground hover:text-foreground">
        ← Playbooks
      </Link>
      <article className="mx-auto mt-10 max-w-2xl">
        <div className="eyebrow">
          {p.topic} · {p.read} min read
        </div>
        <h1 className="display mt-4 text-5xl md:text-6xl">{p.title}</h1>
        <Link
          to="/network/$memberId"
          params={{ memberId: author.id }}
          className="mt-6 flex items-center gap-3 text-sm hover:opacity-70"
        >
          <Avatar id={author.id} initials={author.initials} size="md" />
          <span>
            <span className="block font-medium">{author.name}</span>
            <span className="block text-xs text-muted-foreground">{author.title}</span>
          </span>
        </Link>
        <Btn variant="outline" className="mt-5" onClick={() => toggleSave(p.id)}>
          {saved.includes(p.id) ? "Saved ✓" : "Save playbook"}
        </Btn>
        <div className="mt-12 space-y-12 border-t border-border pt-10">
          {p.sections.map((s, i) => (
            <section
              key={s.t}
              className="grid grid-cols-[48px_1fr] animate-rise"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="font-mono text-sm text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{s.t}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{s.b}</p>
              </div>
            </section>
          ))}
        </div>
      </article>
      <section className="mx-auto mt-20 max-w-2xl">
        <SectionLabel>From reading to doing</SectionLabel>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="eyebrow mb-3">People who can help</div>
            <ul className="space-y-3">
              {p.helpers.map((h) => {
                const m = getMember(h);
                if (!m) return null;
                return (
                  <li key={h}>
                    <Link
                      to="/network/$memberId"
                      params={{ memberId: h }}
                      className="flex items-center gap-3 hover:opacity-70"
                    >
                      <Avatar id={m.id} initials={m.initials} size="sm" />
                      <span className="text-sm font-medium">{m.name}</span>
                      <span className="text-xs text-muted-foreground">{m.badge}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-3">Warm paths</div>
            <div className="text-2xl font-semibold tracking-tight">
              {paths.length} warm {paths.length === 1 ? "path" : "paths"} via these members
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {paths.map((t) => (
                <Tag key={t} tone="outline">
                  {t}
                </Tag>
              ))}
            </div>
            <Btn className="mt-5" onClick={() => setAsk(true)}>
              Ask {author.name.split(" ")[0]}
            </Btn>
          </div>
        </div>
      </section>
      <IntroModal
        member={author}
        open={ask}
        onOpenChange={setAsk}
        target={{
          to: author.name,
          toTitle: "20 min call",
          message: `I just read "${p.title}". I'm validating Matchmaker and would love 20 minutes to pressure-test how it applies.`,
        }}
      />
    </div>
  );
}
