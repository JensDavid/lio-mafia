import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Avatar,
  Btn,
  Journey,
  SectionLabel,
  Tag,
  buttonClass,
} from "@/components/mafia/primitives";
import { ConnectModal, IntroModal } from "@/components/mafia/modals";
import { useDemo } from "@/components/mafia/demo-state";
import { getMember, playbooks } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/network/$memberId")({
  loader: ({ params }) => {
    const m = getMember(params.memberId);
    if (!m) throw notFound();
    return m;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.name, `${loaderData.name}, ${loaderData.title}. ${loaderData.badge}.`)
      : pageHead("Member", "Lio Mafia member"),
  component: Profile,
});

const STAGE_IDX = { Operator: 0, Builder: 1, Founder: 2, Backer: 3 };

function Profile() {
  const original = Route.useLoaderData();
  const { profile } = useDemo();
  const own = original.id === "jens-fischer";
  const m = own
    ? {
        ...original,
        name: profile.name,
        title: `${profile.role} · Lio`,
        city: profile.city,
        helpWith: profile.helpWith,
        lookingFor: profile.lookingFor,
        openTo: profile.openTo,
      }
    : original;
  const [intro, setIntro] = useState(false);
  const [connect, setConnect] = useState(false);
  const shared = playbooks.filter((p) => p.author === m.id);
  const imp = m.impact ?? { intros: 0, mentored: 0, backed: 0, playbooks: 0 };
  return (
    <div key={m.id}>
      <Link to="/network" className="text-sm text-muted-foreground hover:text-foreground">
        ← Network
      </Link>
      <header className="mt-8 grid gap-8 border-b border-border pb-10 md:grid-cols-[auto_1fr_auto] md:items-end animate-rise">
        <Avatar id={m.id} initials={m.initials} size="xl" />
        <div>
          <h1 className="display text-5xl md:text-6xl">{m.name}</h1>
          <p className="mt-2 text-lg">{m.title}</p>
          <p className="text-muted-foreground">
            {m.badge} · {m.city}
          </p>
          <div className="mt-5">
            <Journey current={STAGE_IDX[m.stage]} />
          </div>
        </div>
        <div className="flex gap-2">
          {m.openTo.includes("Co-founding") && (
            <Btn variant="outline" onClick={() => setConnect(true)}>
              Connect
            </Btn>
          )}
          {own ? (
            <Link to="/profile/edit" className={buttonClass()}>
              Edit founder profile →
            </Link>
          ) : (
            <Btn onClick={() => setIntro(true)}>Request an Intro</Btn>
          )}
        </div>
      </header>

      {own && (
        <section className="mt-8">
          <SectionLabel>Building</SectionLabel>
          <Link to="/build/matchmaker" className="display text-3xl">
            Matchmaker →
          </Link>
        </section>
      )}
      <section className="mt-12">
        <SectionLabel>Mafia impact</SectionLabel>
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
          {[
            [imp.intros, "intros made"],
            [imp.mentored, "builders mentored"],
            [imp.backed, "Mafia companies backed"],
            [imp.playbooks, "playbooks shared"],
          ].map(([n, l]) => (
            <div
              key={l as string}
              className="border-l border-border pl-5 first:border-l-0 first:pl-0"
            >
              <div className="display text-6xl">{n}</div>
              <div className="mt-2 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 grid gap-12 md:grid-cols-3">
        <section>
          <SectionLabel>Can help with</SectionLabel>
          <ul className="space-y-2">
            {m.helpWith.map((h) => (
              <li key={h} className="text-lg tracking-tight">
                {h}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <SectionLabel>Open to</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {m.openTo.map((h) => (
              <Tag key={h} tone="outline">
                {h}
              </Tag>
            ))}
          </div>
        </section>
        <section>
          <SectionLabel>Looking for</SectionLabel>
          <ul className="mb-6 space-y-2">
            {(m.lookingFor ?? m.openTo).map((h) => (
              <li key={h} className="text-lg">
                {h}
              </li>
            ))}
          </ul>
          {!own && <SectionLabel>Can introduce you to</SectionLabel>}
          <ul className="space-y-2">
            {m.canIntroduce?.map((h) => (
              <li key={h} className="text-lg capitalize tracking-tight">
                {h}
              </li>
            ))}
          </ul>
          {!own && (
            <button
              type="button"
              onClick={() => setIntro(true)}
              className="mt-4 text-sm font-medium hover:underline"
            >
              Request an Intro →
            </button>
          )}
        </section>
      </div>

      <section className="mt-16">
        <SectionLabel>Shared playbooks</SectionLabel>
        {shared.length ? (
          <div className="divide-y divide-border">
            {shared.map((p) => (
              <Link
                key={p.id}
                to="/playbooks/$playbookId"
                params={{ playbookId: p.id }}
                className="flex items-center justify-between py-4 transition hover:opacity-70"
              >
                <span className="text-lg font-medium tracking-tight">{p.title}</span>
                <span className="text-sm text-muted-foreground">{p.read} min →</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No playbooks yet.</p>
        )}
      </section>

      {!own && <IntroModal member={m} open={intro} onOpenChange={setIntro} />}
      <ConnectModal memberId={m.id} open={connect} onOpenChange={setConnect} />
    </div>
  );
}
