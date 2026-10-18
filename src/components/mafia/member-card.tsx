import { Link } from "@tanstack/react-router";
import { Avatar } from "./primitives";
import type { Member } from "@/lib/data";

export function MemberCard({ m }: { m: Member }) {
  return (
    <Link
      to="/network/$memberId"
      params={{ memberId: m.id }}
      className="group flex flex-col border-t border-border py-7 animate-rise"
    >
      <div className="flex items-start justify-between gap-4">
        <Avatar id={m.id} initials={m.initials} size="lg" />
        {m.match && (
          <div className="text-right">
            <div className="display text-3xl">{m.match}%</div>
            <div className="eyebrow">Matchmaker fit</div>
          </div>
        )}
      </div>
      <div className="mt-4 text-lg font-semibold tracking-tight">{m.name}</div>
      <div className="text-sm text-muted-foreground">
        {m.title} · {m.city}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{m.badge}</div>
      <p className="mt-4 text-sm">
        <span className="text-muted-foreground">Can help with </span>
        {m.helpWith.slice(0, 2).join(" · ")}
      </p>
      <div className="mt-5 text-sm font-medium transition group-hover:translate-x-0.5">
        View profile →
      </div>
    </Link>
  );
}
