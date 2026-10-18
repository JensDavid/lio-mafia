import { Link } from "@tanstack/react-router";
export function NetworkNav() {
  return (
    <nav aria-label="Network navigation" className="section-nav">
      {(
        [
          { to: "/network", label: "Overview" },
          { to: "/network/people", label: "People" },
          { to: "/network/requests", label: "Requests" },
          { to: "/network/events", label: "Events" },
        ] as const
      ).map((n) => (
        <Link
          key={n.to}
          to={n.to}
          activeOptions={{ exact: true }}
          activeProps={{ className: "section-tab active" }}
          inactiveProps={{ className: "section-tab" }}
        >
          {n.label}
        </Link>
      ))}
    </nav>
  );
}
export function BuildNav() {
  return (
    <nav aria-label="Build navigation" className="section-nav">
      {(
        [
          { to: "/build/matchmaker", label: "Project" },
          { to: "/build/track", label: "Founder Track" },
          { to: "/build/launchpad", label: "Launchpad" },
        ] as const
      ).map((n) => (
        <Link
          key={n.to}
          to={n.to}
          activeOptions={{ exact: n.to !== "/build/launchpad" }}
          activeProps={{ className: "section-tab active" }}
          inactiveProps={{ className: "section-tab" }}
        >
          {n.label}
        </Link>
      ))}
    </nav>
  );
}
