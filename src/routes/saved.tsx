import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/mafia/primitives";
import { useDemo } from "@/components/mafia/demo-state";
import { playbooks } from "@/lib/data";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/saved")({
  head: () => pageHead("Saved playbooks", "Your saved knowledge from the Lio Mafia."),
  component: Saved,
});
function Saved() {
  const { saved } = useDemo();
  return (
    <div>
      <PageHeader
        size="sm"
        eyebrow="Your library"
        title="Saved playbooks"
        sub="Keep the good advice close."
      />
      {saved.length ? (
        playbooks
          .filter((p) => saved.includes(p.id))
          .map((p) => (
            <Link
              key={p.id}
              to="/playbooks/$playbookId"
              params={{ playbookId: p.id }}
              className="display block border-b border-border py-5 text-3xl hover:opacity-70"
            >
              {p.title} →
            </Link>
          ))
      ) : (
        <Link to="/playbooks" className="text-sm">
          Find a playbook to save →
        </Link>
      )}
    </div>
  );
}
