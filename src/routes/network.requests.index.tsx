import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Btn, Modal, PageHeader } from "@/components/mafia/primitives";
import { NetworkNav } from "@/components/mafia/section-nav";
import { RequestCard } from "@/components/mafia/community-cards";
import { useDemo } from "@/components/mafia/demo-state";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/network/requests/")({
  validateSearch: (
    s: Record<string, unknown>,
  ): { mine?: boolean; compose?: boolean; text?: string } => ({
    mine: s["mine"] === true || s["mine"] === "true",
    compose: s["compose"] === true || s["compose"] === "true",
    ...(typeof s["text"] === "string" && s["text"] ? { text: s["text"].slice(0, 500) } : {}),
  }),
  head: () =>
    pageHead(
      "Community requests",
      "Ask fellow Lio operators and alumni for feedback, introductions and help.",
    ),
  component: Requests,
});
const CATEGORIES = ["Feedback", "Introductions", "Co-founders", "Engineering", "Beta testers"];
const guessCategory = (text: string) => {
  const t = text.toLowerCase();
  if (/co-?founder/.test(t)) return "Co-founders";
  if (/test|tester|beta/.test(t)) return "Beta testers";
  if (/intro|warm path/.test(t)) return "Introductions";
  if (/stack|engineer|supabase|technical/.test(t)) return "Engineering";
  return "Feedback";
};

function Requests() {
  const search = Route.useSearch();
  const { requests, createRequest } = useDemo();
  const [mine, setMine] = useState(search.mine ?? false);
  const [open, setOpen] = useState(search.compose ?? false);
  const [text, setText] = useState(search.text ?? "");
  const [category, setCategory] = useState(guessCategory(search.text ?? ""));
  // Ask the Mafia can hand a query over while this page is already open.
  useEffect(() => {
    if (!search.compose) return;
    setOpen(true);
    if (search.text) {
      setText(search.text);
      setCategory(guessCategory(search.text));
    }
  }, [search.compose, search.text]);
  return (
    <div>
      <NetworkNav />
      <PageHeader
        size="sm"
        eyebrow="Network · Requests"
        title="Requests"
        sub="Ask fellow operators and alumni for feedback, introductions and help."
      />
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex gap-2">
          <Btn variant={mine ? "ghost" : "primary"} onClick={() => setMine(false)}>
            All requests
          </Btn>
          <Btn variant={mine ? "primary" : "ghost"} onClick={() => setMine(true)}>
            My requests
          </Btn>
        </div>
        <Btn onClick={() => setOpen(true)}>Post a request +</Btn>
      </div>
      <div className="max-w-3xl">
        {requests
          .filter((r) => !mine || r.author === "jens-fischer")
          .map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
      </div>
      <Modal open={open} onOpenChange={setOpen} title="Post a request">
        <h2 className="display text-3xl">Ask your community.</h2>
        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            createRequest(text, category);
            setOpen(false);
            setMine(true);
            setText("");
          }}
        >
          <label className="block text-sm">
            Category
            <select
              className="field mt-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Your request
            <textarea
              className="field mt-2"
              rows={4}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <div className="flex justify-end">
            <Btn type="submit" disabled={!text.trim()} className="disabled:opacity-40">
              Post request
            </Btn>
          </div>
        </form>
      </Modal>
    </div>
  );
}
