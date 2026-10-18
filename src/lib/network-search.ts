import { members, partners, playbooks } from "./data";
import type { CommunityRequest } from "./community";
const tokens = (q: string) =>
  q
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.filter(
      (t) =>
        t.length > 2 &&
        ![
          "the",
          "and",
          "need",
          "help",
          "with",
          "for",
          "someone",
          "setting",
          "choosing",
          "initial",
          "have",
          "does",
          "anyone",
        ].includes(t),
    ) ?? [];
function terms(q: string) {
  const ts = tokens(q);
  if (/entity|incorporat|legal/.test(q.toLowerCase()))
    ts.push("legal", "incorporation", "us", "equity");
  if (/stack|supabase|technical|engineer/.test(q.toLowerCase()))
    ts.push("engineering", "infrastructure", "stack", "ai");
  if (/interview|discovery|testers/.test(q.toLowerCase()))
    ts.push("consumer", "product", "discovery");
  return [...new Set(ts)];
}
export function searchNetwork(q: string, requests: CommunityRequest[]) {
  const ts = terms(q);
  const score = (text: string) =>
    ts.reduce((s, t) => s + (text.toLowerCase().includes(t) ? 1 : 0), 0);
  const rank = <T>(items: T[], text: (x: T) => string) =>
    items
      .map((item) => ({ item, score: score(text(item)) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item);
  return {
    people: rank(members, (m) =>
      [m.name, m.title, ...m.skills, ...m.helpWith, ...m.openTo, ...(m.canIntroduce ?? [])].join(
        " ",
      ),
    ).slice(0, 3),
    requests: rank(requests, (r) =>
      [r.text, r.category, ...r.replies.map((x) => x.text)].join(" "),
    ).slice(0, 2),
    playbooks: rank(playbooks, (p) => [p.title, p.topic, ...p.tags].join(" ")).slice(0, 2),
    partners: rank(partners, (p) => [p.name, p.category, ...p.best].join(" ")).slice(0, 2),
  };
}

type Member = (typeof members)[number];
type Playbook = (typeof playbooks)[number];
type Partner = (typeof partners)[number];
export type PathStep =
  | { kind: "connect" | "intro" | "profile"; member: Member }
  | { kind: "playbook"; playbook: Playbook }
  | { kind: "partner"; partner: Partner }
  | { kind: "post" };
// Turns search results into concrete next moves; posting to the community is always the fallback.
export function buildPath(results: ReturnType<typeof searchNetwork>): PathStep[] {
  const [top, second] = results.people;
  const steps: PathStep[] = [];
  if (top)
    steps.push({ kind: top.openTo.includes("Co-founding") ? "connect" : "intro", member: top });
  if (second) steps.push({ kind: "profile", member: second });
  if (results.playbooks[0]) steps.push({ kind: "playbook", playbook: results.playbooks[0] });
  if (results.partners[0]) steps.push({ kind: "partner", partner: results.partners[0] });
  steps.push({ kind: "post" });
  return steps;
}

const HELP_TERMS: Record<string, string[]> = {
  GTM: ["commercial", "gtm", "customer", "sales", "landing"],
  Strategy: ["strategy", "deck", "feedback", "co-founder"],
  "Consumer Research": ["consumer", "user", "landing", "fans"],
  Operations: ["operations", "ops", "hiring"],
};
// Requests from other members that match what the viewer says they can help with.
export function requestsYouCanHelp(
  requests: CommunityRequest[],
  helpWith: string[],
  viewer = "jens-fischer",
) {
  const ts = helpWith.flatMap((h) => HELP_TERMS[h] ?? [h.toLowerCase()]);
  return requests
    .filter((r) => r.author !== viewer)
    .map((r) => {
      const text = `${r.text} ${r.category}`.toLowerCase();
      return { r, score: ts.filter((t) => text.includes(t)).length };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.r);
}
