import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/build/")({
  head: () => pageHead("Build", "Turn an idea into something worth leaving for."),
  beforeLoad: () => {
    throw redirect({ to: "/build/matchmaker" });
  },
});
