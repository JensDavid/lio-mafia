import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/launchpad/")({
  head: () => pageHead("Launchpad", "Launchpad now lives inside Build."),
  beforeLoad: () => {
    throw redirect({ to: "/build/launchpad" });
  },
});
