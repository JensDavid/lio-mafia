import { Link } from "@tanstack/react-router";
import { Avatar, Btn, Modal } from "./primitives";
import { useDemo } from "./demo-state";
import { getMember } from "@/lib/data";
import { requestsYouCanHelp } from "@/lib/network-search";
import type { CommunityEvent, CommunityRequest } from "@/lib/community";
import { useState } from "react";
export function RequestCard({ request: r }: { request: CommunityRequest }) {
  const author = getMember(r.author);
  return (
    <article className="border-b border-border py-5">
      <Link
        to="/network/$memberId"
        params={{ memberId: r.author }}
        className="flex items-center gap-2 text-sm"
      >
        <Avatar id={r.author} initials={author?.initials ?? ""} size="sm" />
        <span className="font-medium">{author?.name}</span>
        <span className="text-muted-foreground">{r.when}</span>
      </Link>
      <p className="mt-3 text-lg leading-snug">{r.text}</p>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>
          {r.category} · {r.replies.length} {r.replies.length === 1 ? "response" : "responses"}
        </span>
        <Link
          to="/network/requests/$requestId"
          params={{ requestId: r.id }}
          className="text-sm font-medium text-foreground hover:underline"
        >
          View request →
        </Link>
      </div>
    </article>
  );
}
export function EventCard({ event: e }: { event: CommunityEvent }) {
  const { attending, toggleAttend } = useDemo();
  const [show, setShow] = useState(false);
  const joined = attending.includes(e.id);
  return (
    <article className="border-b border-border py-5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <time dateTime={e.iso}>
          {e.date} · {e.time}
        </time>
        <span>{e.city}</span>
      </div>
      <h3 className="display mt-3 text-3xl">{e.title}</h3>
      {e.host && (
        <p className="mt-1 text-sm text-muted-foreground">with {getMember(e.host)?.name}</p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex -space-x-1">
          {e.members.slice(0, 4).map((id) => (
            <Link
              key={id}
              to="/network/$memberId"
              params={{ memberId: id }}
              aria-label={getMember(id)?.name}
            >
              <Avatar
                id={id}
                initials={getMember(id)?.initials ?? ""}
                size="sm"
                className="ring-2 ring-background"
              />
            </Link>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {e.attending + (joined ? 1 : 0)} attending
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Btn variant={joined ? "outline" : "primary"} onClick={() => toggleAttend(e.id)}>
          {joined ? "Attending ✓" : "Attend"}
        </Btn>
        <Btn variant="ghost" onClick={() => setShow(true)}>
          See attendees →
        </Btn>
      </div>
      <Modal open={show} onOpenChange={setShow} title={`Attendees · ${e.title}`}>
        <div className="eyebrow">
          {e.date} · {e.city}
        </div>
        <h3 className="display mt-2 text-3xl">{e.title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          {e.attending + (joined ? 1 : 0)} attending
        </p>
        <ul className="mt-5 divide-y divide-border">
          {[...e.members, ...(joined ? ["jens-fischer"] : [])].map((id) => (
            <li key={id}>
              <Link
                to="/network/$memberId"
                params={{ memberId: id }}
                onClick={() => setShow(false)}
                className="flex items-center gap-3 py-3"
              >
                <Avatar id={id} initials={getMember(id)?.initials ?? ""} />
                <span className="text-sm">{getMember(id)?.name}</span>
                <span className="ml-auto text-muted-foreground">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          +{e.attending - e.members.length} other members
        </p>
      </Modal>
    </article>
  );
}

export function OpenLoops({ limit }: { limit?: number }) {
  const { loops } = useDemo();
  if (!loops.length) return null;
  return (
    <ul className="divide-y divide-border">
      {loops.slice(0, limit).map((l) => {
        const via = getMember(l.via);
        if (!via) return null;
        const first = via.name.split(" ")[0];
        return (
          <li key={l.id}>
            <Link
              to="/network/$memberId"
              params={{ memberId: via.id }}
              className="flex gap-3 py-4 transition hover:opacity-70"
            >
              <Avatar id={via.id} initials={via.initials} />
              <div className="flex-1 text-sm">
                <div>
                  {l.kind === "intro" ? (
                    <>
                      Intro to <span className="font-medium">{l.to}</span> via {first}
                    </>
                  ) : (
                    <>
                      Coffee with <span className="font-medium">{first}</span> · {l.detail}
                    </>
                  )}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {l.kind === "intro" ? `${l.detail} · ` : ""}Waiting for {first} · {l.when}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function HelpRequests() {
  const { requests, profile } = useDemo();
  const list = requestsYouCanHelp(requests, profile.helpWith);
  if (!list.length) return null;
  return (
    <ul className="divide-y divide-border">
      {list.map((r) => {
        const author = getMember(r.author);
        return (
          <li key={r.id}>
            <Link
              to="/network/requests/$requestId"
              params={{ requestId: r.id }}
              className="group flex items-start gap-3 py-4 transition hover:opacity-70"
            >
              <Avatar id={r.author} initials={author?.initials ?? ""} />
              <div className="flex-1">
                <p className="leading-snug">{r.text}</p>
                <div className="mt-1 text-xs text-muted-foreground">
                  {author?.name} · {r.category} · {r.when}
                </div>
              </div>
              <span className="shrink-0 text-sm font-medium">
                Help {author?.name.split(" ")[0]} →
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
