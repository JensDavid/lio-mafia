import { createFileRoute, Link } from "@tanstack/react-router";
import { BuildNav } from "@/components/mafia/section-nav";
import { PageHeader } from "@/components/mafia/primitives";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/build/launchpad/")({
  head: () =>
    pageHead(
      "Build · Launchpad",
      "The support layer that helps builders turn projects into companies.",
    ),
  component: Launchpad,
});
const categories = [
  {
    k: "Founder matching",
    d: "Co-founders and first hires",
    n: "Find your technical counterpart",
    to: "/build/matchmaker",
    hash: "founder-matching",
  },
  {
    k: "Customers & Partners",
    d: "Design partners and strategic intros",
    n: "Find first design partners",
    to: "/build/launchpad/customers",
  },
  {
    k: "Capital",
    d: "Angels, investors and former Lio operators",
    n: "Prepare your seed round",
    to: "/build/launchpad/capital",
  },
  {
    k: "Stack",
    d: "Infrastructure, analytics and payments",
    n: "Choose initial startup stack",
    to: "/build/launchpad/stack",
  },
  {
    k: "Legal & Ops",
    d: "Incorporation, equity and contracts",
    n: "Incorporate US entity",
    to: "/build/launchpad/legal",
  },
  {
    k: "Knowledge",
    d: "Playbooks and hard-won founder lessons",
    n: "Learn from the Mafia",
    to: "/playbooks",
  },
] as const;
function Launchpad() {
  return (
    <div>
      <BuildNav />
      <PageHeader
        size="sm"
        eyebrow="Build · Launchpad · Matchmaker"
        title="Launchpad"
        sub="Your unfair advantage: the support layer that helps builders turn projects into companies."
      />
      <p className="mb-8 text-sm text-muted-foreground">
        Matchmaker · Validating — preparing for Building and Launching.
      </p>
      <div className="grid gap-x-10 gap-y-6 md:grid-cols-3">
        {categories.map((c, i) => (
          <Link
            key={c.k}
            to={c.to}
            {...("hash" in c ? { hash: c.hash } : {})}
            className="group flex min-h-48 flex-col border-t border-border py-6 hover:opacity-70"
          >
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0{i + 1}</span>
              <span>→</span>
            </div>
            <h2 className="display mt-5 text-3xl">{c.k}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            <span className="mt-auto pt-6 text-sm font-medium">{c.n} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
