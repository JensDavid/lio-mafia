import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Avatar, Btn, SectionLabel } from "./primitives";
import { useDemo } from "./demo-state";
import { IntroModal } from "./modals";
import { currentStageIndex, founderStages } from "@/lib/community";
import { getMember } from "@/lib/data";
import { cn } from "@/lib/utils";
export function FounderRoadmap() {
  const [stage, setStage] = useState(currentStageIndex);
  const [book, setBook] = useState(false);
  const { tasks, toggleTask } = useDemo();
  const s = founderStages[stage];
  const anna = getMember("anna-schmidt");
  if (!s || !anna) return null;
  const done = tasks[stage] ?? [];
  return (
    <section>
      <div
        role="group"
        aria-label="Founder stages"
        className="grid grid-cols-2 gap-4 border-t border-border md:grid-cols-4"
      >
        {founderStages.map((s, i) => (
          <button
            type="button"
            key={s.name}
            aria-pressed={stage === i}
            onClick={() => setStage(i)}
            className={cn(
              "flex flex-col items-start border-t-2 py-4 text-left transition",
              stage === i
                ? "border-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="text-xs">
              0{i + 1}
              {i === currentStageIndex ? " · Current stage" : ""}
            </span>
            <span className="display text-3xl">{s.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="eyebrow">
            {s.name} · {s.purpose}
          </div>
          <h2 className="display mt-3 max-w-xl text-3xl md:text-4xl">{s.goal}</h2>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {s.focus.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>
                {done.length} / {s.tasks.length} completed
              </span>
            </div>
            <div className="h-1 bg-secondary">
              <div
                className="h-1 bg-primary transition-all"
                style={{ width: `${(done.length / s.tasks.length) * 100}%` }}
              />
            </div>
            <ul className="mt-4 divide-y divide-border">
              {s.tasks.map((t) => (
                <li key={t} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={done.includes(t)}
                      onChange={() => toggleTask(stage, t)}
                      className="h-4 w-4 accent-primary"
                    />
                    {t}
                  </label>
                  <TaskResource task={t} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="border-l border-border pl-6">
          <SectionLabel>Next best action</SectionLabel>
          <h3 className="display text-3xl">{s.action}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.why}</p>
          <div className="mt-5">
            <TaskResource
              task={s.action.replace(/\.$/, "")}
              interview={stage === currentStageIndex}
            />
          </div>
          <div className="mt-9">
            <SectionLabel>The Mafia can help</SectionLabel>
            <div className="flex items-center gap-3">
              <Avatar id="anna-schmidt" initials="AS" />
              <div>
                <Link
                  to="/network/$memberId"
                  params={{ memberId: "anna-schmidt" }}
                  className="text-sm font-medium"
                >
                  Anna Schmidt
                </Link>
                <p className="text-xs text-muted-foreground">Consumer Product</p>
              </div>
            </div>
            <Btn variant="outline" className="mt-3" onClick={() => setBook(true)}>
              Book 20 min
            </Btn>
            <Link
              to="/playbooks/$playbookId"
              params={{ playbookId: "user-discovery" }}
              className="mt-5 block text-sm hover:underline"
            >
              How to run early user discovery →
            </Link>
            <Link
              to="/network/requests"
              search={{ compose: true, mine: false }}
              className="mt-4 block text-sm hover:underline"
            >
              Ask 1,240 members for beta testers →
            </Link>
          </div>
        </aside>
      </div>
      <IntroModal
        member={anna}
        open={book}
        onOpenChange={setBook}
        target={{
          to: "Anna Schmidt",
          toTitle: "20 min product session",
          message:
            "I’m validating Matchmaker and planning 10 structured user interviews. Could we spend 20 minutes reviewing my discovery questions?",
        }}
      />
    </section>
  );
}
function TaskResource({ task, interview = false }: { task: string; interview?: boolean }) {
  const cls = "text-xs font-medium hover:underline";
  if (task.includes("startup stack"))
    return (
      <Link to="/build/launchpad/stack" className={cls}>
        Stack →
      </Link>
    );
  if (task.includes("US entity"))
    return (
      <Link to="/build/launchpad/legal" className={cls}>
        Legal & Ops →
      </Link>
    );
  if (task.includes("design partners"))
    return (
      <Link to="/build/launchpad/customers" className={cls}>
        Customers & Partners →
      </Link>
    );
  if (task.includes("seed round"))
    return (
      <Link to="/build/launchpad/capital" className={cls}>
        Capital →
      </Link>
    );
  if (task.includes("technical counterpart"))
    return (
      <Link to="/network/$memberId" params={{ memberId: "felix-weber" }} className={cls}>
        Founder match →
      </Link>
    );
  if (interview || task.includes("user interviews"))
    return (
      <Link to="/playbooks/$playbookId" params={{ playbookId: "user-discovery" }} className={cls}>
        User discovery →
      </Link>
    );
  return null;
}
