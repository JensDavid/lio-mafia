import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/launchpad/legal")({
  head: () => pageHead("Legal & Ops", "Legal and operations support inside Build."),
  beforeLoad: () => {
    throw redirect({ to: "/build/launchpad/legal" });
  },
});
