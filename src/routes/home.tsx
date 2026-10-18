import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Avatar, Modal, SectionLabel, Tag, buttonClass } from "@/components/mafia/primitives";
import { STAGES, getMember, me, matchmaker, nextMoves, pulse } from "@/lib/data";
import { journeyCopy, communityEvents, projectProgress } from "@/lib/community";
import { EventCard, HelpRequests, OpenLoops } from "@/components/mafia/community-cards";
import { useDemo } from "@/components/mafia/demo-state";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/home")({
  head: () =>
    pageHead("Home", "Your journey from operator to backer, and your next moves in the Mafia."),
  component: Home,
});

const meStage = STAGES.findIndex((s) => s.name === me.stage);

function Home() {
  const [event, setEvent] = useState(false);
  const { profile, tasks, loops } = useDemo();
  return (
    <div>
      <section className="animate-rise">
        <h1 className="display text-5xl md:text-7xl">
          Good morning, {profile.name.split(" ")[0]}.
        </h1>
        <p className="mt-3 text-muted-foreground">
          {profile.role} · {me.team} · {profile.city}
        </p>
      </section>

      {/* Journey */}
      <ol className="mt-8 grid gap-6 border-b border-border pb-8 sm:grid-cols-2 md:grid-cols-4">
        {STAGES.map((s, i) => {
          const state = i < meStage ? "done" : i === meStage ? "active" : "next";
          return (
            <li
              key={s.name}
              aria-current={state === "active" ? "step" : undefined}
              className={cn(
                "relative flex flex-col items-start py-4 text-left text-sm",
                state === "next" && "text-muted-foreground",
              )}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border",
                    state === "done" && "border-foreground bg-foreground text-primary-foreground",
                    state === "active" && "border-signal",
                    state === "next" && "border-border-strong",
                  )}
                >
                  {state === "done" && <Check className="h-3 w-3" />}
                  {state === "active" && (
                    <span className="h-2 w-2 rounded-full bg-signal animate-activate" />
                  )}
                </span>
              </div>
              <div
                className={cn("text-2xl font-medium", state === "done" && "text-muted-foreground")}
              >
                {s.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.line}</p>
              {state === "active" && (
                <div className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground " />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-10">
          {/* Currently building */}
          <section>
            <SectionLabel>Currently building</SectionLabel>
            <div className="brand-dark p-7 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <h2 className="display text-5xl md:text-6xl">Matchmaker</h2>
                <Tag tone="solid">
                  {matchmaker.stage} · {projectProgress(tasks)}%
                </Tag>
              </div>
              <p className="mt-4 max-w-md text-xl tracking-tight">{matchmaker.oneLiner}</p>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <Link to="/build/matchmaker" hash="founder-matching" className={statCls}>
                  <StatBody n="3" label="founder matches" />
                </Link>
                <Link to="/network/people" search={{ filter: "Mentors" }} className={statCls}>
                  <StatBody n="2" label="relevant mentors" />
                </Link>
                <Link to="/build/launchpad/stack" className={statCls}>
                  <StatBody n="7" label="stack recommendations" />
                </Link>
              </div>
              <Link to="/build/matchmaker" className={buttonClass("primary", "mt-8 h-10 px-4")}>
                Continue building →
              </Link>
            </div>
          </section>

          {/* Next moves */}
          <section>
            <SectionLabel>Next moves</SectionLabel>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {nextMoves.map((n, i) => {
                const body = (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                    </div>
                    <div className="mt-8 text-lg font-semibold tracking-tight">{n.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{n.meta}</div>
                  </>
                );
                const cls =
                  "group block w-full border-b border-border py-6 text-left transition hover:opacity-70";
                return n.link ? (
                  <Link key={n.title} {...n.link} className={cls}>
                    {body}
                  </Link>
                ) : (
                  <button
                    type="button"
                    key={n.title}
                    onClick={() => setEvent(true)}
                    className={cls}
                  >
                    {body}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Give back */}
          <section>
            <SectionLabel
              right={
                <Link
                  to="/network/requests"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  All requests →
                </Link>
              }
            >
              You can help
            </SectionLabel>
            <HelpRequests />
          </section>
        </div>

        <aside className="space-y-10">
          {loops.length > 0 && (
            <section>
              <SectionLabel right={<span className="eyebrow">{loops.length} pending</span>}>
                Open loops
              </SectionLabel>
              <OpenLoops limit={4} />
            </section>
          )}

          {/* Pulse */}
          <section>
            <SectionLabel
              right={
                <Link to="/network" className="text-xs text-muted-foreground hover:text-foreground">
                  All →
                </Link>
              }
            >
              Mafia pulse
            </SectionLabel>
            <ul className="divide-y divide-border">
              {pulse.map((p) => {
                const m = getMember(p.who);
                if (!m) return null;
                return (
                  <li key={p.what}>
                    <Link
                      to="/network/$memberId"
                      params={{ memberId: m.id }}
                      className="flex gap-3 py-4 transition hover:opacity-70"
                    >
                      <Avatar id={m.id} initials={m.initials} />
                      <div className="flex-1 text-sm">
                        <div>
                          <span className="font-medium">{m.name}</span> {p.what}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {p.meta} · {p.when}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </aside>
      </div>

      {/* Flywheel */}
      <section className="brand-dark -mx-6 mt-12 px-6 py-16 md:-mx-12 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <div className="eyebrow mb-4">The flywheel</div>
            <h2 className="display text-5xl md:text-6xl">
              Every generation makes the next one stronger.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Today's operators become tomorrow's founders. Tomorrow's founders back the next
              generation. And Lio keeps its best people close — as founders, customers and backers.
            </p>
          </div>
          <Flywheel />
        </div>
      </section>

      <Modal open={event} onOpenChange={setEvent} title="Founder Dinner NYC">
        {communityEvents[0] && <EventCard event={communityEvents[0]} />}
      </Modal>
    </div>
  );
}

const statCls = "group block transition hover:opacity-80";
function StatBody({ n, label }: { n: string; label: string }) {
  return (
    <>
      <div className="display text-4xl">{n}</div>
      <div className="mt-1 text-xs text-muted-foreground transition group-hover:text-foreground sm:text-sm">
        {label} →
      </div>
    </>
  );
}

function Flywheel() {
  const steps = [
    { k: "Join", v: "Exceptional operators" },
    { k: "Build", v: "Ideas + relationships" },
    { k: "Found", v: "New companies" },
    { k: "Back", v: "Capital + intros + mentorship" },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ol className="divide-y divide-border border-y border-border">
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.k}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`flywheel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-5 py-5 text-left transition hover:opacity-70"
            >
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
              <span className="display w-24 shrink-0 text-3xl">{s.k}</span>
              <span className="flex-1 text-sm text-muted-foreground">{s.v}</span>
              <ArrowUpRight
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition",
                  isOpen && "rotate-90 text-foreground",
                )}
              />
            </button>
            {isOpen && (
              <div id={`flywheel-${i}`} className="animate-rise pb-6 pl-10 pr-9">
                <h3 className="display text-2xl">{journeyCopy[i]?.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {journeyCopy[i]?.description}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
