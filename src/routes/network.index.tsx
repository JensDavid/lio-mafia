import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionLabel } from "@/components/mafia/primitives";
import { NetworkNav } from "@/components/mafia/section-nav";
import { RequestCard, EventCard, HelpRequests } from "@/components/mafia/community-cards";
import { useDemo } from "@/components/mafia/demo-state";
import { communityEvents } from "@/lib/community";
import { members } from "@/lib/data";
import { MemberCard } from "@/components/mafia/member-card";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/network/")({
  head: () =>
    pageHead(
      "Network",
      "The Mafia, right now. Community requests, upcoming events and people worth meeting.",
    ),
  component: Network,
});
function Network() {
  const { requests } = useDemo();
  return (
    <div>
      <NetworkNav />
      <PageHeader eyebrow="Network · 1,240 members" title="The Mafia, right now." />
      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <SectionLabel
            right={
              <Link to="/network/requests" className="text-xs">
                All requests →
              </Link>
            }
          >
            Requests
          </SectionLabel>
          {requests.slice(0, 3).map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </section>
        <section>
          <SectionLabel
            right={
              <Link to="/network/events" className="text-xs">
                All events →
              </Link>
            }
          >
            Upcoming events
          </SectionLabel>
          {communityEvents.slice(0, 2).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </section>
      </div>
      <section className="mt-12">
        <SectionLabel>You can help</SectionLabel>
        <HelpRequests />
      </section>
      <section className="mt-12">
        <SectionLabel
          right={
            <Link to="/network/people" className="text-xs">
              All people →
            </Link>
          }
        >
          People you should meet
        </SectionLabel>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {["felix-weber", "david-okafor", "anna-schmidt"].map((id) => {
            const m = members.find((m) => m.id === id);
            return m ? <MemberCard key={id} m={m} /> : null;
          })}
        </div>
      </section>
    </div>
  );
}
