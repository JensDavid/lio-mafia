import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/mafia/primitives";
import { BuildNav } from "@/components/mafia/section-nav";
import { FounderRoadmap } from "@/components/mafia/founder-roadmap";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/build/track")({
  head: () => pageHead("Build · Founder Track", "From idea to company, one stage at a time."),
  component: FounderTrack,
});

function FounderTrack() {
  return (
    <div>
      <BuildNav />
      <PageHeader
        size="sm"
        eyebrow="Build · Founder Track · Matchmaker"
        title="Founder Track"
        sub="From idea to company, one stage at a time."
      />
      <FounderRoadmap />
    </div>
  );
}
