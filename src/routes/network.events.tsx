import { createFileRoute } from "@tanstack/react-router";
import { NetworkNav } from "@/components/mafia/section-nav";
import { PageHeader } from "@/components/mafia/primitives";
import { EventCard } from "@/components/mafia/community-cards";
import { communityEvents } from "@/lib/community";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/network/events")({
  head: () =>
    pageHead(
      "Community events",
      "Meet the Mafia at founder dinners, builder breakfasts and office hours.",
    ),
  component: Events,
});
function Events() {
  return (
    <div>
      <NetworkNav />
      <PageHeader
        size="sm"
        eyebrow="Network · Events"
        title="Events"
        sub="Good people, real conversations: founder dinners, builder breakfasts and office hours."
      />
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {communityEvents.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}
