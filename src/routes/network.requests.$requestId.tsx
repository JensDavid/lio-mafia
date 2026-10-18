import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, Btn, SectionLabel } from "@/components/mafia/primitives";
import { NetworkNav } from "@/components/mafia/section-nav";
import { useDemo } from "@/components/mafia/demo-state";
import { getMember } from "@/lib/data";
import { initialRequests } from "@/lib/community";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/network/requests/$requestId")({
  head: ({ params }) =>
    pageHead(
      initialRequests.find((r) => r.id === params.requestId)?.text ?? "Community request",
      "Member replies and shared experience from the Lio Mafia.",
    ),
  component: RequestDetail,
});
function RequestDetail() {
  const { requestId } = Route.useParams();
  const { requests, reply } = useDemo();
  const [text, setText] = useState("");
  const r = requests.find((r) => r.id === requestId);
  if (!r)
    return (
      <div>
        <NetworkNav />
        <h1 className="display text-4xl">Request not found.</h1>
        <Link to="/network/requests">Back to requests →</Link>
      </div>
    );
  const author = getMember(r.author);
  return (
    <div>
      <NetworkNav />
      <Link to="/network/requests" className="text-sm text-muted-foreground">
        ← Requests
      </Link>
      <article className="mt-8 max-w-3xl">
        <div className="flex items-center gap-3">
          <Avatar id={r.author} initials={author?.initials ?? ""} />
          <Link
            to="/network/$memberId"
            params={{ memberId: r.author }}
            className="text-sm font-medium"
          >
            {author?.name}
          </Link>
          <span className="text-xs text-muted-foreground">
            {r.when} · {r.category}
          </span>
        </div>
        <h1 className="display mt-6 text-4xl md:text-5xl">{r.text}</h1>
        <section className="mt-10">
          <SectionLabel>{r.replies.length} replies</SectionLabel>
          <ul className="divide-y divide-border">
            {r.replies.map((reply) => {
              const m = getMember(reply.author);
              return (
                <li key={reply.id} className="flex gap-3 py-5">
                  <Avatar id={reply.author} initials={m?.initials ?? ""} />
                  <div>
                    <Link
                      to="/network/$memberId"
                      params={{ memberId: reply.author }}
                      className="text-sm font-medium"
                    >
                      {m?.name}
                    </Link>
                    <span className="ml-3 text-xs text-muted-foreground">{reply.when}</span>
                    <p className="mt-2 text-sm leading-relaxed">{reply.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              reply(r.id, text);
              setText("");
            }}
          >
            <label htmlFor="reply" className="eyebrow">
              Your reply
            </label>
            <textarea
              id="reply"
              className="field mt-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              required
            />
            <div className="mt-3 flex justify-end">
              <Btn type="submit" disabled={!text.trim()} className="disabled:opacity-40">
                Reply
              </Btn>
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}
