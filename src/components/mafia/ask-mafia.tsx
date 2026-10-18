import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ArrowRight, CornerDownLeft } from "lucide-react";
import { Avatar } from "./primitives";
import { ConnectModal, IntroModal } from "./modals";
import { useDemo } from "./demo-state";
import { buildPath, searchNetwork, type PathStep } from "@/lib/network-search";
import { getMember, partners, type Member } from "@/lib/data";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useAsk = () => useContext(Ctx);

const EXAMPLE =
  "I'm building Matchmaker and need a technical co-founder, advice on my stack and someone who understands consumer sports.";

export function AskProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-[10vh] z-50 flex max-h-[80vh] w-[calc(100%-2rem)] brand-dark max-w-2xl -translate-x-1/2 flex-col overflow-hidden rounded-lg border border-border bg-popover data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2"
          >
            <Dialog.Title className="sr-only">Ask the Mafia</Dialog.Title>
            <AskBody close={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}

type Phase = "idle" | "thinking" | "results" | "path";
type Partner = (typeof partners)[number];
type Intro = { member: Member; target?: { to: string; toTitle: string; message: string } };

const partnerIntro = (p: Partner): Intro | null => {
  const member = getMember(p.contact);
  return member
    ? {
        member,
        target: {
          to: p.name,
          toTitle: p.category,
          message: `I'm validating Matchmaker and expect to need help with ${(p.best[0] ?? "").toLowerCase()} soon. Would you be open to introducing me to the ${p.name} team?`,
        },
      }
    : null;
};

const actionCls = "text-xs font-medium hover:underline";
const rowCls = "flex w-full items-center gap-4 py-3 text-left transition hover:opacity-70";

function AskBody({ close }: { close: () => void }) {
  const { requests } = useDemo();
  const [q, setQ] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(0);
  const [connect, setConnect] = useState<string | null>(null);
  const [intro, setIntro] = useState<Intro | null>(null);

  const run = (text?: string) => {
    if (text) setQ(text);
    setPhase("thinking");
    setShown(0);
    setTimeout(() => setPhase("results"), 700);
  };
  useEffect(() => {
    if (phase !== "results" || shown >= 10) return;
    const t = setTimeout(() => setShown((s) => s + 1), 160);
    return () => clearTimeout(t);
  }, [phase, shown]);

  const results = searchNetwork(q, requests);
  const path = buildPath(results);
  const postLink = (
    <Link
      to="/network/requests"
      search={{ compose: true, mine: false, text: q.trim() }}
      onClick={close}
      className={actionCls}
    >
      Post as a request →
    </Link>
  );
  const groups = [
    ...results.people.map((m) => ({
      label: "People",
      title: m.name,
      sub: `${m.title}${m.match ? ` · ${m.match}% Matchmaker fit` : ""}`,
      icon: <Avatar id={m.id} initials={m.initials} size="sm" />,
      action: (
        <Link
          to="/network/$memberId"
          params={{ memberId: m.id }}
          onClick={close}
          className={actionCls}
        >
          View
        </Link>
      ),
    })),
    ...results.requests.map((r) => ({
      label: "Requests",
      title: r.text,
      sub: `${r.replies.length} community responses`,
      icon: <Dot />,
      action: (
        <Link
          to="/network/requests/$requestId"
          params={{ requestId: r.id }}
          onClick={close}
          className={actionCls}
        >
          View
        </Link>
      ),
    })),
    ...results.playbooks.map((p) => ({
      label: "Knowledge",
      title: p.title,
      sub: `Playbook · ${p.read} min`,
      icon: <Dot />,
      action: (
        <Link
          to="/playbooks/$playbookId"
          params={{ playbookId: p.id }}
          onClick={close}
          className={actionCls}
        >
          View
        </Link>
      ),
    })),
    ...results.partners.map((p) => ({
      label: "Partners",
      title: p.name,
      sub: `${p.category} · warm relationship via ${getMember(p.contact)?.name}`,
      icon: <Dot />,
      action: (
        <button type="button" onClick={() => setIntro(partnerIntro(p))} className={actionCls}>
          Request intro
        </button>
      ),
    })),
    ...(results.people.some((m) => m.canIntroduce?.length)
      ? [
          {
            label: "Connections",
            title: "Warm introduction paths",
            sub: results.people
              .filter((m) => m.canIntroduce?.length)
              .map((m) => `${m.name}: ${m.canIntroduce?.join(", ")}`)
              .join(" · "),
            icon: <Dot />,
            action: (
              <Link to="/network/people" onClick={close} className={actionCls}>
                Explore
              </Link>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <span className="text-signal">✦</span>
        <input
          aria-label="Ask the Mafia"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && q.trim() && run()}
          placeholder="What do you need?"
          className="flex-1 bg-transparent text-lg tracking-tight outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden items-center gap-1 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:flex">
          <CornerDownLeft className="h-3 w-3" />
        </kbd>
      </div>
      <div className="overflow-y-auto p-5">
        {phase === "idle" && (
          <div className="animate-rise">
            <h2 className="display text-3xl">What do you need?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              People · community requests · playbooks · partners · warm paths
            </p>
            <div className="eyebrow mb-2 mt-6">Try</div>
            <button
              type="button"
              onClick={() => run(EXAMPLE)}
              className="w-full rounded-sm border border-border p-4 text-left text-sm leading-relaxed transition hover:border-border-strong"
            >
              "{EXAMPLE}"
            </button>
          </div>
        )}
        {phase === "thinking" && (
          <div className="flex items-center gap-3 py-10 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-signal animate-pulse-ring" /> Searching 1,240
            members, 86 playbooks and 31 partners…
          </div>
        )}
        {phase === "results" && (
          <div>
            {groups.length === 0 && (
              <div className="py-6">
                <p className="text-sm text-muted-foreground">
                  Nothing in the Mafia's knowledge fits yet. Ask the members directly.
                </p>
                <div className="mt-4">{postLink}</div>
              </div>
            )}
            <div className="divide-y divide-border">
              {groups.slice(0, shown).map((g) => (
                <div
                  key={`${g.label}-${g.title}`}
                  className="grid grid-cols-[1fr_auto] sm:grid-cols-[85px_1fr_auto] items-center gap-4 py-3 animate-rise"
                >
                  <span className="eyebrow col-span-2 sm:col-span-1">{g.label}</span>
                  <div className="flex items-center gap-3">
                    {g.icon}
                    <div>
                      <div className="text-sm font-medium">{g.title}</div>
                      <div className="text-xs text-muted-foreground">{g.sub}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">{g.action}</div>
                </div>
              ))}
            </div>
            {shown >= groups.length && groups.length > 0 && (
              <button
                type="button"
                onClick={() => setPhase("path")}
                className="mt-5 flex w-full items-center justify-between rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground animate-rise hover:opacity-90"
              >
                Build my path <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        {phase === "path" && (
          <div className="animate-rise">
            <div className="eyebrow mb-1">Your path · Matchmaker</div>
            <h3 className="display mb-5 text-2xl">{path.length} moves for the next two weeks.</h3>
            <ol className="divide-y divide-border border-y border-border">
              {path.map((step, i) => (
                <li
                  key={`${step.kind}-${i}`}
                  className="animate-rise"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <PathRow
                    step={step}
                    index={i}
                    query={q.trim()}
                    close={close}
                    onConnect={setConnect}
                    onIntro={setIntro}
                  />
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setPhase("results")}
              className="mt-4 text-xs text-muted-foreground hover:text-foreground"
            >
              ← Back to results
            </button>
          </div>
        )}
      </div>
      {connect && (
        <ConnectModal
          memberId={connect}
          open={!!connect}
          onOpenChange={(o) => !o && setConnect(null)}
        />
      )}
      {intro && (
        <IntroModal
          key={`${intro.member.id}-${intro.target?.to ?? ""}`}
          member={intro.member}
          {...(intro.target ? { target: intro.target } : {})}
          open={!!intro}
          onOpenChange={(o) => !o && setIntro(null)}
        />
      )}
    </>
  );
}

function PathRow({
  step,
  index,
  query,
  close,
  onConnect,
  onIntro,
}: {
  step: PathStep;
  index: number;
  query: string;
  close: () => void;
  onConnect: (id: string) => void;
  onIntro: (intro: Intro | null) => void;
}) {
  const inner = (title: string, sub: string) => (
    <>
      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </>
  );
  switch (step.kind) {
    case "connect":
      return (
        <button type="button" className={rowCls} onClick={() => onConnect(step.member.id)}>
          {inner(
            `Connect with ${step.member.name.split(" ")[0]}`,
            `${step.member.title}${step.member.match ? ` · ${step.member.match}% fit` : ""}`,
          )}
        </button>
      );
    case "intro":
      return (
        <button type="button" className={rowCls} onClick={() => onIntro({ member: step.member })}>
          {inner(
            step.member.intro
              ? `Ask ${step.member.name.split(" ")[0]} for an intro to ${step.member.intro.to}`
              : `Talk to ${step.member.name}`,
            step.member.intro ? step.member.intro.toTitle : step.member.title,
          )}
        </button>
      );
    case "profile":
      return (
        <Link
          className={rowCls}
          to="/network/$memberId"
          params={{ memberId: step.member.id }}
          onClick={close}
        >
          {inner(`Meet ${step.member.name}`, `${step.member.title} · ${step.member.badge}`)}
        </Link>
      );
    case "playbook":
      return (
        <Link
          className={rowCls}
          to="/playbooks/$playbookId"
          params={{ playbookId: step.playbook.id }}
          onClick={close}
        >
          {inner(`Read "${step.playbook.title}"`, `${step.playbook.read} min read`)}
        </Link>
      );
    case "partner":
      return (
        <button
          type="button"
          className={rowCls}
          onClick={() => onIntro(partnerIntro(step.partner))}
        >
          {inner(
            `Request the ${step.partner.name} intro`,
            `via ${getMember(step.partner.contact)?.name ?? "the Mafia"}`,
          )}
        </button>
      );
    case "post":
      return (
        <Link
          className={rowCls}
          to="/network/requests"
          search={{ compose: true, mine: false, text: query }}
          onClick={close}
        >
          {inner("Post this to the Mafia", "Let 1,240 members answer what search can't")}
        </Link>
      );
  }
}

function Dot() {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border">
      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
    </div>
  );
}
