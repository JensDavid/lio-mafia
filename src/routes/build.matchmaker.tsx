import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { Avatar, Btn, SectionLabel, Tag } from "@/components/mafia/primitives";
import { ConnectModal } from "@/components/mafia/modals";
import { OpenLoops } from "@/components/mafia/community-cards";
import { useDemo } from "@/components/mafia/demo-state";
import { BuildNav } from "@/components/mafia/section-nav";
import {
  currentStageIndex,
  founderStages,
  nextOpenTask,
  projectFocus,
  projectProgress,
  stageDone,
} from "@/lib/community";
import { founderMatch, getMember, matchmaker, me } from "@/lib/data";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/build/matchmaker")({
  head: () => pageHead("Matchmaker", "Personalized sports discovery for fragmented fans."),
  component: Project,
});

const TESTER_REQUEST =
  "Looking for sports fans who follow more than one league to test the Matchmaker prototype (20 min).";

function Project() {
  const [connect, setConnect] = useState(false);
  const { tasks, requests, loops } = useDemo();
  const next = nextOpenTask(tasks);
  const partner = getMember(founderMatch.member);
  const request = requests.find((r) => r.id === founderMatch.request);
  return (
    <div>
      <BuildNav />
      <header className="mt-8 border-b border-foreground pb-12 animate-rise">
        <div className="flex items-center gap-3">
          <Tag tone="solid">
            {matchmaker.stage} · {projectProgress(tasks)}%
          </Tag>
          <span className="eyebrow">Jens Fischer · since Aug 2026</span>
        </div>
        <h1 className="display mt-6 text-5xl md:text-7xl">Matchmaker</h1>
        <p className="mt-4 text-2xl tracking-tight">{matchmaker.oneLiner}</p>
      </header>

      <dl className="grid gap-8 border-b border-border py-8 md:grid-cols-3">
        <div>
          <dt className="eyebrow mb-1">Problem</dt>
          <dd>{matchmaker.problem}</dd>
        </div>
        <div>
          <dt className="eyebrow mb-1">Hypothesis</dt>
          <dd>
            {matchmaker.hypothesis[0]}
            <br />
            <strong className="font-semibold">{matchmaker.hypothesis[1]}</strong>
          </dd>
        </div>
        <div>
          <dt className="eyebrow mb-2">Needs</dt>
          <dd className="flex flex-wrap gap-1.5">
            {matchmaker.needs.map((n) => (
              <Tag key={n} tone="outline">
                {n}
              </Tag>
            ))}
          </dd>
        </div>
      </dl>

      <section className="mt-8 grid gap-8 border-b border-border pb-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="eyebrow">Your focus this week</div>
          <h2 className="display mt-3 text-3xl">{projectFocus.focus}</h2>
          <div className="eyebrow mt-6">Next milestone</div>
          <Link to="/build/track" className="mt-2 block text-lg font-medium hover:underline">
            {next ?? `Move into ${founderStages[currentStageIndex + 1]?.name ?? "the next stage"}`}{" "}
            →
          </Link>
        </div>
        <div>
          <SectionLabel>Mafia support</SectionLabel>
          <Link
            to="/network/requests"
            search={{ compose: true, mine: false, text: TESTER_REQUEST }}
            className="block py-2 text-sm"
          >
            Ask for {projectFocus.testers} more testers →
          </Link>
          <Link to="/network/people" search={{ filter: "Mentors" }} className="block py-2 text-sm">
            {projectFocus.mentors} product mentors →
          </Link>
          <Link
            to="/playbooks/$playbookId"
            params={{ playbookId: "user-discovery" }}
            className="block py-2 text-sm"
          >
            {projectFocus.playbooks} relevant playbook →
          </Link>
        </div>
      </section>

      {loops.length > 0 && (
        <section className="mt-10">
          <SectionLabel right={<span className="eyebrow">{loops.length} pending</span>}>
            Open loops
          </SectionLabel>
          <OpenLoops />
        </section>
      )}

      <section className="mt-10">
        <SectionLabel>The thesis</SectionLabel>
        <div className="grid gap-8 md:grid-cols-4">
          {matchmaker.thesis.map((t, i) => (
            <div key={t.k}>
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{t.k}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t.v}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 grid gap-14 md:grid-cols-[1fr_1.3fr]">
        <section>
          <SectionLabel
            right={
              <Link
                to="/build/track"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Founder Track →
              </Link>
            }
          >
            Progress
          </SectionLabel>
          <ul className="divide-y divide-border">
            {founderStages.map((s, i) => {
              const done = stageDone(tasks, i);
              const complete = done === s.tasks.length;
              const current = i === currentStageIndex;
              return (
                <li key={s.name}>
                  <Link
                    to="/build/track"
                    className="flex items-center justify-between py-3 transition hover:opacity-70"
                  >
                    <span
                      className={cn(
                        "flex items-center gap-3",
                        !complete && !current && "text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border",
                          complete
                            ? "border-foreground bg-foreground text-primary-foreground"
                            : current
                              ? "border-signal"
                              : "border-border-strong",
                        )}
                      >
                        {complete && <Check className="h-2.5 w-2.5" />}
                      </span>
                      {s.name}
                      {current && <Tag tone="outline">Current</Tag>}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {done} / {s.tasks.length}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <SectionLabel>The Mafia can help</SectionLabel>
          <div className="grid gap-x-8 sm:grid-cols-2">
            <Link to="/network/people" search={{ filter: "Mentors" }} className={cell}>
              <Inner k="Mentors" v="2 consumer product founders" />
            </Link>
            <Link to="/network/$memberId" params={{ memberId: "david-okafor" }} className={cell}>
              <Inner k="Sports Connections" v="4 relevant people" />
            </Link>
            <Link to="/build/launchpad/stack" className={cell}>
              <Inner k="Stack" v="7 recommendations" />
            </Link>
            <Link to="/build/launchpad/legal" className={cell}>
              <Inner k="Legal" v="1 warm relationship" />
            </Link>
          </div>
        </section>
      </div>

      {partner && (
        <section id="founder-matching" className="mt-12 scroll-mt-28">
          <SectionLabel right={<span className="eyebrow">{founderMatch.matches} matches</span>}>
            Founder matching
          </SectionLabel>
          <div className="grid gap-8 border-b border-border pb-8 md:grid-cols-[1fr_auto_1fr_auto] md:items-center">
            <Side id="jens-fischer" initials={me.initials} name="Jens" skills={me.strengths} />
            <div className="text-center">
              <div className="display text-6xl">{founderMatch.score}%</div>
              <div className="eyebrow">Founder match</div>
            </div>
            <Side
              id={partner.id}
              initials={partner.initials}
              name={partner.name.split(" ")[0] ?? partner.name}
              skills={founderMatch.skills}
            />
            <div className="space-y-3 md:border-l md:border-border md:pl-8">
              <div className="eyebrow">Shared interests</div>
              <ul className="text-sm">
                {founderMatch.shared.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="flex gap-2 pt-2">
                <Btn onClick={() => setConnect(true)}>Connect</Btn>
                <Link
                  to="/network/$memberId"
                  params={{ memberId: partner.id }}
                  className="inline-flex h-9 items-center px-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
          {request && (
            <Link
              to="/network/requests/$requestId"
              params={{ requestId: request.id }}
              className="mt-4 inline-block text-sm font-medium hover:underline"
            >
              Your co-founder request · {request.replies.length}{" "}
              {request.replies.length === 1 ? "reply" : "replies"} →
            </Link>
          )}
          <ConnectModal memberId={partner.id} open={connect} onOpenChange={setConnect} />
        </section>
      )}
    </div>
  );
}

function Side({
  id,
  initials,
  name,
  skills,
}: {
  id: string;
  initials: string;
  name: string;
  skills: string[];
}) {
  return (
    <div className="flex items-center gap-4">
      <Avatar id={id} initials={initials} size="lg" />
      <div>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground">{skills.join(" · ")}</div>
      </div>
    </div>
  );
}

const cell = "group block border-b border-border py-5 transition hover:opacity-70";
function Inner({ k, v }: { k: string; v: string }) {
  return (
    <>
      <div className="eyebrow">{k}</div>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-lg font-semibold tracking-tight">{v}</span>
        <span className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground">
          →
        </span>
      </div>
    </>
  );
}
