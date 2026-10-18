import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/launchpad/stack")({
  head: () => pageHead("Startup stack", "Startup stack recommendations inside Build."),
  beforeLoad: () => {
    throw redirect({ to: "/build/launchpad/stack" });
  },
});
